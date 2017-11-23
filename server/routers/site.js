/**
 * 跟域名资源路径
 */
import { Router } from 'express';
import siteCtrl from '../controllers/site';
import ukCtrl from '../controllers/uk';

const router = new Router();


/** Vshow
 *  路由
 */
router.get('/index', ukCtrl.index);
router.get('/list', ukCtrl.list);
router.get('/instru', ukCtrl.instru);
router.get('/detail', ukCtrl.detail);
router.get('/service', ukCtrl.service);
router.get('/about', ukCtrl.about);

/**
 * 表单接口
 */
router.post('/ztAbroadPlan', siteCtrl.ztAbroadPlan);

export default router;
