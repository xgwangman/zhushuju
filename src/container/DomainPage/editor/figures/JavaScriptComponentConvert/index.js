import {FieldGroup, InputField, ComboField, CheckboxField, NodeFigureModel} from 'gilight-editor'
import {FormGroup, Checkbox} from 'react-bootstrap'
import React from 'react'
export default class JavaScriptComponentConvert extends NodeFigureModel {

    constructor(config) { //构造函数
        super(Object.assign({
            name: 'JavaScript组件',
            fType: 'JavaScriptComponentConvert',
            groupId: '脚本组件',
            img: require("../../img/mdSynCom.svg"),
            viewConfig: {
                x: 130,
                y: 50,
            },
            autoCreateConnectionMenus: false,
            connectionMenus: ["DataLink"],
            contextMenus: [{
                name: "高级配置",
                key: "JavaScriptComponentConvert",
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