import express from 'express';
import { reportsController } from '../controllers';
import { authenticate } from '../util';
const router = express.Router();

router.use(authenticate);
router.route('/')
  .get(reportsController.getReports)
;

router.route('/:lid')
  .post(reportsController.postReport)
;

router.route('/:rid')
  .get(reportsController.getReport)
  .delete(reportsController.deleteReport)
;

export const Reports = { router, path: '/reports' };