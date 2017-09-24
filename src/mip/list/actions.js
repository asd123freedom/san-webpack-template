/**
 * @file 词典配置 action
 * @author liuchaofan
 */

import {store} from 'san-store';
import {updateBuilder} from 'san-update';
import {importList} from '../service';
import Notification from '../../common/ui/Notification';

export const IMPORT_LIST = 'cms/import/list';
export const IMPORT_LIST_FETCH = 'cms/import/fetchList';
export const IMPORT_LIST_FILL = 'cms/import/fillList';


const STATUS = 'errno';
const STATUSINFO = 'errmsg';
function extractData(res) {
    if (!res[STATUS]) {
        return res;
    }
    return Promise.reject({status: res[STATUS], message: res[STATUSINFO]});
}

store.addAction(IMPORT_LIST_FETCH, function (condition, {getState, dispatch}) {
    let promise = Promise.resolve();
    return promise
        .then(() => importList(condition))
        .then(extractData)
        .then(res => {
            let data = res.data;
            let fileContent = data.fileContent;
            let map = {};
            let arr = [];
            fileContent.map(item => {
                map[item.dataType + ''] = item.dataName;
                arr.push({
                    value: item.dataType,
                    title: item.dataName,
                    path: item.path
                });
            });
            arr.unshift({
                value: -1,
                title: '请选择'
            });

            data.list.map(item => {
                if (item.type) {
                    item.type = map[item.type + ''];
                }
                return map;
            });
            data.fileContent = arr;
            dispatch(IMPORT_LIST_FILL, data);
        });
});

store.addAction(IMPORT_LIST_FILL, function (list) {
    return updateBuilder().set(IMPORT_LIST, list);
});
