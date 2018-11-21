import { database, getObjectId } from "../util";

const runQuery = async (qid) => {
  let _id;
  try {
    _id = getObjectId(qid);
  } catch (err) {
    return
  }
  const db = await database.connect();
  const data = await db.collection('queries').findOne({ _id }, { query: 1 });
  if (data) {
    const result = await db.collection('submissions').aggregate(JSON.parse(data.query)).toArray();
    if (result) {
      db.close();
      return result;
    }
  }
  db.close();
}

export const reportsController = {

    getReports: async (res, req) => {
      const { user: {} } = req;
      const db = await database.connect();
      const data = await db.collection('reports').find(
        {}, { _id: 1, name: 1 }
      ).toArray();
  
      if (data) {
        res.json({ status: 'success', data });
      }
      db.close();
    },
  
    postReport: async (res, req) => {
      const { user: { sudo }, params: { layout } } = req;
      let _id;

      if (sudo) {
        try {
          _id = getObjectId(layout);
        } catch (err) {
          res.status(401).json({ status: 'error', err });
        }
  
        const db = await database.connect();
        const data = await db.collection('layouts').findOne({ _id }, { queries: 1 });
        if (data) {
          for (query in data) {
            query = runQuery(query);
          }
        }
        
        const { insertedId } = await db.collection('reports').insertOne(data);
        if (insertedId) {
          res.json({ status: 'success', data: { _id: insertedId, ...data } });
        } else {
          res.status(401).json({ status: 'error', err: 'Unexpected error for report creation' });
        }
        db.close();
      } else {
        res.status(403).json({ status: 'error', err: 'Permission Denied' });
      }
    },
  
    getReport: async (res, req) => {
      const { user: {}, params: { report } } = req;
      let _id;

      try {
        _id = getObjectId(report);
      } catch (err) {
        res.status(401).json({ status: 'error', err });
      }
  
      const db = await database.connect();
      const data = await db.collection('reports').findOne(
        { _id }
      );
  
      if (data) {
        res.json({ status: 'success', data });
      } else {
        res.status(403).json({ status: 'error', err: 'Unable to get that report' });
      }
      db.close();
    },
  
    deleteReport: async (res, req) => {
      const { user: {}, params: { report } } = req;
      let _id;

      try {
        _id = getObjectId(report);
      } catch (err) {
        res.status(401).json({ status: 'error', err });
      }

      const db = await database.connect();
      const { value, ok } = await db.collection('reports')
        .findOneAndDelete({ _id });

      if (value && ok) {
        res.json({ status: 'success', data: value._id });
      } else {
        res.status(401).json({ status: 'error', err: 'Unable to remove this report' });
      }
      db.close();
    }      
}