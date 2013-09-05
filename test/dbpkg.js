var fis = require("./../fis-cloud-kernel.js");

var pkg1 = {
    name: 'fis-cloud-app-ppt',
    version: '0.0.3',
    description: 'fis-cloud-app-ppt',
    main: 'fis-cloud-app-ppt.js',
    dependencies: { ejs: '*', marked: '0.2.9' },
    devDependencies: {},
    author: 'wangcheng-test',
    license: 'BSD',
    latest: '0.0.2',
    time : '2013-08-04 13:30:46',
    _attachments:{
        name : 'fis-cloud-app-ppt-0__0__3__zip',
        'content-type': 'application/zip',
        length: 24
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/xiangshouding/fis-pc.git"
    },
    "versionHistory" : [
        "0.0.0",
        "0.0.1"
    ],
    "versions": {
        "0__0__1": {
            "name": "fis-cloud-kernel",
            "version": "0.1.1",
            "description": "Front End Integrated Solution for PC",
            "main": "fis-pc.js",
            "readme": "ERROR: No README data found!",
            "repository": {
                "type": "git",
                "url": "https://github.com/xiangshouding/fis-pc.git"
            },
            "keywords": [
                "fis",
                "fis-pc"
            ],
            "maintainers": [
                {
                    name : "lily-zhangying",
                    email : "zhangying3210@gmail.com"
                }
            ],
            _attachments:{
                name : 'fis-cloud-app-ppt-0__0__1__zip',
                'content-type': 'application/zip',
                length: 24
            }
        }
    }
};

//fis.db.insert("pkgs", {}, pkg1, {}, function(err, result){
//    console.log(result);
//});



//fis.db.find("pkgs", "wangcheng", {}, {}, {}, function(error, result){
//    if(!error){
//        result.toArray(function(error, pkgs){
//            if(!error){
//                console.log(pkgs);
//            }else{
//                console.log(error);
//            }
//        });
//    }else{
//        console.log(error);
//    }
//});

//fis.db.update("pkgs", "wangcheng", {name : "fis-cloud-app-ppt"}, pkg, {}, function(error, result){
//    console.log(error);
//    console.log(result);
//});

fis.db.findOne("pkgs", "wangcheng", {name : "fis-cloud-app-ppt"}, function(error, pkg){
    console.log(error);
    console.log("=============");
    console.log(pkg);
});