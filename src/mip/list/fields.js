/**
 * @file 列表字段集合
 * @author liuchaofan
 */

import moment from 'moment';
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
let map = {'0': '未处理', '1': '处理中', '2': '成功', '3': '失败'};
// const TIME_FORMAT = 'HH:mm:ss';

export let id = {
    title: '编号',
    prop: 'id',
    className: 'id'
};

export let type = {
    title: '数据类型',
    prop: 'type',
    className: 'type'
};

export let descpt = {
    title: '导入描述',
    prop: 'descpt',
    className: 'descpt'
};

export let importNum = {
    title: '文件行数',
    prop: 'importNum',
    className: 'importNum'
};

export let sucNum = {
    title: '成功行数',
    prop: 'sucNum',
    className: 'sucNum'
};

export let failNum = {
    title: '失败行数',
    prop: 'failNum',
    className: 'failNum'
};
export let status = {
    title: '状态',
    prop: 'status',
    className: 'status',
    content(item) {
        return map[item.status + ''];
    }
};
export let createUser = {
    title: '创建人',
    prop: 'createUser',
    className: 'createUser'
};
export let createTime = {
    title: '创建时间',
    prop: 'createTime',
    className: 'createTime',
    content(item) {
        let timestamp = item.createTime;
        let date = moment(timestamp + '', 'X');
        return date.format(DATE_FORMAT);
    }
};

export let modifyTime = {
    title: '修改时间',
    prop: 'modifyTime',
    className: 'modifyTime',
    content(item) {
        let timestamp = item.modifyTime;
        let date = moment(timestamp + '', 'X');
        return date.format(DATE_FORMAT);
    }
};

export let percentage = {
    title: '进度',
    prop: 'percentage',
    className: 'percentage',
    content(item) {
        return item.percentage + '%';
    }
};
