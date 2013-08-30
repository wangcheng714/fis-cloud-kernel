var fis = require("./../fis-cloud-kernel.js");

var pkg1 = {
    "_id": "lily-test",
    "_rev": "7-57d8324efdaa59ca5442778fd1df1d9a",
    "name": "lily-test",
    "description": "Front End Integrated Solution for PC",
    "dist-tags": {
        "latest": "0.1.1"
    },
    "versions": {
        "0_1_1": {
            "name": "lily-test",
                "version": "0.1.1",
                "description": "Front End Integrated Solution for PC",
                "main": "fis-pc.js",
                "bin": {
                "fis-pc": "bin/fis-pc",
                    "fisp": "bin/fis-pc"
            },
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1"
            },
            "repository": {
                "type": "git",
                    "url": "https://github.com/xiangshouding/fis-pc.git"
            },
            "dependencies": {
                "fis": "1.0.0",
                    "fis-preprocessor-extlang": "0.0.3",
                    "fis-postprocessor-require-async": "0.0.3",
                    "fis-optimizer-smarty-xss": "0.0.3",
                    "fis-optimizer-html-compress": "0.0.2",
                    "fis-parser-bdtmpl": "0.0.1",
                    "fis-parser-less": "0.0.5"
            },
            "keywords": [
                "fis",
                "fis-pc"
            ],
            "maintainers": [
                {
                    "name": "lily-zhangying",
                    "email": "zhangying3210@gmail.com"
                }
            ]
        }
    },
    "readme": "ERROR: No README data found!",
    "maintainers": [
        {
            "name": "lily-zhangying",
            "email": "zhangying3210@gmail.com"
        }
    ],
    "time": {
        "0_1_0": "2013-07-31T04:15:24.902Z",
        "0_1_1": "2013-07-31T05:33:52.512Z"
    },
    "author": {
        "name": "fis"
    },
    "repository": {
        "type": "git",
            "url": "https://github.com/xiangshouding/fis-pc.git"
    }
};

fis.db.insert("pkgs", {}, pkg1, {}, function(err, result){
    console.log(result);
});