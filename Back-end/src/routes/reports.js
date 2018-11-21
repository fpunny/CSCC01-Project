import express from 'express';
import { reportsController } from '../controllers';
import { authenticate } from '../util';
const router = express.Router();

router.use(authenticate);
router.route('/')
  .get(reportsController.getReports)
;

router.route('/:rid')
  .get(reportsController.getReport)
  .post(reportsController.postReport)
  .delete(reportsController.deleteReport)
;

export const Reports = { router, path: '/reports' };