/**
 * @file fis-deploy
 *
 * @usage
 *   fis3 release --root=./dist/ --file=./tool/fis-conf.js
 */

let path = require('path');

// local test
fis.media('local').match('*', {
    useCompile: false,
    deploy: fis.plugin('local-deliver', {
        to: path.resolve(__dirname, '../output')
    })
});

// cms
let CMS_HOST = 'http://cp01-rdqa-dev336.cp01.baidu.com:8192/';
let CMS_DIR = '/home/users/zhangwanlong/dev/odp';
fis.media('cms').match('!(*.html)', {
    useCompile: false,
    deploy: fis.plugin('http-push', {
        receiver: CMS_HOST + '/receiver.php',
        to: CMS_DIR + '/webroot/static/cms'
    })
});

fis.media('cms').match('*.html', {
    useCompile: false,
    deploy: fis.plugin('http-push', {
        receiver: CMS_HOST + '/receiver.php',
        to: CMS_DIR + '/template/cms'
    })
});
