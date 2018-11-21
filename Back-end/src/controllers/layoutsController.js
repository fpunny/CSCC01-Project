import { database, getObjectId } from "../util";

export const layoutsController = {

    getLayouts: async (res, req) => {
      const { user: { sudo } } = req;

      if (sudo) {
        const db = await database.connect();
        const data = await db.collection('layouts').find(
          {}, { _id: 1, name: 1 }
        ).toArray();
        if (data) {
          res.json({ status: 'success', data });
        } else {
          res.status(403).json({ status: 'error', err: 'Unable to get layouts' });
        }
        db.close();
      } else {
        res.status(403).json({ status: 'error', err: 'Permission Denied' });
      }
    },
  
    postLayouts: async (res, req) => {
      const { user: { sudo }, body } = req;

      if (sudo) {
        const db = await database.connect();  
        const { insertedId } = await db.collection('layouts').insertOne(body);
        if (insertedId) {
          res.json({ status: 'success', data: { _id: insertedId, ...body } });
        } else {
          res.status(401).json({ status: 'error', err: 'Unexpected error for layout creation' });
        }
        db.close();
      } else {
        res.status(403).json({ status: 'error', err: 'Permission Denied' });
      }
    },
  
    getLayout: async (res, req) => {
      const { user: { sudo }, params: { layout } } = req;
      let _id;

      try {
        _id = getObjectId(layout);
      } catch (err) {
        res.status(401).json({ status: 'error', err });
      }

      if (sudo) {
        const db = await database.connect();
        const data = await db.collection('layouts').findOne(
          { _id }
        );
    
        if (data) {
          res.json({ status: 'success', data });
        } else {
          res.status(403).json({ status: 'error', err: 'Unable to get that layout' });
        }
        db.close();
      } else {
        res.status(403).json({ status: 'error', err: 'Permission Denied' });
      }
    },
  
    postLayout: async (res, req) => {
      const { user: { sudo }, params: { layout }, body } = req;
      let _id;

      try {
        _id = getObjectId(layout);
      } catch (err) {
        res.status(401).json({ status: 'error', err });
      }

      if (sudo) {
        const db = await database.connect();  
        const { value, ok } = await db.collection('layouts').findOneAndReplace(
          { _id },
          { $set: body },
          { returnOriginal: false }
        );

        if (ok && value) {
          res.json({ status: 'success', data: { ...value, ...body } });
        } else {
          res.status(401).json({ status: 'error', err: 'Invalid layout id' });
        }
        db.close();
      } else {
        res.status(403).json({ status: 'error', err: 'Permission Denied' });
      }
    },
  
    deleteLayout: async (res, req) => {
      const { user: { sudo }, params: { layout } } = req;
      let _id;

      try {
        _id = getObjectId(layout);
      } catch (err) {
        res.status(401).json({ status: 'error', err });
      }
      
      if (sudo) {
        const db = await database.connect();
        const { value, ok } = await db.collection('layouts').findOneAndDelete({ _id });
  
        if (value && ok) {
          res.json({ status: 'success', data: value._id });
        } else {
          res.status(401).json({ status: 'error', err: 'Unable to remove this layout' });
        }
        db.close();
      } else {
        res.status(403).json({ status: 'error', err: 'Permission Denied' });
      }
    }
  }