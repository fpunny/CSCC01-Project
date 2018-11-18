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