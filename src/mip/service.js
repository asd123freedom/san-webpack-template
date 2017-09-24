/**
 * @file mip service 数据服务
 * @author zhangsiyuan(zhangsiyuan@baidu.com)
 */

import axios from 'axios';
import qs from 'qs';
import Notification from '../common/ui/Notification';

const STATUS = 'errno';
const STATUSINFO = 'errmsg';

const instance = axios.create({
    baseURL: '/',
    timeout: 30000
});

const makeService = (url, opt = {method: 'get'}) => (params = {}) => {

    if (opt.method === 'delete' || opt.method === 'get') {
        params = {params};
    }
    return instance[opt.method](url, params);
};

instance.interceptors.response.use(function (response) {
    const data = response.data;
    if (data[STATUS] !== 0) {
        Notification.error(data[STATUSINFO]);
        return Promise.reject(data);
    }
    return data;
}, function (error) {
    Notification.error('网络异常');
    return Promise.reject(error);
});

// 表单数据提交的实例
const formInstance = axios.create({
    baseURL: '/',
    timeout: 3000,
    transformRequest: [data => qs.stringify(data)],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

formInstance.interceptors.response.use(function (response) {
    const data = response.data;
    if (data[STATUS] !== 0) {
        Notification.error(data[STATUSINFO]);
        return Promise.reject(data);
    }
    return data;
}, function (error) {
    Notification.error('网络异常');
    return Promise.reject(error);
});

const makeFormService = (url, method = 'post') => (params = {}) => formInstance[method](url, params);
export const importList = makeService('/cms/import/list');
