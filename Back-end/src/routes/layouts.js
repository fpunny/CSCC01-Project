import express from 'express';
import { layoutsController } from '../controllers';
import { authenticate } from '../util';
const router = express.Router();

router.use(authenticate);
router.route('/')
  .get(layoutsController.getLayouts)
  .post(layoutsController.postLayouts)
;

router.route('/:lid')
  .get(layoutsController.getLayout)
  .post(layoutsController.postLayout)
  .delete(layoutsController.deleteLayout)
;

export const Layouts = { router, path: '/layouts' };