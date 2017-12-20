import {FieldGroup, InputField, ComboField, CheckboxField, NodeFigureModel} from 'gilight-editor'
import {FormGroup, Checkbox} from 'react-bootstrap'
import React from 'react'
export default class TimerComponentConvert extends NodeFigureModel {

    constructor(config) { // 构造函数
        super($.extend({
            name: '轮询组件',
            fType: 'TimerComponentConvert',
            groupId: '调度组件',
            img: require("../../../../container/DomainPage/editor/img/mdSynCom.svg"),
            viewConfig: {
                x: 130,
                y: 50,
            },
            autoCreateConnectionMenus: false,
            connectionMenus: ["DataLink"],
            contextMenus: [{
                name: "高级配置",
                key: "TimerComponentConvert",
                icon: function () {
                    return "icon-init";
                },
                action: "openEditWindow",
            }, {
                name: "删除",
                key: "delete",
                icon: function () {
                    return "icon-init";
                },
                action: "delete",
            }]
        }, config));
    }
}