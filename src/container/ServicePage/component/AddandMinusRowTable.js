/**
 * Created by Administrator on 2017-6-21.
 */
import React, {Component, PropTypes} from 'react';
import {Table,Icon} from 'antd'
export default class AddandMinusRowTable extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Table rowKey={this.props.tabKey} dataSource={this.props.infoDataSource} columns={this.props.infoColumns} pagination={false}  bordered={true}/>
                <div style={{marginTop:10}}>
                    <a href="#" onClick={(e)=>{this.props.addBaseInfo(e,'')}}><Icon type="plus-circle-o" style={{fontSize:36}}/></a>
                </div>
            </div>
        )
    }
}
AddandMinusRowTable.propTypes={
    infoDataSource:PropTypes.array.isRequired,
    infoColumns:PropTypes.array.isRequired,
    addBaseInfo:PropTypes.func.isRequired,
    tabKey:PropTypes.string.isRequired,
}