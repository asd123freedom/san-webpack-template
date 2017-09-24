/**
 * @file mock data
 * @author autoresponse
 */

/* eslint-disable fecs-camelcase */
/* eslint-disable fecs-properties-quote */

/**
 * 获取 mock 响应数据
 *
 * @param {string} path 请求路径名
 * @param {Object} queryParam 查询参数信息
 * @param {Object} postParam post 的查询参数信息
 * @return {Object}
 */
module.exports = function (path, queryParam, postParam) {
    return {
        // 可以通过该属性来设置响应的延时，也可以设为值为'0,100'，表示随机 0-100ms 的延时，默认 0
        _timeout: 0,

        // 通过该状态来设置响应的 http 的状态码，默认 200
        _status: 200,

        // 对于要响应的 json 数据可以统一放在该字段里，也可以不使用该字段，直接跟 _xx 属性平级放
        _data: {
            errno: 0,
            errmsg: 'SUCCESS',
            data: {
                currentPage: 1,
                pageSize: 10,
                fileContent: [
                    {
                        'dataType': 12,
                        'dataName': 'CSV文件',
                        'path': 'c://123.csv'
                    }
                ],
                list: [{
                    'id': 1,
                    'type': 12,
                    'descpt': '导入描述',
                    'importNum': 100,
                    'sucNum': 80,
                    'failNum': 20,
                    'status': null,
                    'createUser': null,
                    'createTime': 1497509998,
                    'modifyTime': 0,
                    'percentage': 100
                },
                {
                    'id': 13,
                    'type': 12,
                    'descpt': 'hello',
                    'importNum': 3,
                    'sucNum': 3,
                    'failNum': 0,
                    'status': null,
                    'createUser': null,
                    'createTime': 1497602115,
                    'modifyTime': 1497873429,
                    'percentage': 100
                }]
            }
        }
    };
};

/* eslint-enable fecs-camelcase */
