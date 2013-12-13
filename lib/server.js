'use strict';

var works = [],
    used_workers = [],
    WORKER_NUMBER = 10,
    last_child_pos = 0,
    cp = require("child_process"),
    fs = require('fs'),
    TCP = process.binding("tcp_wrap").TCP,
    accessLogFile = __dirname + "/../logs/access.log",
    errorLogFile = __dirname + "/../logs/error.log",
    accessLogStream = null,
    errorLogStream = null;

var GRACE_EXIT_TIME = 2000;//2s

//todo 二期 ： 增加服务器rewrite功能
function createWorker(){
    if(exitTimer) return;
    var worker = cp.fork(__dirname + "/worker.js");
    worker.on("exit", handleWorkerClose);
    works.push(worker);
    if(handles.length){
        send(handles.shift());
    }
}

var kill_num = 0;
function handleWorkerClose(){
    fis.log.debug("handle" + kill_num + " worker closed");
    kill_num++;
    createWorker();
}

var handles = [];
function send(handle){
    fis.log.debug("get a connection");
    if(works.length){
        var work = works.pop();
        work.send({"handle" : true}, handle);
        handle.close();
    }else{
        handles.push(handle);
    }
}

var server = null,
    exitTimer = null;

function aboutExit(){
    if(exitTimer) return;

    server.close();
    works.forEach(function(c){
        c.kill();
    })
    exitTimer = setTimeout(function(){
        console.log('master exit...');
        process.exit(0);
    }, GRACE_EXIT_TIME);
}

/**
 * 启动一个TCP服务器
 * @param port
 */
function startServer(port){

    var address = "0.0.0.0";

    server = new TCP();
    port = port || 3459;

    fis.log.debug("starting a server on port " + port);

    //todo 二期 ： 需要检测端口是否已经开启，提醒报错
    server.bind(address, port);
    server.onconnection = send;
    server.listen(1023);
}

function startWorker(){
    for(var i=0; i<WORKER_NUMBER; i++){
        createWorker();
    }
}

exports.start = function(port){
    startWorker();
    startServer(port);
    process.on('SIGINT' , aboutExit);
    process.on('SIGTERM' , aboutExit);
};

exports.getErrorStream = function(){
    if(!fis.util.isFile(errorLogFile)){
        fis.util.write(errorLogFile, "", "utf-8")
    }
    if(!errorLogStream){
        errorLogStream = fs.createWriteStream(errorLogFile, {flags : 'a'});
    }
    return errorLogStream;
};

exports.getAccessStream = function(){
    if(!fis.util.isFile(accessLogFile)){
        fis.util.write(accessLogFile, "", "utf-8")
    }
    if(!accessLogStream){
        accessLogStream = fs.createWriteStream(accessLogFile, {flags : 'a'});
    }
    return accessLogStream;
};