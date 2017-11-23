/**
 * Created by noodles on 15/12/28.
 * description
 */

import qn from 'qn';
import config from '../config/system';

let qnClient = null;
if (config.qnAccess) {
  qnClient = qn.create(config.qnAccess);
}

export default qnClient;
