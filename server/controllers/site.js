import siteProxy from '../proxy/siteProxy';
import crypto from 'crypto';
import httpClient from '../common/HttpClient';
import config from '../config/system';

/**
 * post
 * @param req
 * @param res
 * @param next
 * country:荷兰
 */
const getMd5 = content => {
  //  如果md5加密失败,请注释此行
  content = (new Buffer(content)).toString('binary');
  return crypto.createHash('md5').update(content).digest('hex')
};
//router.get('/phoneCode/', function callee$0$0
const phoneCode = async (req, res, next) => {
  try {
    const { phone, product = '顺顺留学', item = '选校定位' } = req.body;
    if (!phone) {
      return res.json({ msg: '参数错误！！', errorcode: 1 });
    }

    const tempData4Value = JSON.stringify({ product: product, item: item });
    const tempId4Value = 'SMS_10485123';
    const secertKey = '6db68ed9b0a5be0c3e8796400944e142e9bc6f3336c83891a44e13dac87a7156';
    const accessKey = '453f59b2d34b4982920b02e17e1524bd';
    const cryptStr = getMd5(`mobiletemp_datatemp_id${phone}${tempData4Value}${tempId4Value}${secertKey}`);

    const queryObj = {
      mobile: phone,
      ak: accessKey,
      hash: cryptStr,
      temp_id: tempId4Value,
      temp_data: tempData4Value,
    };
    //  { result: { pollcode: '84c540ac73058f619d9503dd51910c31' } }
    const bkData = await httpClient.get('https://crpapi.shunshunliuxue.com/aws/sendverifycodesms/', queryObj);
    if (bkData && bkData.result) {
      req.session.mobileSmsMd5Code = bkData.result.pollcode;
    }
    res.json({
      msg: '获取成功',
      errorcode: 0,
      timeout: 60,
    });
  } catch (err) {
    next(err);
  }
};

const ztAbroadPlan = async (req, res , next) => {
 try {
   const submitData = req.body || {};
   //  如果包含短信验证码，则优先验证
   const phoneSmsCode = submitData.phoneSmsCode;
   console.log('phoneSmsCode..........', phoneSmsCode, 'req.session.mobileSmsMd5Code.....', req.session.mobileSmsMd5Code, '..........',getMd5(phoneSmsCode || ''));
   if (phoneSmsCode) {
     if (getMd5(phoneSmsCode) !== req.session.mobileSmsMd5Code) {
       return res.status(500).json({
         msg: '验证码错误',
         errcode: -1,
       });
     }
   }
   submitData.qudao_details = decodeURI(submitData.qudao_details);
   delete submitData.phoneSmsCode;
 } catch (err) {
   next(err);
 }

  //  get cookie _pk_idxxxxx
  let cookieKeyJZL = '';
  let cookieValueJZL = '';
  try {
    Object.keys(req.cookies).map(key => (key.indexOf('_pk_id') > -1) && (cookieKeyJZL = key));
    cookieValueJZL = req.cookies[cookieKeyJZL].substr(0, 16);
  } catch (err) {
    cookieValueJZL = '';
  }

  const type = req.method;
  let clientData;
  let apiBkData;
  let ajaxBkData = { msg: '提交失败，缺少字段，或字段不匹配！', errorcode: 1 };
  // _utm_source,_utm_term,添加地址国家字段
  let _utm_source, _utm_term, _attribution;
  let _referer = req.headers.referer;
  try {
    _utm_source = decodeURI(_referer.split('?').slice(-1).join('').split('&').filter(item=>item.split('=')[0]==='utm_source')[0].split('=')[1]);
    _utm_term = decodeURI(_referer.split('?').slice(-1).join('').split('&').filter(item=>item.split('=')[0]==='utm_term')[0].split('=')[1].split('-')[0]);
    _attribution = _utm_term;
  } catch (err) {}


  if (type === 'GET') {
    clientData = req.query;
    !clientData.from && (clientData.from = 'SEM/申请方案');
    !clientData.xifenqudao && (clientData.xifenqudao = 'SEM');
    console.log('控制器格式化提交GET参数： ', clientData);
    apiBkData = await siteProxy.abroadPlan(clientData);
  } else {
    clientData = req.body;
    !clientData.qudao_details && (clientData.qudao_details = 'SEM/申请方案');
    !clientData.xifenqudao && (clientData.xifenqudao = 'SEM');
    cookieValueJZL && (clientData.jzl_id = cookieValueJZL);
    _attribution && (clientData.attribution = _attribution);
    _referer && (clientData.wap_source = _referer);
    if (_utm_source) {
      clientData.qudao_details = clientData.qudao_details + '/' + _utm_source;
    }else {
      clientData.qudao_details = clientData.qudao_details + '/自然用户';
    }

    //remote phone code key
    delete clientData.phoneSmsCode;
    console.log('控制器格式化提交POST参数： ', clientData);
    apiBkData = await siteProxy.abroadPlanPost(clientData);
  }

  console.log(apiBkData);

  if (apiBkData && apiBkData.result === 'success') {
    ajaxBkData = { msg: '提交成功！', errorcode: 0 };
  } else {
    ajaxBkData = { msg: '提交失败，缺少字段，或字段不匹配！', errorcode: 1 };
  }

  res.json(ajaxBkData);
};

export default {
  phoneCode,
  ztAbroadPlan,
};
