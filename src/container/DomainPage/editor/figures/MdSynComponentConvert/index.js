import {FieldGroup, InputField, ComboField, CheckboxField, NodeFigureModel} from 'gilight-editor'
import {FormGroup, Checkbox} from 'react-bootstrap'
import React from 'react'
export default class MdSynComponentConvert extends NodeFigureModel {

    constructor(config) { //构造函数
        super($.extend({
            name: '主数据同步',
            fType: 'MdSynComponentConvert',
            groupId: '采集组件',
            img: require("../../img/mdSynCom.svg"),
            viewConfig: {
                x: 130,
                y: 50,
            },
            autoCreateConnectionMenus: false,
            connectionMenus: ["DataLink"],
            statuEnums: [{
                code: "10",
                name: "已初始化",
                img: "Dep/resource/img/status/init.svg",
                enableMenus: ["MdSynComponentConvert"]
            }, {
                code: "11",
                name: "未初始化",
                img: "Dep/resource/img/status/init.svg",
                enableMenus: ["MdSynComponentConvert"]
            }],
            contextMenus: [{
                name: "高级配置",
                key: "MdSynComponentConvert",
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