import Base from './base';
import { ukSiteSchema, ukBusinessSchema, ukTechnologySchema, ukLiberalSchema, ukArtsSchema, ukSchoolSchema} from './schemas';

class UKProxy extends Base.Base {

  constructor() {
    super();
    this.model = this.ModelProxy.create('uk.*');
  }

  /**
   * uk site
   * @param query {name: 'sem', age: 11}json
   * @returns {*} api data 英国专业底部轮播图
     */
  async ukLunbo(query) {
    let bkData;
    bkData = await this.model.lunbo(query).done();
    //  timeout, api error
    if (!bkData || bkData.error) {
      bkData = ukSiteSchema;
    }
    return bkData;
  }

  /**
   * uk site
   * @param query {name: 'sem', age: 11}json
   * @returns {*} api data 英国专业首页院校推荐api
   */
  async ukRecommandSchool(query) {
    let bkData;
    bkData = await this.model.recommandSchool(query).done();
    //  timeout, api error
    if (!bkData || bkData.error) {
      bkData = ukSchoolSchema;
    }
    return bkData;
  }

  /**
   * uk site
   * @param query {name: 'sem', age: 11}json
   * @returns {*} api data 英国专业顾问推荐api
   */
  async ukAdvisor(query) {
    let bkData;
    bkData = await this.model.advisor(query).done();
    //  timeout, api error
    if (!bkData || bkData.error) {
      bkData = ukSchoolSchema;
    }
    return bkData;
  }

  /**
   * uk site
   * @param query {name: 'sem', age: 11}json
   * @returns {*} api data 英国专业案例库api
   */
  async ukCaseInfo(query) {
    let bkData;
    bkData = await this.model.caseInfo(query).done();
    //  timeout, api error
    if (!bkData || bkData.error) {
      bkData = ukSchoolSchema;
    }
    return bkData;
  }

  /**
   * uk recommandScho caseApi
   * @param query {name: 'sem', age: 11}json
   * @returns {*} api data 美国专业院校推荐api
   */
  async ukRecommandScho(query) {
    let bkData;
    bkData = await this.model.recommandScho(query).done();
    //  timeout, api error
    if (!bkData || bkData.error) {
      bkData = ukSchoolSchema;
    }
    return bkData;
  }

  /**
   * uk caseApi
   * @param query {name: 'sem', age: 11}json
   * @returns {*} api data 美国专业院校推荐api
   */
  async ukCaseApi(query) {
    let bkData;
    bkData = await this.model.caseApi(query).done();
    //  timeout, api error
    if (!bkData || bkData.error) {
      bkData = ukSchoolSchema;
    }
    return bkData;
  }

  /**
   * uk information
   * @param query {name: 'sem', age: 11}json
   * @returns {*} api data 专业资讯接口api
   */
  async ukInformation(query) {
    let bkData;
    bkData = await this.model.information(query).done();
    //  timeout, api error
    if (!bkData || bkData.error) {
      bkData = ukSchoolSchema;
    }
    return bkData;
  }

  /**
   * uk caseApi
   * @param query {name: 'sem', age: 11}json
   * @returns {*} api data 专业树接口api
   */
  async ukMajorTree(query) {
    let bkData;
    bkData = await this.model.majorTree(query).done();
    //  timeout, api error
    if (!bkData || bkData.error) {
      bkData = ukSchoolSchema;
    }
    return bkData;
  }
  /**
   * 申请国家.申请项目 { country: usa }
   * @param query   ?country=usa
   * @returns {*}   {} => real data || newUsaProxy.schemas.rankingCollege
   */
  async abroadCountry(query) {
    let bkData;
    bkData = await this.model.abroadCountry(query).done();
    //  timeout, api error
    if (!bkData || bkData.error) {
      bkData = ukSchoolSchema;
    }
    return bkData;
  }


}
export default new UKProxy();
