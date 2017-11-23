/* eslint-disable */

/**
 * ModelProxy
 * As named, this class is provided to model the proxy.
 **/

// Dependencies
var InterfaceManager = require('./interfacemanager')
  , ProxyFactory = require('./proxyfactory');

import HttpClient from '../../common/HttpClient';
/**
 * ModelProxy Constructor
 * @param {Object|Array|String} profile. This profile describes what the model looks
 * like. eg:
 * profile = {
 *    getItems: 'Search.getItems',
 *    getCart: 'Cart.getCart'
 * }
 * profile = ['Search.getItems', 'Cart.getCart']
 * profile = 'Search.getItems'
 * profile = 'Search.*'
 */
function ModelProxy(profile) {
  if (!profile) return;

  if (typeof profile === 'string') {

    // Get ids via prefix pattern like 'packageName.*'
    if (/^(\w+\.)+\*$/.test(profile)) {
      profile = ProxyFactory
        .getInterfaceIdsByPrefix(profile.replace(/\*$/, ''));

    } else {
      profile = [profile];
    }
  }
  if (profile instanceof Array) {
    var prof = {}, methodName;
    for (var i = profile.length - 1; i >= 0; i--) {
      methodName = profile[i];
      methodName = methodName
        .substring(methodName.lastIndexOf('.') + 1);
      if (!prof[methodName]) {
        prof[methodName] = profile[i];

        // The method name is duplicated, so the full interface id is set
        // as the method name.
      } else {
        methodName = profile[i].replace(/\./g, '_');
        prof[methodName] = profile[i];
      }
    }
    profile = prof;
  }

  // Construct the model following the profile
  for (var method in profile) {
    this[method] = (function (methodName, interfaceId) {
      var proxy = ProxyFactory.create(interfaceId);
      return function (params) {
        params = params || {};

        if (!this._queue) {
          this._queue = [];
        }
        // Push this method call into request queue. Once the done method
        // is called, all requests in this queue will be sent.
        this._queue.push({
          params: params,
          proxy: proxy
        });
        return this;
      };
    })(method, profile[method]);
    // this._addMethod( method, profile[ method ] );
  }
}

ModelProxy.prototype = {
  done: async function () {
    const apiObj = this._queue[0];
    this._queue.pop();
    const params = apiObj.params;
    const opts = apiObj.proxy._opt;
    const url = apiObj.proxy._urls.online;
    let bkData = {};
    try {
      if (opts.method === 'GET') {
        bkData = await HttpClient.get(url, params);
      } else if (opts.method === 'POST') {
        bkData = await HttpClient.post(url, params);
      }
    } catch (err) {
      bkData = null;
    }
    //  this._queue = null;
    return bkData;
  }
};

/**
 * ModelProxy.init
 * @param {String} path The path refers to the interface configuration file.
 */
ModelProxy.init = function (path) {
  ProxyFactory.use(new InterfaceManager(path));
};


ModelProxy.create = function (profile) {
  return new this(profile);
};

ModelProxy.Interceptor = function (req, res) {
  // todo: need to handle the case that the request url is multiple
  // interfaces combined which configured in interface.json.
  ProxyFactory.Interceptor(req, res);
};

module.exports = ModelProxy;
