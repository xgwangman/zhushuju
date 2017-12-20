import React, {Component} from 'react';
require("../../../css/PageHeader.css");
require("antd/dist/antd.css");
import {Link, browserHistory} from 'react-router';
import {Button, Checkbox} from 'antd';
const CheckboxGroup = Checkbox.Group;

export class PickColumns extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        allCloumns: false,
    };

    render() {
        const title = this.props.dataList ? (this.props.dataList.titles || this.props.dataList) : null;
        const plainOptions = [];
        if (title) {
            for (let i = 0; i < title.length; i++) {
                plainOptions.push(
                    title[i].name
                )
            }
            return (
                <div>
                    {this.state.allCloumns ? (
                        <div className="pick-more" style={{paddingRight:80}}>
                            {this.displayMore1}
                            <label>显示列：</label>
                            <Checkbox checked={this.props.checkAll}
                                      onChange={(e)=> {
                                          this.props.checkAllColumns(e, plainOptions);
                                      }}
                                      href='javascript:void(0)' onClick={this.displayMore1}
                            >全选
                            </Checkbox>
                            {this.props.checkAll ? (
                                <CheckboxGroup options={plainOptions} value={plainOptions}
                                               onChange={(checked)=> {
                                                   this.props.changeCheckColumns(checked);
                                               }}/>
                            ) : (
                                <CheckboxGroup options={plainOptions} value={this.props.checkedList || []}
                                               onChange={(checked)=> {
                                                   let len=plainOptions.length;
                                                   let checkedDataList=new Array(len);//var
                                                   for(let i=0;i<len;i++){
                                                       for(let j=0;j<checked.length;j++){
                                                           if(plainOptions[i]==checked[j]){
                                                               checkedDataList[i]=checked[j];
                                                           }
                                                       }
                                                   }
                                                   this.props.changeCheckColumns(checkedDataList);
                                               }}/>
                            )}
                        </div>
                    ) : (
                        <div className="pick-columns">
                            <label>显示列：</label>
                            <Checkbox checked={this.props.checkAll} indeterminate={this.state.indeterminate}
                                      onChange={(e)=> {
                                          this.props.checkAllColumns(e, plainOptions);
                                      }}
                                      href='javascript:void(0)' onClick={this.displayMore2}
                            >全选
                            </Checkbox>
                            {this.props.checkAll ? (
                                <CheckboxGroup options={plainOptions} value={plainOptions}
                                               onChange={(checked)=> {
                                                   this.props.changeCheckColumns(checked);
                                               }}/>
                            ) : (
                                <CheckboxGroup options={plainOptions} value={this.props.checkedList || []}
                                               onChange={(checked)=> {
                                                   let len=plainOptions.length;
                                                   let checkedDataList=new Array(len);//var
                                                   for(let i=0;i<len;i++){
                                                       for(let j=0;j<checked.length;j++){
                                                           if(plainOptions[i]==checked[j]){
                                                               checkedDataList[i]=checked[j];
                                                           }
                                                       }
                                                   }
                                                   this.props.changeCheckColumns(checkedDataList);
                                               }}/>
                            )}
                            <a href='javascript:void(0)' onClick={this.displayMore2}>显示所有</a>
                        </div>
                    )}

                </div>
            )
        } else {
            return null;
        }
    }

    //“显示所有”的响应函数，切换div样式，展开所有列
    displayMore2 = (e)=> {
        this.setState({
            allCloumns:true
        });


    };
    displayMore1 = (e)=> {
        this.setState({
            allCloumns:false
        });
    };
}

