/**
 * Created by Administrator on 2017-6-13.
 */
import {NodeFigureModel} from 'gilight-editor'
import React from 'react'
export default class MdSimpleShareComponentConvert extends NodeFigureModel {

    constructor(config) { //构造函数
        super($.extend({
            name: '单实体增量共享',
            fType: 'MdSimpleShareComponentConvert',
            groupId: '共享组件',
            img: require("../../img/mdSynCom.svg"),
            fieldsCfg:[{
                name:'name',
                displayName:'name',
                defaultValue:'单实体增量共享'
            }],
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
                enableMenus: ["MdSimpleShareComponentConvert"]
            }, {
                code: "11",
                name: "未初始化",
                img: "Dep/resource/img/status/init.svg",
                enableMenus: ["MdSimpleShareComponentConvert"]
            }],
            onDoubleClick:function (emitter, event) {
                debugger

            },
            contextMenus: [{
                name: "高级配置",
                key: "openShareComponentConvert",
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