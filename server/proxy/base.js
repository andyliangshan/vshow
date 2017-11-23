/**
 * Created by noodles on 16/3/8.
 * description
 */

const ModelProxy = require('./lib/modelproxy');
ModelProxy.init('interface.json');

class Base {
  constructor() {
    this.ModelProxy = ModelProxy;
  }
}

export default {
  Base: Base,
  ModelProxy: ModelProxy,
};
