/**
 * @file index
 * @author zhangsiyuan(zhangsiyuan@baidu.com)
 * @author liuchaofan(liuchaofan@baidu.com)
 */

// common
import './common/index';
// child apps
import './home/index';
import './mip/index';

import App from './App';
// config user
import {setOption as setUser} from './common/user';
setUser({
    url: ''
});
let titleName = '人工干预平台';

let menus = [
    {
        name: '通用批量导入',
        url: '/mip/list/import',
        icon: 'fa fa-list'
    }
];

// app
new App({
    data: {
        titleName,
        menus
    }
}).attach(document.getElementById('root'));
