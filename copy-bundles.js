//
// This script copies over UMD bundles to the project's assets folder
// It's called by the npm script npx-build-plus:copy-assets
// If you call it manually, call it from your projects root
// > node /copy-bundles.js
//

const copy = require('copy');

console.log('Copy UMD bundles proyecto principal DIST...');
copy('src/assets/micro-frontends/apppensionista/*.js', 'dist/TuZonaSegura/assets/micro-frontends/apppensionista', {}, _ => {});

//copy('node_modules/@angular/*/bundles/*.umd.js', 'src/assets', {}, _ => {});
//copy('node_modules/rxjs/bundles/*.js', 'src/assets/rxjs', {}, _ => {});
//copy('node_modules/zone.js/dist/*.js', 'src/assets/zone.js', {}, _ => {});
//copy('node_modules/core-js/client/*.js', 'src/assets/core-js', {}, _ => {});

//copy('node_modules/@angular/*/bundles/*.js.map', 'src/assets', {}, _ => {});
//copy('node_modules/rxjs/bundles/*.js.map', 'src/assets/rxjs', {}, _ => {});
//copy('node_modules/zone.js/dist/*.js.map', 'src/assets/zone.js', {}, _ => {});
//copy('node_modules/core-js/client/*.js.map', 'src/assets/core-js', {}, _ => {});
