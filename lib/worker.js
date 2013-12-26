'use strict';

var net = require("net"),
    http = require("http"),
    express = require("express"),
    domain = require("domain"),
    //fis = require('fis-cloud-kernel'),
    fis = require('../fis-cloud-kernel.js'),
    app = express(),
    accessLogStream = fis.server.getAccessStream(),
    errorLogStream = fis.server.getErrorStream();

app.use(express.logger({stream: accessLogStream}));
app.use(express.bodyParser({keepExtensions:true}));
app.use(express.cookieParser('manny is cool'));
app.use(express.cookieSession());

//add session for template to access
app.use(function(req,res,next){
    res.locals.req = req;
    res.locals.session = req.session;
    next();
});

app.use(function(req, res, next){
    var d = domain.create();
    //监听domain的错误事件
    d.on('error', function(er) {

        //记录log日志
        var errorMsg = '[' + new Date() + '] ' + req.url + '\n' + er.message + '\n' + er.stack + '\n';
        errorLogStream.write(errorMsg);

        //页面返回错误信息
        res.statusCode = 500;
        res.setHeader('content-type', 'text/plain');
        var errorMsg = 'Oops, there was a problem!\n' + er.message + '\n' + er.stack;
        res.end(errorMsg);
        process.disconnect();
        process.exit();
    });
    d.add(req);
    d.add(res);
    d.run(next);
});

app.all("*", handleRequest);

//express会首先捕获异常，导致domain无法捕获，所以这里使用nextTick跳出express的stack
function handleRequest(req, res){
    process.nextTick(function(){
        var pathName = req.path;
        //todo 二期 ： favicon能否有更好的处理方式？ 尝试采用express的favicon中间件
        if(pathName == "/favicon.ico"){
            var filePath = __dirname + "/../static/favicon.ico",
                ext = fis.util.pathinfo(filePath).ext,
                contentType = fis.util.getMimeType(ext),
                content = fis.util.read(filePath);
            res.type(contentType);
            res.send(content);
        }else{
            if(pathName.substr(0, 1) === '/'){
                pathName = pathName.substr(1);
            }
			
			var urlSplit =  pathName.split('/');
			if(!urlSplit[0]){
                //没有app，直接跳转到repos/components页面。todo：后续改为conf文件配置路由跳转
                var appName = 'repos',
                    appMethod = 'components';
            }else{
                var appName = urlSplit[0],
                    appMethod = urlSplit[1];
            }
            var fis_app =  requireApp(appName);
            app.set("appName", appName);
            if(typeof fis_app[appMethod] === 'function'){
                fis_app[appMethod](req, res, app);
            }else if(typeof fis_app === 'function'){
                fis_app(req, res, app);
            } else {
                res.send(404, 'Sorry, Not Found');
            }
        }
    });
}

var server = http.createServer(app);

function handleMessage(self, handle){
    var socket = new net.Socket({
        handle : handle,
        allowHalfOpen : self.allowHalfOpen
    });
    socket.readable = socket.writable = true;
    socket.resume();
    socket.server = self;
    socket.on("close", function(){
        console.log('close');
        process.disconnect();
        process.exit();
    });
    self.emit("connection", socket);
    socket.emit("connect");
}

function requireApp(appName){
    var name = 'fis-cloud-app-' + appName;
    try{
        return require(name);
    }catch(ex){
        ex.message = 'unable to load plugin [' + name + '], message : ' + ex.message;
        fis.log.error(ex);
    }
}

process.on("message", function(m ,handle){
    if(handle){
        handleMessage(server, handle);
    }
});