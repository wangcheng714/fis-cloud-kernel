var fis = require("./../fis-cloud-kernel.js"),
    Base64 = require('js-base64').Base64;

//var name = 'wangcheng',
//    password = '890714',
//    _auth = Base64.encode((name + password).toString());
//
//fis.db.insert('user', {}, {username : name, password : password, _auth : _auth}, {} , function(err, result){
//    console.log(result);
//});
//
//name = 'zhangsan';
//password = '22222';
//_auth = Base64.encode((name + password).toString());
//
//fis.db.insert('user', {}, {username : name, password : password, _auth : _auth}, {} , function(err, result){
//    console.log(result);
//});

//fis.db.findOne("user", {}, {username:"wangcheng"}, function(err, result){
//    if(!err){
//        console.log("ok" + result);
//    }else{
//        console.log("error" + err);
//    }
//
//});

fis.db.find("user", "wangcheng", {}, {}, {}, function(err, result){
    if(!err){
        result.toArray(function(err, users){
            //console.log(users);
            console.log(users[0]);
            console.log(users[1]);
        });
    }else{
        console.log(err);
    }
});

