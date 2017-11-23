/**
 * Created by noodles on 16/2/29.
 * description
 */

import _ from 'lodash';
import logger from '../common/logger';


const authApply = async(req, res, next) => {
  try {
    _.extend(res.locals, {
      isApply: req.session.isApply || 0,
    });
  } catch (err) {
    res.locals.isApply = 0;
  }
  next();
}
export default {
  authApply,
};
