/* eslint space-before-function-paren:0 spaced-comment:0 */

/**
 * 验证码
 */
const ccap = require('ccap')({
  width: 256, // default is 256

  height: 60, // default is 60

  offset: 60, // text spacing,default is 40

  quality: 100, // pic quality,default is 50

  generate: function () { //  Custom the function to generate captcha text
    return Array.apply(0, Array(4)).map(function () {
      return (function (charset) {
        return charset.charAt(Math.floor(Math.random() * charset.length));
      }('0123456789'));
    }).join('');
  },
});

exports.generateValidateCode = () => {
  const arrInfo = ccap.get();
  console.log(arrInfo[0]);
  console.log(arrInfo[1]);
  return [arrInfo[0], arrInfo[1]];
};
