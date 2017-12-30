const path = require('path');
const fs = require('fs');
const mainPackage = require('../package.json');

fs.writeFile(path.join(process.cwd(), 'packages/uhk-web/src/app/app-version.ts'), `// Generated by generate-version-module.js, do not modify
export const appVersion = '${mainPackage.version}';
`, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log(`Version module generated with version "${mainPackage.version}"`);
});
