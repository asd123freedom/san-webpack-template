/**
 * @file 业务表格组件
 * @author erik
 */


import {
    Table,
    THead,
    TBody,
    TR,
    TD,
    TH
} from 'san-mui/Table';
import DragTR from './DragTR';
import {IconButton, Button} from 'san-mui/Button';
import moment from 'moment';
import {DropDownMenu, MenuItem} from 'san-mui/Menu';
import Icon from 'san-mui/Icon';

const TR_CONTENT = `
    <ui-td
        san-for="field in fields"
        class="{{field.type ? 'sm-table-col-' + field.type : ''}}
        {{field.className ? 'sm-table-col-' + field.className : ''}}"
    >{{field | renderField(item)}}</ui-td>

    <ui-td san-if="selectColumn"
        class="sm-table-col-menu">
        <ui-dropdownmenu>
            <ui-menuitem san-for="item, index in selectColumn.list"
                value="{{item.value}}" label="{{item.label}}" title="{{item.title}}" />
            <ui-icon slot="iconButton">arrow_drop_down</san-icon>
        </ui-dropdownmenu>
    </ui-td>

    <ui-td san-if="operatorColumn"
        class="sm-table-col-op">
        <span
            class="{{op.className}}"
            san-for="op in operatorColumn.list">
            <ui-icon-button
                san-if="op.icon"
                variants="{{op.spec || 'info'}}"
                on-click="doOperator(op, item, index)">{{op.icon}}</ui-icon-button>
            <ui-button
                san-else
                variants="{{op.spec || 'info'}}"
                on-click="doOperator(op, item, index)"
            >{{op.title | renderOpField(op, item)}}</ui-button>
        </span>
    </ui-td>
`

const TypeFormatter = {
    Date(value, field) {
        if (!value) {
            return '';
        }

        // return value;
        let format = field.format || 'YYYY-MM-DD HH:mm';
        return moment((+value) * 1000).format(format);
    }
};



export default class ConfigurableTable extends Table {
    static components = {
        'ui-tr': TR,
        'ui-th': TH,
        'ui-td': TD,
        'ui-tbody': TBody,
        'ui-thead': THead,
        'ui-button': Button,
        'ui-icon-button': IconButton,
        'ui-drag-tr': DragTR,
        'ui-dropdownmenu': DropDownMenu,
        'ui-menuitem': MenuItem,
        'ui-icon': Icon
    };

    static messages = Table.messages;

    static filters = {
        renderField(field, item) {
            if (typeof field.content === 'function') {
                return field.content.call(this, item);
            }
            else if (field.prop) {
                let formatter = TypeFormatter[field.type];
                let content = item[field.prop];

                if (typeof formatter === 'function') {
                    content = formatter(content, field);
                }

                return content;
            }

            return '';
        },
        renderOpField(value, op, item) {
            if (op.content && typeof op.content === 'function') {
                return op.content.call(this, item);
            }
            return value;
        }
    };

    static template = `
        <table class="{{className}}">
            <ui-thead>
                <ui-tr>
                    <ui-td
                        san-for="field in fields"
                        class="{{field.type ? 'sm-table-col-' + field.type : ''}}
                        {{field.className ? 'sm-table-col-' + field.className : ''}}"
                    >{{field.title}}</ui-td>

                    <ui-td san-if="selectColumn"
                        class="sm-table-col-menu">
                        {{selectColumn.title}}
                    </ui-td>

                    <ui-td
                        san-if="operatorColumn"
                        class="sm-table-col-op"
                    >{{operatorColumn.title ? operatorColumn.title: '操作'}}</ui-td>
                </ui-tr>
            </ui-thead>
            <ui-tbody san-if="!draggable">
                <ui-tr
                    san-for="item,index in data"
                    on-dblclick="handeTrDblClick(item, index)">
                    ${TR_CONTENT}
                </ui-tr>
            </ui-tbody>
            <ui-tbody san-else>
                <ui-drag-tr
                    draggable="{{!!1}}"
                    san-for="item,index in data"
                    on-dblclick="handeTrDblClick(item, index)">
                    ${TR_CONTENT}
                </ui-drag-tr>
            </ui-tbody>
        </table>
    `;

    handeTrDblClick(item, index) {
        this.fire('trdblclick', {
            item,
            index
        });
    }

    handleDragStart(event, index) {
        this.fire('trdragstart', {event, index});
    }


    doOperator(operator, item, index) {
        this.fire('operate', {
            operator,
            item,
            index
        });
    }
}
