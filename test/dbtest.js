var fis = require("./../fis-cloud-kernel.js");

fis.db.insert("user", null, {_id:'wangcheng', email:'wangcheng@baidu.com', group:'fis'}, {}, function(err, result){

    if(err){
        console.log(err);
    }else{
        console.log(1);
        console.log(result);
    }
});



fis.db.find("user", "wangcheng", {}, {}, {}, function(err, result){
    if(err){
        console.log(err);
    }else{
        result.each(function(err, user){
            console.log("find");
            console.log(user);
        });
    }
});
