/**
 * @file NotificationItem
 * @author zhangsiyuan(zhangsiyuan@baidu.com)
 */

import {Component} from 'san';
import Icon from 'san-mui/Icon';

const typeMap = {
    success: 'check_circle',
    info: 'info',
    warning: 'error',
    error: 'cancel'
};

export default class NotificationItem extends Component {
    static template = `
    <div
        class="sm-notification {{customClass}} {{closed ? 'state-hidden' : 'state-open'}}"
        style="top: {{top}}px"
        on-mouseenter="clearTimer"
        on-mouseleave="startTimer"
        on-click="handleClick">
        <san-icon
            san-if="type"
            class="sm-notification-type type-{{type}}"
            size="50">{{iconType}}</san-icon>
        <div class="sm-notification-group" >
            <p class="sm-notification-title">{{title}}</p>
            <div class="sm-notification-content">{{message}}</div>
            <div on-click="close($event)" class="sm-notification-close">
                <san-icon size="20" class="sm-notification-close-btn">close</san-icon>
            </div>
        </div>
    </div>
    `;

    initData() {
        return {
            title: '',
            message: '',
            duration: 3000,
            closed: true
        };
    }

    static components = {
        'san-icon': Icon
    };

    static computed = {
        iconType() {
            return typeMap[this.data.get('type')];
        }
    };

    handleClick() {
        this.fire('itemClick');
    }

    /**
     * close 关闭实例
     *
     * @param {Object} e event对象
     */
    close(e) {
        if (e) {
            e.stopPropagation();
        }
        this.data.set('closed', true);
        // 监听动画结束后派发close方法从而销毁实例
        this.el.addEventListener('transitionend', () => {
            this.fire('close');
        });
    }

    /**
     * 清除计时器
     */
    clearTimer() {
        clearTimeout(this.timer);
    }

    /**
     * 开始计时器
     */
    startTimer() {
        const duration = this.data.get('duration');
        if (duration > 0) {
            this.timer = setTimeout(() => {
                if (!this.closed) {
                    this.close();
                }
            }, duration);
        }
    }

    attached() {
        if (this.el.parentNode !== document.body) {
            document.body.appendChild(this.el);
        }
        // 异步触发改变className
        requestAnimationFrame(() => {
            this.data.set('closed', false);
        });

        this.startTimer();
    }

    detached() {
        this.clearTimer();
    }
}
