const copy = require('copy');

console.log('Copy UMD bundles proyecto aportante ...');

copy('src/assets/css/*', 'projects/appaportante/src/assets/css/', {}, _ => {});
copy('src/assets/images/*', 'projects/appaportante/src/assets/images/', {}, _ => {});
copy('src/assets/js/*', 'projects/appaportante/src/assets/js/', {}, _ => {});
copy('src/assets/css/fonts/*', 'projects/appaportante/src/assets/css/fonts/', {}, _ => {});