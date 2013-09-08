'use strict';

var worker_children = [],
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

//todo 二期 ： 增加服务器rewrite功能
function createWorker(){
    var worker = cp.fork(__dirname + "/worker.js");
    worker.on("exit", handleWorkerClose);
    return worker;
}

function handleWorkerClose(){
    fis.log.debug("handle worker close");
    for(var i=used_workers.length; i>0; i--){
        var worker = createWorker();
        worker_children[used_workers.pop()] = worker;
    }
}

function onConnection(handle){
    fis.log.debug("get a connection");
    last_child_pos++;
    if(last_child_pos >= WORKER_NUMBER){
        last_child_pos = 0;
    }
    fis.log.debug("child " + last_child_pos + " process the connection.");
    worker_children[last_child_pos].send({"handle" : true}, handle);
    used_workers.push(last_child_pos);
    handle.close();
}

/**
 * 启动一个TCP服务器
 * @param port
 */
function startServer(port){

    var address = "0.0.0.0",
        server = new TCP();

    port = port || 3459;

    fis.log.debug("starting a server on port " + port);

    //todo 二期 ： 需要检测端口是否已经开启，提醒报错
    server.bind(address, port);
    server.onconnection = onConnection;
    server.listen(1023);
}

function startWorker(){
    for(var i=0; i<WORKER_NUMBER; i++){
        var worker = createWorker();
        worker_children.push(worker);
    }
}

exports.start = function(port){
    startWorker();
    startServer(port);
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