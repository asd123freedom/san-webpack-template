/**
 * @file Notification 方法
 * @author zhangsiyuan(zhangsiyuan@baidu.com)
 */

import NotificationItem from './NotificationItem';

let seed = 1;
// 实例数组
const instances = [];

/**
 * 计算每一个实例距离顶部高度
 *
 * @param {number} topDist 偏移值
 * @return {number} 最终计算高度
 */
function calcTopDist(topDist = 16) {
    for (let i = 0, len = instances.length; i < len; i++) {
        topDist += (instances[i].vm.el.offsetHeight + 16);
    }
    return topDist;
}

/**
 * Notification 主方法
 *
 * @param {Object} options 参数
 * @return {NotificationItem} 实例
 */
const notification = function (options = {}) {
    options.top = calcTopDist(options.offset);
    // 取出自定义方法并删掉多余属性
    const {onClose, onClick} = options;
    delete options.onClick;
    delete options.onClose;
    delete options.offset;
    // 实例初始化vm和id
    const instance = {
        vm: new NotificationItem({
            data: options
        }),
        id: `notification_${seed++}`
    };

    if (typeof onClick === 'function') {
        instance.vm.on('itemClick', onClick);
    }
    instance.vm.on('close', () => {
        notification.close(instance.id, onClose);
    });
    instance.vm.attach(document.body);

    instances.push(instance);
    return instance.vm;
};

/**
 * close 静态方法用来关闭实例
 *
 * @param {string} id 实例的ID
 * @param {Function} onClose 自定义方法
 */
notification.close = function (id, onClose) {
    let index;
    // 要移除的实例的高度
    let removedHeight;
    let len = instances.length;
    for (let i = 0; i < len; i++) {
        if (id === instances[i].id) {
            if (typeof onClose === 'function') {
                onClose(instances[i]);
            }
            index = i;
            removedHeight = instances[i].vm.el.offsetHeight;
            // 销毁实例
            instances[i].vm.dispose();
            instances[i] = null;
            // 实例数组中移除这个实例
            instances.splice(i, 1);
            break;
        }
    }
    // 改变剩余的实例的高度
    if (len > 1) {
        for (let i = index; i < len - 1; i++) {
            instances[i].vm.el.style.top = `${parseInt(instances[i].vm.el.style.top, 10) - removedHeight - 16}px`;
        }
    }

};
// 四个静态方法
['success', 'warning', 'info', 'error'].forEach(type => {
    notification[type] = options => {
        // 如果传入的是string类型就当做message展示
        if (typeof options === 'string') {
            options = {
                message: options
            };
        }
        options = options || {};
        options.type = type;
        return notification(options);
    };
});

export default notification;
