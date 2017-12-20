import  React, {Component, PropTypes} from "react";
import {createStructuredSelector} from "reselect";
import {Link, hashHistory} from 'react-router';
import {Breadcrumb, Input} from "antd";
import {connect} from "react-redux";
import {SearchBox} from '../../../common/components/SearchBox';
import EntityCheckTable from '../component/EntityCheckTable';
import {
    selectQualityReqData,
    selectQualityEntityTable,
    selectEntityTrendChange,
} from "../selectors";
import {
    setMonitorTableData,
    setQualityEntityTable,
} from '../actions';

export class QualityEntityPage extends Component {
    constructor(props){
        super(props);
        let paramId = this.props.params.entityId;
        this.props.onQualityEntityTable({entityId: paramId ,nameLike: ''});
    }
    state = {searchValue: ''};
    searchChange=(e)=>{
        let paramId = this.props.params.entityId;
        this.setState({
            searchValue: e.target.value
        });
        this.props.onQualityEntityTable({entityId: paramId, nameLike: e.target.value});
    };
    render (){
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item>
                            <Link to={"quality"}>质量监控</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {this.props.params.entityName}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox
                        placeholder="请输入实体名称"
                        onChange={this.searchChange}
                    />
                </div>
                <div className="centerContent ">
                <EntityCheckTable
                    getEntityQualityTable = {this.props.getEntityQualityTable}
                    getMonitorTableData = {this.props.onMonitorTableData}
                    getQualityEntityPage = {this.props.onQualityEntityPage}
                    nameLike={this.state.searchValue}
                    entityId={this.entityId}
                    params={this.props.params}
                />
                </div>
            </div>
        )
    }

}

/**
 * *****************************************************************
 */
QualityEntityPage.propTypes = {
    onMonitorTableData: React.PropTypes.func,
    onQualityEntityPage: React.PropTypes.func,
    onQualityEntityTable: React.PropTypes.func,

};

/**
 * *****************************************************************
 */
export function mapDispatchToProps(dispatch) {
    return {
        onMonitorTableData :(evt,record) => {
            if(evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setMonitorTableData(record))
        },
        onQualityEntityPage:(evt) => {
            if(evt !== undefined && evt.preventDefault) evt.preventDefault();
            let pageChange = {
                nameLike:evt.nameLike,
                page:evt.page,
                limit:evt.limit,
                entityId:evt.entityId
            };
            dispatch(setQualityEntityTable(pageChange))
        },
        onQualityEntityTable:(value) => {
            let qualityEntityPage = {
                nameLike:value.nameLike,
                page:1,
                limit:15,
                entityId:value.entityId
            };
            dispatch(setQualityEntityTable(qualityEntityPage))
        },
    }
}

/**
 * *****************************************************************
 */

const mapStateToProps = createStructuredSelector({
    getQualityReqData: selectQualityReqData(),
    getEntityQualityTable: selectQualityEntityTable(),
    getEntityTrendChange: selectEntityTrendChange(),
});

export default connect(mapStateToProps, mapDispatchToProps)(QualityEntityPage);