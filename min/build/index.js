"use strict";function _typeof(a){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}var acorn=_interopRequireWildcard(require("acorn")),_fs=_interopRequireDefault(require("fs")),_path=_interopRequireDefault(require("path")),_python=_interopRequireDefault(require("./parse/python"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var a=new WeakMap;return _getRequireWildcardCache=function(){return a},a}function _interopRequireWildcard(a){if(a&&a.__esModule)return a;if(null===a||"object"!==_typeof(a)&&"function"!=typeof a)return{default:a};var b=_getRequireWildcardCache();if(b&&b.has(a))return b.get(a);var c={},d=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var e in a)if(Object.prototype.hasOwnProperty.call(a,e)){var f=d?Object.getOwnPropertyDescriptor(a,e):null;f&&(f.get||f.set)?Object.defineProperty(c,e,f):c[e]=a[e]}return c["default"]=a,b&&b.set(a,c),c}function check(a){var b=!1;try{_fs["default"].statSync(a),b=!0}catch(a){b=!1}return b}function read(a){return check(a)?_fs["default"].readFileSync(a,"utf8"):""}if(process.argv[2]||console.log("\u5F15\u6570\u304C\u4E0D\u8DB3\u3057\u3066\u307E\u3059\n\u7B2C\u4E00\u5F15\u6570\u306B\u30D5\u30A1\u30A4\u30EB\u30D1\u30B9\u3092\u6307\u5B9A\u3057\u3066\u4E0B\u3055\u3044"),2!==process.argv.findIndex(function(a){return"-t"===a})){var parse=null===acorn||void 0===acorn?void 0:acorn.parse(read(_path["default"].resolve("test/test.js")),{ecmaVersion:2020,allowAwaitOutsideFunction:!0,allowImportExportEverywhere:!0}),out="jstc\uFF3Fbuild";-1!==process.argv.findIndex(function(a){return"-out"===a})&&(process.argv[process.argv.findIndex(function(a){return"-out"===a})+1]?out=process.argv[process.argv.findIndex(function(a){return"-out"===a})+1]:console.log("\u5F15\u6570\u304C\u4E0D\u8DB3\u3057\u3066\u3044\u307E\u3059")),check(_path["default"].resolve(out))||_fs["default"].mkdir(_path["default"].resolve(out),function(a){if(a)throw a}),_fs["default"].writeFileSync(_path["default"].resolve(out)+"/index.py",(0,_python["default"])(parse).code,"utf8"),console.log((0,_python["default"])(parse)),-1!==process.argv.findIndex(function(a){return"-t"===a})&&_fs["default"].writeFileSync(_path["default"].resolve(_path["default"].resolve(out)+"/build.json"),parse?JSON.stringify(parse):"{}","utf8")}else console.log("\u7B2C\u4E00\u5F15\u6570\u306B\u306F\u30D5\u30A1\u30A4\u30EB\u30D1\u30B9\u3092\u6307\u5B9A\u3057\u3066\u4E0B\u3055\u3044");