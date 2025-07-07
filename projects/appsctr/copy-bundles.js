const copy = require('copy');

console.log('Copy UMD bundles proyecto sctr ...');

copy('src/assets/css/*', 'projects/appsctr/src/assets/css/', {}, _ => {});
copy('src/assets/images/*', 'projects/appsctr/src/assets/images/', {}, _ => {});
copy('src/assets/js/*', 'projects/appsctr/src/assets/js/', {}, _ => {});
copy('src/assets/css/fonts/*', 'projects/appsctr/src/assets/css/fonts/', {}, _ => {});