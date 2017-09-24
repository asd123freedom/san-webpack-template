/**
 * @file 可以拖拽的 TR
 * @author liuchaofan
 */

import {TR} from 'san-mui/Table';

export default class DragTR extends TR {

    inited() {
        super.inited && super.inited();
        // genProp(this, 'draggable');
    }

    attached() {
        super.attached && super.attached();
        this.el.setAttribute('draggable', 'true');
        this.el.classList.add('draggable');
        this.el.addEventListener('dragstart', this.handleDragStart.bind(this), false);
        this.el.addEventListener('dragenter', this.handleDragEnter.bind(this), false);
        this.el.addEventListener('dragleave', this.handleDragLeave.bind(this), false);
        this.el.addEventListener('drop', this.handleDrop.bind(this), false);
        this.el.addEventListener('dragover', this.handleDragOver.bind(this), false);
    }

    handleDragStart(event) {
        event.dataTransfer.effectAllowed = 'move';
        // IN FF need to set to something or else drag doesn't start
        event.dataTransfer.setData('text', '*');
        this.dispatch('UI:tr-drag-start', event);
    }

    handleDragEnter(event) {
        event.preventDefault();
        this.dispatch('UI:tr-drag-enter', event);
    }

    handleDragOver(event) {
        event.preventDefault();
    }

    handleDragLeave(event) {
        event.preventDefault();
        this.dispatch('UI:tr-drag-leave', event);
    }

    handleDrop(event) {
        event.preventDefault();
        this.dispatch('UI:tr-drop-done', event);
    }
}
