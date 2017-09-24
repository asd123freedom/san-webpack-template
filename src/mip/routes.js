/**
 * @file mip 路由配置
 * @author zhangsiyuan
 */

import ImportList from './list/import.san';

export default [
    {
        rule: '/mip/list/import',
        Component: ImportList,
        data: {
            nav: '/mip/list/import'
        }
    }
];
