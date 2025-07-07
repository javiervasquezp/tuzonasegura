const copy = require('copy');

console.log('Copy UMD bundles proyecto empleador ...');

copy('src/assets/css/*', 'projects/appempleador/src/assets/css/', {}, _ => {});
copy('src/assets/images/*', 'projects/appempleador/src/assets/images/', {}, _ => {});
copy('src/assets/js/*', 'projects/appempleador/src/assets/js/', {}, _ => {});
copy('src/assets/css/fonts/*', 'projects/appempleador/src/assets/css/fonts/', {}, _ => {});