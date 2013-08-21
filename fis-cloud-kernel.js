'use strict';

var fis = module.exports = {};

//Fis添加到全局中
Object.defineProperty(global, 'fis', {
    enumerable : true,
    writable : false,
    value : fis
});

//log
fis.log = require('./lib/log.js');
//util
fis.util = require('./lib/util.js');
//db
fis.db = require('./lib/db.js');
//server
fis.server = require('./lib/server.js');


