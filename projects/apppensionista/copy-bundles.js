const copy = require('copy');

console.log('Copy UMD bundles proyecto pensionista ...');

copy('src/assets/css/*', 'projects/apppensionista/src/assets/css/', {}, _ => {});
copy('src/assets/images/*', 'projects/apppensionista/src/assets/images/', {}, _ => {});
copy('src/assets/js/*', 'projects/apppensionista/src/assets/js/', {}, _ => {});
copy('src/assets/css/fonts/*', 'projects/apppensionista/src/assets/css/fonts/', {}, _ => {});