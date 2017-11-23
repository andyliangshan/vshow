/**
 * Created by andy on 16/4/8.
 */

// import ukProxy from '../proxy/ukProxy';

const index = async(req, res, next) => {

  try {
    res.render('index', {
      title: '首页',
    });
  } catch (err) {
    next(err);
  }
};

const list = async(req, res, next) => {

  try {
    res.render('productlist', {
      title: '产品列表',
    });
  } catch (err) {
    next(err);
  }
};

const instru = async(req, res, next) => {

  try {
    res.render('productInstru', {
      title: '产品介绍',
    });
  } catch (err) {
    next(err);
  }
};

const detail = async(req, res, next) => {

  try {
    res.render('productdetail', {
      title: '产品详情',
    });
  } catch (err) {
    next(err);
  }
};

const service = async(req, res, next) => {

  try {
    res.render('service', {
      title: '服务介绍',
    });
  } catch (err) {
    next(err);
  }
};

const about = async(req, res, next) => {

  try {
    res.render('about', {
      title: '关于我们',
    });
  } catch (err) {
    next(err);
  }
};


export default {
  index,
  list,
  instru,
  detail,
  service,
  about,
};
