/**
 * Created by Administrator on 2017/4/27.
 */
import 'antd/dist/antd.css';
import React, {Component, PropTypes} from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {Table,Switch,Breadcrumb} from 'antd';
import {Link} from 'react-router';
import { selectUpdateRoleUser, selectOnGetName,
} from '../../UserMngPage/selectors'
import {requestCheckdUserData,
} from '../../UserMngPage/actions'

export  class UserPage extends Component {
    constructor(props) {
        super(props);
        this.props.requestCheckdUserData({page:1,limit:15,roleId:this.props.params.roleId});
    }
    render() {
        const columns = [
            { key:'userNo', title: '账号', dataIndex: 'userNo'},
            { key: 'name', title: '用户名', dataIndex: 'name'},
            { key: 'status', title: '禁用/启用', dataIndex: 'status',
                render: (text, record, index) => {
                    if (text == "0") {
                        text = false;
                    } else {
                        text = true;
                    }
                    return (<Switch checked={text} />)
                }
            },
        ];
        let dataList=this.props.roleUserList||[];
        let pagination={
            pageSize : 15,
            showQuickJumper:true ,
            defaultCurrent : 1,
            total :(dataList&& dataList.totalProperty)?dataList.totalProperty:0,
            showTotal:total => `共 ${total} 条记录`
        };
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="roleMng">角色管理/</Link>{this.props.params.roleName}的使用人员</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="centerContent ">
                   <Table
                       columns={columns}
                       dataSource={dataList.result}
                       pagination={pagination}
                       onChange={this.onChangePage}
                       rowKey="id"
                       className="table tableMargin"
                   />
                </div>
            </div>
        )
    }
    //分页
    onChangePage=(page)=>{
            this.props.requestCheckdUserData({
                roleId:this.props.params.roleId,
                page:page.current,
                limit:page.pageSize,
            });
    };
}


//***********************
UserPage.propTypes={
    roleUserList:React.PropTypes.any,
}

export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestCheckdUserData: (evt) => dispatch(requestCheckdUserData(evt)),
    }
}
const mapStateToProps = createStructuredSelector({
    roleUserList:selectUpdateRoleUser(),
    name:selectOnGetName(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
