var fis = require("./../fis-cloud-kernel.js");

fis.db.read("fis-cloud-app-ppt-0.0.3s.zip", {}, function(error, result){
    console.log(error);
    console.log(result);
});