var merge = require("concat");
var files =[
    "src/assets/micro-frontends/apppensionista/vendors-node_modules_lodash_lodash_js.js", 
    "src/assets/micro-frontends/apppensionista/vendors-node_modules_ngx-bootstrap___ivy_ngcc___modal_fesm2015_ngx-bootstrap-modal_js.js",
    "src/assets/micro-frontends/apppensionista/vendors-node_modules_swimlane_ngx-datatable___ivy_ngcc___fesm2015_swimlane-ngx-datatable_js-n-7057c8.js",
    "src/assets/micro-frontends/apppensionista/projects_apppensionista_src_app_features_pago-domicilio_pago-domicilio_module_ts.js",
    "src/assets/micro-frontends/apppensionista/projects_apppensionista_src_app_features_autorizar-datos_autorizar-datos_module_ts.js",
    "src/assets/micro-frontends/apppensionista/projects_apppensionista_src_app_features_resoluciones_resoluciones_module_ts.js",
    "src/assets/micro-frontends/apppensionista/projects_apppensionista_src_app_features_boletas-pago_boletas-pago_module_ts.js",
    "src/assets/micro-frontends/apppensionista/projects_apppensionista_src_app_features_actualizar-datos_actualizar-datos_module_ts.js",
    "src/assets/micro-frontends/apppensionista/projects_apppensionista_src_app_features_solicitudes_solicitudes_module_ts.js",
    "src/assets/micro-frontends/apppensionista/projects_apppensionista_src_app_core_services_api_service_ts-projects_apppensionista_src_app_-44fd0c.js",
    "src/assets/micro-frontends/apppensionista/projects_apppensionista_src_app_features_ver-datos_ver-datos_module_ts.js",
    "src/assets/micro-frontends/apppensionista/projects_apppensionista_src_app_features_intereses-legales_intereses-legales_module_ts.js",
    "src/assets/micro-frontends/apppensionista/projects_apppensionista_src_app_core_services_common_service_ts-projects_apppensionista_src_a-c88cbe.js",
    // "src/assets/micro-frontends/apppensionista/projects_apppensionista_src_app_shared_shared_module_ts.js",
    
     "src/assets/micro-frontends/apppensionista/main.js",
    // "src/assets/micro-frontends/apppensionista/projects_apppensionista_src_app_shared_shared_module_ts.js",
    // "src/assets/micro-frontends/apppensionista/vendors-node_modules_lodash_lodash_js-node_modules_angular-devkit_build-angular_node_modules_-eef0ca.js" ,
];
merge(files,"src/assets/micro-frontends/apppensionista/master.js");
console.log('generate merge main pensionista');