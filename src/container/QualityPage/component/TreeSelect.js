/**
 * Created by Administrator on 2017/6/21.
 */
import { TreeSelect } from 'antd';
import React, {Component} from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


export default class TreeSelectRule extends Component {
    state = {
        value: ['0'],
    };
    render() {
        const SHOW_CHILD = TreeSelect.SHOW_CHILD;
        const treeData=this.props.ruleLibrary||[];
        var treeChildren=treeData[2].children||[];
        const edtiorData=this.props.edtiorData;
       // const edtiorSaveData=this.props.edtiorSaveData;//弹出框点击保存后数据传递过来

    if (edtiorData != null) {
        var ruleContextObj = JSON.parse(edtiorData.ruleContext);
        for (var i = 0; i < ruleContextObj.length; i++) {
            var dataObj = JSON.parse(ruleContextObj[i]);
            if (dataObj.value != null) {//判断规则是自定义的
                for (var num = 0; num < treeChildren.length; num++) {
                    if (dataObj.name == "日期范围校验") {
                        if (treeChildren[num].label == dataObj.name) {
                            dataObj.value.min = moment(dataObj.value.min).format("YYYY-MM-DD");
                            dataObj.value.max = moment(dataObj.value.max).format("YYYY-MM-DD");
                            treeChildren[num].label = dataObj.name + '(' + dataObj.value.min + '~' + dataObj.value.max + ')';
                        }
                    } else if (dataObj.name == "长度校验") {
                        if (treeChildren[num].label == dataObj.name) {
                            treeChildren[num].label = dataObj.name + '(' + dataObj.value.min + '~' + dataObj.value.max + ')';
                        }
                    } else if (dataObj.name == "正则表达式") {
                        if (treeChildren[num].label == dataObj.name) {
                            treeChildren[num].label = dataObj.name + '(' + dataObj.value.name + ')';
                        }
                    }
                    else if (treeChildren[num].label == dataObj.name) {
                        treeChildren[num].label = dataObj.name + '(' + dataObj.value + ')';
                    }
                }
            }
        }
    }

        const tProps = {
            treeData,
            value: this.props.treeValue,
            onChange: this.props.onChange,
            onSelect:this.props.onSelect,
            multiple: true,
            treeCheckable: true,
            showCheckedStrategy: SHOW_CHILD,
            searchPlaceholder: 'Please select',
            style: {
                width: 300,
            },
        };
        return (
            <TreeSelect {...tProps}/>
        )
    }
}
