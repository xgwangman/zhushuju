/**
 * Created by Administrator on 2017-6-13.
 */
import {NodeFigureModel} from 'gilight-editor'
import React from 'react'
export default class ShareComponent extends NodeFigureModel {

    constructor(config) { //构造函数
        super($.extend({
            name: '增量共享图元',
            fType: 'ShareComponent',
            groupId: '共享子组件',
            img: require("../../img/filter.svg"),
            fieldsCfg:[{
                name:'name',
                displayName:'增量共享图元',
                defaultValue:'增量共享图元'
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
            contextMenus: [{
                name: "修改",
                icon: "fa-edit",
                key: "showUpdateUniqueCheck",
                action : "openUpdateCheckWindow"
            }, {
                name: "执行",
                icon: "fa-play",
                key: "runRuleCheck",
                action : "runCheckRule"
            }, {
                name: "移除",
                icon: "fa-trash",
                key: "removeFromCanvas",
                action : "removeFromCanvas",
            }]
        }, config));
    }
}