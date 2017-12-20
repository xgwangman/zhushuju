import {ConnectionFigureModel} from 'gilight-editor';
import React from 'react';
export default class DataLink extends ConnectionFigureModel {

    constructor(config) { //构造函数
        super($.extend({
            name: '数据链接',
            fType: 'DataLink',
            groupId: '采集组件',
            img: 'icon-init',
            displaySaveBtn: false,
            contextMenus: [{
                name: "删除",
                key: "delete",
                icon: function () {
                    return "icon-init";//Todo 换图标
                },
                action: "delete",
            }],
            connectionConfig: [{
                sourceNodeType: "JdbcQuerySimpleComponentConvert",
                destNodeType: "MdInsertUpdateComponentConvert"
            }, {
                sourceNodeType: "JdbcQuerySqlComponentConvert",
                destNodeType: "MdInsertUpdateComponentConvert"
            },{
                sourceNodeType: "JdbcQuerySimpleComponentConvert",
                destNodeType: "MdSynComponentConvert"
            }, {
                sourceNodeType: "JdbcQuerySqlComponentConvert",
                destNodeType: "MdSynComponentConvert"
            }, {
                sourceNodeType: "JavaScriptComponentConvert",
                destNodeType: "MdInsertUpdateComponentConvert"
            }, {
                sourceNodeType: "JavaScriptComponentConvert",
                destNodeType: "MdSynComponentConvert"
            }, {
                sourceNodeType: "QuartzComponentConvert",
                destNodeType: "JdbcQuerySimpleComponentConvert"
            }, {
                sourceNodeType: "QuartzComponentConvert",
                destNodeType: "JdbcQuerySqlComponentConvert"
            }, {
                sourceNodeType: "TimerComponentConvert",
                destNodeType: "JdbcQuerySimpleComponentConvert"
            }, {
                sourceNodeType: "TimerComponentConvert",
                destNodeType: "JdbcQuerySqlComponentConvert"
            }],
        }, config));
    }
}