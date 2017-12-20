import React, {Component, PropTypes} from 'react';
import {Row,Col,Table,Breadcrumb,Input,Button,Icon,Tooltip} from 'antd';
import {Link, router,hashHistory} from 'react-router';
import '../css/index.css'
const Search = Input.Search;
import {SearchBox} from '../../../common/components/SearchBox';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {requestVersionAllData,setVersionName,requestVersionTitle,onSearchVersion,onSearchVersionData,setVersionConditionList} from '../actions'
import {selectVersionDataList,selectVersionName,selectOnSearchVersionData,} from '../selectors'


export class VersionMainPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            record:'',
            pageSize:10,
            searchValue:'',
        };
        this.props.requestVersionAllData({page:1,limit:15,nameLike:''});
        this.props.dispatch(setVersionConditionList());
    }
    searchChange=(e)=>{
        this.setState({
            searchValue:e.target.value
        })
        this.props.onSearchVersionData(e.target.value);
    };

    onClick =(e,record)=>{
        hashHistory.push(encodeURI('/versionManage/versionInfoList/'+record.id+'/'+record.name));
        this.props.clickVersion(record);
    };
    //分页
    onChangePage=(page)=>{
        const nameLike=this.props.nameLike;
        if(nameLike==null){
            this.props.requestVersionAllData({
                page:page.current,
                limit:page.pageSize,
            });
        }else {
            this.props.onSearchVersion({
                page:page.current,
                limit:page.pageSize,
            });
        }

    };

    render() {
        let versionList = this.props.versionDataList || [];
        const columns = [
            {title: '版本号', dataIndex: 'name', key: 'name',width:200},
            {title: '版本时间', dataIndex: 'createTime', key: 'createTime',width:200},
            {title: '实体名称', dataIndex: 'entityName', key: 'entityName',width:200},
            {title: '发布人', dataIndex: 'creatorName', key: 'creatorName',width:200},
            {title: '描述', dataIndex: 'remark', key: 'remark',width:200},
            {title: '查看', dataIndex: 'check', key: 'check',width:200, render: (text, record) =>
                    <Tooltip placement="top" title="查看">
                        <Icon className="look" style={{cursor: "pointer",color: "#08c"}}
                              onClick={(e)=>{this.onClick(e,record)}}/>
                    </Tooltip>
            },
        ];
        let pagination={
            pageSize : 15,
            showQuickJumper:true ,
            defaultCurrent : 1,
            total :(versionList&& versionList.totalProperty)?versionList.totalProperty:0,
            showTotal:total => `共 ${total} 条记录`
        };
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item>版本管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox
                        placeholder="版本号"
                        onChange={this.searchChange}
                    />
                </div>
                <div  className="centerContent ">
                <Table rowKey="id"
                           columns={columns}
                           dataSource={versionList.result}
                           pagination={pagination}
                           onChange={this.onChangePage}
                    />
                </div>

            </div>
        )
    }

}

export function mapDispatchToProps(dispatch) {

    return {
        dispatch: dispatch,
        requestVersionAllData: (evt) => {
            dispatch(requestVersionAllData(evt));
        },
        clickVersion:(record)=>{
            dispatch(setVersionName(record));
            dispatch(requestVersionTitle());
        },
        onSearchVersionData:(evt)=>{//index页面
            dispatch(onSearchVersionData(evt));
            dispatch(onSearchVersion({page:1,limit:15}));//如果搜索框里有值则请求查询的数据
        },
    }
}


const mapStateToProps = createStructuredSelector({
    versionDataList: selectVersionDataList(),
    versionName:selectVersionName(),
    nameLike:selectOnSearchVersionData(),

});
export default connect(mapStateToProps, mapDispatchToProps)(VersionMainPage);