require("../../../../css/DomainPageCss.css");
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {Breadcrumb} from 'antd';
import {Link, router} from 'react-router';
import {SearchBox} from '../../../common/components/SearchBox';
import DomainElement from '../component/DomainElement';
import {requestDomainData, setDomainAttr, setModelAttr, exportDomain} from '../actions';
import {selectDomainDataList} from '../selectors';


export class DomainPage extends Component {
    constructor(props) {
        super(props);
        this.props.requestAllDomainData({nameLike:''});
    }

    render() {
        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item><Link to="/main">数据子集管理</Link></Breadcrumb.Item>
                    </Breadcrumb>
                    <SearchBox placeholder="数据子集名称" onChange={(e)=>{this.props.requestAllDomainData({nameLike:e.target.value})}}/>
                </div>
                <div className="centerContent">
                    <DomainElement dataList={this.props.domainDataList}
                                   clickModel={this.props.onClickModel}
                                   exportDomainStructure={this.props.exportDomainStructure}>
                    </DomainElement>
                </div>
            </div>
        )
    }

}
/**
 *
 */
DomainPage.propTypes = {
    requestAllDomainData: React.PropTypes.func,
    onClickModel: React.PropTypes.func,
    exportDomainStructure: React.PropTypes.func,
};

/**
 *
 */
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        requestAllDomainData: (nameLike) => {
            dispatch(requestDomainData(nameLike));
        },
        onClickModel: (evt, model, domain)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(setDomainAttr(domain));
            dispatch(setModelAttr(model));
        },
        exportDomainStructure: (evt, domainId)=> {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            window.location.href = 'md/design/domain/exportmetadata.do' + '?id='+ domainId;
        },
    };
}
const mapStateToProps = createStructuredSelector({
    domainDataList: selectDomainDataList(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(DomainPage);