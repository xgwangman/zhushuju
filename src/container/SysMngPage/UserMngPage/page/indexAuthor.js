/**
 * Created by Administrator on 2017/5/5.
 */
import 'antd/dist/antd.css';
import React, {Component, PropTypes} from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router';
import AuthorTableElement from '../component/AuthorTableElement';
import {saveAuthor,author
} from '../actions'
import {selectUpdateUserAuthor, selectOnGetName,
} from '../../UserMngPage/selectors'

export  class AuthorPage extends Component {
    constructor(props) {
        super(props);
        this.props.author({id:this.props.params.userId,userNo:this.props.params.userNo});
    }
    render() {
       return (
           <div>
               <div className="xp-header ret">
                   <Breadcrumb >
                       <Breadcrumb.Item><Link to="userMng">用户管理/</Link>{this.props.params.userName}的权限设置</Breadcrumb.Item>
                   </Breadcrumb>
               </div>
               <div className="centerContent ">
               <AuthorTableElement
                   authorList={this.props.userAuthorList}
                   saveAuthor={this.props.saveAuthor}
               />
               </div>
           </div>
       )
    }

}



AuthorPage.propTypes={
    roleUserAuthorList:React.PropTypes.any,
    saveAuthor:React.PropTypes.func,
}
export function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch,
        saveAuthor: (evt,arrUrls) => dispatch(saveAuthor(arrUrls)),
        author:(evt) => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(author(evt));
        },
    }
}
const mapStateToProps = createStructuredSelector({
    userAuthorList:selectUpdateUserAuthor(),
    name:selectOnGetName(),
});

export default connect(mapStateToProps,mapDispatchToProps)(AuthorPage);
