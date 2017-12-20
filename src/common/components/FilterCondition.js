import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import {Input, Select, Button} from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
// 高级筛选
export class FilterCondition extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const show = this.props.show;//是否显示
        const currentCondition = this.props.conditionList;//是否显示
        const attributes = this.props.dataList ? this.props.dataList : null;
        return (
            <div>
                {show ? (
                    <div>
                        {(currentCondition && currentCondition.length > 0) ? (
                            <div className="media xp-tj-cai">
                                <div className="media-left   text-nowrap">
                                    <h5 className="ft-16" style={{marginTop: '10px', marginBottom: '10px'}}>当前条件：</h5>
                                </div>
                                <div className="media-body">
                                    <ul className="nav nav-pills">
                                        {(currentCondition || []).map(function (condition, i) {
                                            return (
                                                <li key={'currentCondition' + i}>
                                                    <a href="javascript:void(0)"
                                                       onClick={(e) =>this.props.deleteCondition(condition, i)}>
                                                        {condition.name}({condition.operationName}{condition.value})
                                                        <button className="badge xp-tj-del btn btn-danger">
                                                            ×
                                                        </button>
                                                    </a></li>
                                            )
                                        }.bind(this))}
                                        <li>
                                            <p style={{marginTop: '10px', marginBottom: '10px', cursor: 'pointer'}}
                                               onClick={this.props.clearAllCondition}>清除全部</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : null}

                        <InputGroup key={this.props.key} compact style={{marginTop: '10px', width: '80%'}}> 属性：
                            <Select id="conditionName" style={{width: 100}}
                                    onSelect={(value, option)=>this.props.changeCondition(value, 'id', option)}>
                                {attributes ?
                                    (attributes || []).map(function (attr, index) {
                                            return (
                                                <Option key={'attrName' + index} value={attr.id}>{attr.name}</Option>
                                            )
                                        }.bind(this)
                                    ) : null
                                }
                            </Select>
                            <Select id="condition" style={{width: 80}}
                                    onSelect={(value, option)=>this.props.changeCondition(value, 'operation', option)}>
                                <Option value="LIKE">包含</Option>
                                <Option value="LEFT_LIKE">以开始</Option>
                                <Option value="RIGHT_LIKE">以结束</Option>
                                <Option value="EQUAL">等于</Option>
                                <Option value="UNEQUAL">不等于</Option>
                                <Option value="GT">大于</Option>
                                <Option value="GT_EQUAL">大于等于</Option>
                                <Option value="LESS">小于</Option>
                                <Option value="LESS_EQUAL">小于等于</Option>
                            </Select>
                            <Input id="conditionValue" style={{width: '30%'}} placeholder="值"
                                   onChange={(e)=>this.props.changeCondition(e, 'value')}/>
                            <Button type="dashed" onClick={this.props.onPlusCondition}>添加条件</Button>
                        </InputGroup>
                    </div>
                ) : null
                }
            </div>
        )
    }
}
