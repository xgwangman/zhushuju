import {ConnectionFigureModel} from 'gilight-editor';
import React from 'react';
export default class DataLink extends ConnectionFigureModel {

    constructor(config) { //构造函数
        super($.extend({
            name: '数据链接',
            fType: 'DataLink',
            groupId: '共享组件',
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
                sourceNodeType: "QuartzComponentConvert",
                destNodeType: "MdSimpleShareComponentConvert"
            }, {
                sourceNodeType: "QuartzComponentConvert",
                destNodeType: "MdShareOutComponentConvert"
            },{
                sourceNodeType: "TimerComponentConvert",
                destNodeType: "MdSimpleShareComponentConvert"
            }, {
                sourceNodeType: "TimerComponentConvert",
                destNodeType: "MdShareOutComponentConvert"
            }, {
                sourceNodeType: "MdSimpleShareComponentConvert",
                destNodeType: "MdShareOutComponentConvert"
            }],
        }, config));
    }
}