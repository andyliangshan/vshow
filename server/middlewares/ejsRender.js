/**
 * Created by noodles on 16/3/5.
 * description
 * ejs模板中间件
 */
import _ from 'lodash';

/**
 * 检查规则:      ejs变量检查: obj === void 0
 * 使用说明:      只对输出单一变量 所有调用关系的层级检查
 * 例子:          <%- get('deep.nested.non.existent.value') %>   //returns: null
 *               <%- get('deep.nested.non.existent.value', "default value") %>  //returns: default value
 */
/* eslint-disable */
const ejsSingleVariableHelp = async(req, res, next)=> {
  res.locals.get = function () {
    const args = Array.prototype.slice.call(arguments, 0);
    const path = args[0].split('.');
    let root = this;
    for (let i = 0; i < path.length; i++) {
      if (root[path[i]] === void 0) {
        return args[1] ? args[1] : null;
      } else {
        root = root[path[i]];
      }
    }
    return root;
  };
  next();
};
/* eslint-enable */

/**
 * 模板内部公共默认对象定义
 */
const predefinedObject = async(req, res, next) => {
  _.extend(res.locals, {
    assetsTitle: 'index',
  });
  next();
};

export default {
  ejsSingleVariableHelp: ejsSingleVariableHelp,
  predefinedObject: predefinedObject,
};
