#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cryptoer = require('../tools/cryptoer.js');
const versionConfig = require('../../version.json');

const compilerDir = path.join(__dirname, '../' + versionConfig.compileDir);
const filePathArr = [];
const fileObj = [];

// 1. 读取目标目录下所文件
// 2. 文件名做md5加密（取8位）
// 3. 根据加密文件名复制文件到原目录
function walk() {
  fs.readdirSync(compilerDir)
    .forEach(file=> {
      const newPath = compilerDir + '/' + file;
      const stat = fs.statSync(newPath);
      if (stat.isFile()) {
        filePathArr.push(newPath);
        fileObj[file] = file.substr(0, file.indexOf('.') + 1) + cryptoer.md5(file).substr(0, 8) + path.extname(newPath);
      } else if (stat.isDirectory()) {
        walk(newPath);
      }
    });
}

walk();
console.log(fileObj);
console.log(filePathArr);

function writeMd5File() {
  for (let key in fileObj) {
    const md5File = fileObj[key];
    const fileContent = fs.readFileSync(compilerDir + '/' + key, 'utf8');
    fs.writeFileSync(compilerDir + '/' + md5File, fileContent, 'utf8');
  }
}
writeMd5File();


// --------------------------------------------

// 1. 读取替换目录所有文件
// 2. 替换所有引用

const replaceDir = path.join(__dirname, '../' + versionConfig.replaceDir);
function replaceVersion() {
  fs.readdirSync(replaceDir).forEach(file=> {
    let fileContent = fs.readFileSync(replaceDir + '/' + file, 'utf8');
    for (let key in fileObj) {
      const md5File = fileObj[key];
      if (fileContent.indexOf(key) !== -1) {
        console.log('//// 执行替换 ////');
        console.log(key);
        console.log(fileContent);
        fileContent = fileContent.replace(key, md5File);
        fs.writeFileSync(replaceDir + '/' + file, fileContent, 'utf8');
      }
    }
  });
}
replaceVersion();
