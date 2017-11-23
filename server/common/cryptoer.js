import crypto from 'crypto';

/**
 * 加密码
 * @param data 内容
 * @param key 密钥
 * @returns {*}
 */
exports.aesEncrypt = (data, key) => {
  const cipher = crypto.createCipher('aes-128-ecb', key);
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
};

/**
 * 解密
 * @param data 内容
 * @param key 密钥
 * @returns {*}
 */
exports.aesDecrypt = (data, key) => {
  const cipher = crypto.createDecipher('aes-128-ecb', key);
  return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
};

/**
 * md5 加密
 * @param content
 * @returns {*}
 */
exports.md5 = (content) => {
  return crypto.createHash('md5').update(content).digest('hex');
};
