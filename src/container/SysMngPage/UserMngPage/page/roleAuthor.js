/**
 * Created by Administrator on 2017/5/8.
 */
import 'antd/dist/antd.css';
import React, {Component, PropTypes} from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router';
import AuthorTableElement from '../component/AuthorTableElement';
import { saveAuthor,author
} from '../actions'
import { selectUpdateUserAuthor,
} from '../../UserMngPage/selectors'

export  class roleAuthorPage extends Component {
    constructor(props) {
        super(props);
        this.props.author({id:this.props.params.roleId})
    }
    render() {

        return (
            <div>
                <div className="xp-header ret">
                    <Breadcrumb >
                        <Breadcrumb.Item><Link to="roleMng">角色管理/</Link>{this.props.params.roleName}的权限设置</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="centerContent ">
                <AuthorTableElement
                    authorList={this.props.roleAuthorList}
                    saveAuthor={this.props.saveAuthor}
                />
                </div>
            </div>
        )
    }

}



roleAuthorPage.propTypes={
    roleUserAuthorList:React.PropTypes.any,
    saveAuthor:React.PropTypes.func,
}
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        saveAuthor: (evt,urls) => dispatch(saveAuthor(urls)),
        author:(evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(author(evt));
        },
    }
}
const mapStateToProps = createStructuredSelector({
    roleAuthorList:selectUpdateUserAuthor(),
});

export default connect(mapStateToProps,mapDispatchToProps)(roleAuthorPage);
