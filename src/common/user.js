/**
 * @file  用户
 * @author menglingjun
 * @upate funa01
 */

import axios from 'axios';

let instance = axios.create({
    baseURL: '/',
    timeout: 50000
});

let config = {
    url: '/audit/content/user',
    fomat(res) {
        return res;
    }
};

export const setOption = opt => Object.assign(config, opt);

export const fetch = (params = {}) => {
    if (config.url) {
        return instance.get(config.url, params).then(config.format);
    }
    return Promise.resolve();
};
