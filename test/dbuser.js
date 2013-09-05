var fis = require("./../fis-cloud-kernel.js"),
    Base64 = require('js-base64').Base64;

//var name = 'wangcheng',
//    password = '890714',
//    _auth = Base64.encode((name + password).toString());
//
//fis.db.insert('user', name, {_id : name, name : name, password : password, _auth : _auth}, {} , function(err, result){
//    console.log(result);
//});
//
//name = 'zhangsan';
//password = '22222';
//_auth = Base64.encode((name + password).toString());
//
//fis.db.insert('user', name, {_id : name, name : name, password : password, _auth : _auth}, {} , function(err, result){
//    console.log(result);
//});

name = 'root';
password = 'root';
_auth = Base64.encode((name + password).toString());

fis.db.insert('user', name, {_id : name, name : name, password : password, _auth : _auth}, {} , function(err, result){
    console.log(result);
});


//fis.db.findOne("user", "zhangsan", {name : "zhangsan"}, function(err, result){
//    if(!err){
//        result.password = "325435";
//        fis.db.update("user", "zhangsan", {name : "zhangsan"}, result, {}, function(error, result){
//            console.log(error);
//            console.log(result);
//        });
//    }else{
//        console.log("error" + err);
//    }
//});
