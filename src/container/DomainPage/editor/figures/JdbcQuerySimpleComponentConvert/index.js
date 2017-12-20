import {FieldGroup, InputField, ComboField, CheckboxField, NodeFigureModel} from 'gilight-editor'
import React from 'react'
export default class JdbcQuerySimpleComponentConvert extends NodeFigureModel {

    constructor(config) { //构造函数
        super($.extend({
            name: 'JDBC单表采集',
            fType: 'JdbcQuerySimpleComponentConvert',
            groupId: '采集组件',
            img: require("../../img/table.svg"),
            viewConfig: {
                x: 130,
                y: 50,
            },
            autoCreateConnectionMenus: false,
            connectionMenus: ["DataLink"],
            contextMenus: [{
                name: "高级配置",
                key: "JdbcQuerySimpleComponentConvert",
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