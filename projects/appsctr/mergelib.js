var merge = require("concat");
var files =[
    "src/assets/micro-frontends/appsctr/main.js",
    //"src/assets/micro-frontends/appsctr/projects_apppensionista_src_app_features_boletas-pago_boletas-pago_module_ts.js", 
];
merge(files,"src/assets/micro-frontends/appsctr/master.js");
console.log('generate merge main sctr');