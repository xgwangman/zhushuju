require("../../../css/NavBar.css");
require("../../../css/PageHeader.css");
import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';
import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;

export class NavBarComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
        }
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        let path=this.props.path?this.props.path:'main';
        if(path=='integration'||path=='importMasterData'){
            var openKey='sub1';
        }else if(path=='userMng'||path=='roleMng'){
            openKey='sub2';
        }
        return (
        <div className="hm-left-box">
            <div style={{padding:'12px 12px',backgroundColor:'#364150',top:0,left:0,borderBottom:'1px solid #222',height:70}} >
                <div style={{display:'inline-block',textAlign:'center'}}>
                    {/*<img src="images/logo.png" />*/}&nbsp;&nbsp;
                    <span style={{paddingTop:14,fontSize:26,color: '#fff',fontWeight:'bold'}}>主数据管理平台</span>
                </div>
            </div>
            <div style={{paddingTop:10}}>
                <Menu
                    defaultSelectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >

                    <Menu.Item key="main">
                        <Link to="main">
                            <span style={{fontSize:16}}><i className="icomoon-key iStyle"></i>主数据管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="design">
                        <Link to="design">
                            <span style={{fontSize:16}} onSelect={this.selectK}><i className="icomoon-edit iStyle" ></i>主数据设计</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="versionManage">
                        <Link to="versionManage">
                            <span style={{fontSize:16}}><i className="icomoon-calendar iStyle"></i>版本管理</span></Link>
                    </Menu.Item>
                    <Menu.Item key="service">
                        <Link to="service">
                            <span style={{fontSize:16}}><i className="icomoon-share iStyle"></i>共享管理</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="quality">
                        <Link to="quality">
                            <span style={{fontSize:16}}><i className="icomoon-facetime-video iStyle"></i>质量监控</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub1" title={<span style={{fontSize:16}}><i className="icomoon-leaf iStyle"></i>集成管理</span>}>
                        <Menu.Item key="integration">
                            <Link to="integration" className="active">
                                <span style={{fontSize:16}}><i className="icomoon-table iStyle" ></i>集成应用系统</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="importMasterData">
                            <Link to="importMasterData">
                                <span style={{fontSize:16}}><i className="icomoon-download iStyle" ></i>导入</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span style={{fontSize:16}}><i className="icomoon-gift iStyle"></i>权限管理</span>}>
                        <Menu.Item key="roleMng">
                            <Link to="roleMng" className="active">
                                <span style={{fontSize:16}}><i className="icomoon-user-md iStyle"></i>角色管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="userMng">
                            <Link to="userMng">
                                <span style={{fontSize:16}}><i className="icomoon-user iStyle"></i>用户管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="10">
                        <a href="access/logout.do">
                            <span style={{fontSize:16}}><i className="icomoon-power-off iStyle"></i>退出系统</span>
                        </a>
                    </Menu.Item>
                </Menu>
            </div>
        </div>

        )
    }

    /**
	 * 鼠标点击NavBar，该区元素高亮
	 * 
	 * @param evt
	 */
    changeTheHighlight(evt) {
        var me = this;
        if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        if ($("#NavBarUL li.active")) {
            $("#NavBarUL li.active").removeClass('active');
            var li = evt.target.closest('li');
            if (li.id == "activitiLi" || li.id == "userMng") {
                $("#systemNav").addClass('active');
                $("#secondMenu")[0].style.display = "none";
            } else {
                $(li).addClass('active');
            }
        }
    }

    /**
	 * 鼠标移到系统设置上时，显示系统设置的子菜单
	 * 
	 * @param evt
	 */
    displaySecondMenu(evt) {
        var me = this;
        if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        if ($("#secondMenu")) {
            var secondMenuEle = $("#secondMenu");
            secondMenuEle[0].style.display = "block";
        }
    }

    /**
	 * 
	 * @param evt
	 */
    hiddenSecondMenu(evt){
        var me = this;
        if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        if ($("#secondMenu")) {
            var secondMenuEle = $("#secondMenu");
            secondMenuEle[0].style.display = "none";
        }
    }
}
