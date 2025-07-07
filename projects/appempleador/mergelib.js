var merge = require("concat");
var files =[
    "src/assets/micro-frontends/appempleador/main.js",
    //"src/assets/micro-frontends/appempleador/vs.js",  
];
merge(files,"src/assets/micro-frontends/appempleador/master.js");
console.log('generate merge main empleador');