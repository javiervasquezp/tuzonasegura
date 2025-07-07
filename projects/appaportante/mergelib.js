var merge = require("concat");
var files =[
    "src/assets/micro-frontends/appaportante/main.js",
    "src/assets/micro-frontends/appaportante/projects_appaportante_src_app_features_actualizar-datos_actualizar-datos_module_ts.js",
    "src/assets/micro-frontends/appaportante/projects_appaportante_src_app_features_ver-aportes_ver-aportes_module_ts.js",
    "src/assets/micro-frontends/appaportante/projects_appaportante_src_app_features_solicitudes_solicitudes_module_ts.js",
    "src/assets/micro-frontends/appaportante/projects_appaportante_src_app_features_centro-atencion-virtual_centro-atencion-virtual_module_ts.js",
    "src/assets/micro-frontends/appaportante/projects_appaportante_src_app_shared_shared_module_ts-projects_apppensionista_src_app_core_se-73f571.js",
    // "src/assets/micro-frontends/appaportante/vendors-node_modules_lodash_lodash_js.js",
    // "src/assets/micro-frontends/appaportante/vendors-node_modules_ngx-bootstrap___ivy_ngcc___modal_fesm2015_ngx-bootstrap-modal_js-node_mo-95d4b4.js",
    // "src/assets/micro-frontends/appaportante/vendors-node_modules_ngx-bootstrap___ivy_ngcc___modal_fesm2015_ngx-bootstrap-modal_js.js"
    "src/assets/micro-frontends/appaportante/vendors-node_modules_lodash_lodash_js-node_modules_angular-devkit_build-angular_node_modules_-eef0ca.js",
    "src/assets/micro-frontends/appaportante/vendors-node_modules_ngx-bootstrap___ivy_ngcc___modal_fesm2015_ngx-bootstrap-modal_js-node_mo-e6876e.js"
];
merge(files,"src/assets/micro-frontends/appaportante/master.js");
console.log('generate merge main aportante');