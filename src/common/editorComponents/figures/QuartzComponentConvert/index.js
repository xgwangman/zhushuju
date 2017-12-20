import {FieldGroup, InputField, ComboField, CheckboxField, NodeFigureModel} from 'gilight-editor'
import {FormGroup, Checkbox} from 'react-bootstrap'
import React from 'react'
export default class QuartzComponentConvert extends NodeFigureModel {

    constructor(config) { //构造函数
        super($.extend({
            name: '定时表达式组件',
            fType: 'QuartzComponentConvert',
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
                key: "QuartzComponentConvert",
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