
import Base from './base';


class SiteProxy extends Base.Base {

  constructor() {
    super();
    this.model = this.ModelProxy.create('site.*');
  }

  /**
   */
  async fetchSchools(query) {
    let data;
    try {
      data = await this.model.schools(query).done();
      if (!data || (typeof data === 'string')) {
        data = [];
      }
    } catch (err) {
      data = [];  //  important null
    }

    return data;
  }

  /**
   * 申请留学规划信息
   * @param apiType
   * @param body
   */
  async abroadPlan(body) {
    let bkData;
    try {
      bkData = await this.model.abroadPlan(body).done();
      console.log('proxy..........');
      console.log(bkData);
    } catch (err) {
      bkData = err;
    }
    return bkData;
  }

  /**
   * 申请留学规划信息
   * @param apiType
   * @param body
   */
  async abroadPlanPost(body) {
    let bkData;
    try {
      bkData = await this.model.abroadPlanPost(body).done();
      console.log('proxy..........', bkData);
    } catch (err) {
      console.log('err.......', err);
      bkData = err;
    }
    return bkData;
  }

}
export default new SiteProxy();
