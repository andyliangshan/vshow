/**
 * Created by noodles on 16/3/20.
 * description
 */

/**
 *
 * {a:{},b:{}...} ==> [{},{},{}...] ==> [[{},{}],[{},{}]...]
 * @param data
 * @returns {Array}
 */
export const parseCountryData = data => {
  const catalogTmpArr = [];
  for (const key in data) {
    catalogTmpArr.push(data[key]);
  }
  const catalogArrRes = [];
  for (let i = 0; i < catalogTmpArr.length; i++) {
    const len = catalogTmpArr.length;
    if ((i + 1) % 2 === 0) {
      catalogArrRes.push([catalogTmpArr[i - 1], catalogTmpArr[i]]);
    } else if (len % 2 !== 0 && i === len - 1) {
      catalogArrRes.push([catalogTmpArr[len - 1]]);
    }
  }
  return catalogArrRes;
};

/**
 * 拆分数组成二维数据, 每个内部数组元素为3
 * {a:{},b:{}...} ==> [{},{},{}...] ==> [[{},{},{}],[{},{},{}]...]
 * @param data
 * @returns {Array}
 */
export const parseMajorData = data => {
  const catalogTmpArr = [];
  for (const key in data) {
    catalogTmpArr.push(data[key]);
  }
  const catalogArrRes = [];
  for (let i = 0; i < catalogTmpArr.length; i++) {
    const len = catalogTmpArr.length;
    if ((i + 1) % 3 === 0) {
      catalogArrRes.push([catalogTmpArr[i - 2], catalogTmpArr[i - 1], catalogTmpArr[i]]);
    } else {
      if (len % 3 === 1 && i === len - 1) {
        catalogArrRes.push([catalogTmpArr[len - 1]]);
      }

      if (len % 3 === 2 && i === len - 1) {
        catalogArrRes.push([catalogTmpArr[len - 2], catalogTmpArr[len - 1]]);
      }
    }
  }
  return catalogArrRes;
};

/**
 * 转换一维数组 -> 二维数组,并且内部一维数组长度<=3
 * @param arr
 * @returns {Array}
 */
export const parseArr2D = arr => {
  const catalogArrRes = [];
  for (let i = 0; i < arr.length; i++) {
    const len = arr.length;
    if ((i + 1) % 3 === 0) {
      catalogArrRes.push([arr[i - 2], arr[i - 1], arr[i]]);
    } else {
      if (len % 3 === 1 && i === len - 1) {
        catalogArrRes.push([arr[len - 1]]);
      }

      if (len % 3 === 2 && i === len - 1) {
        catalogArrRes.push([arr[len - 2], arr[len - 1]]);
      }
    }
  }
  return catalogArrRes;
};
