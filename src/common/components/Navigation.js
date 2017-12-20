require("../../../css/NavBar.css");
import React, {Component} from 'react';
import {Link, hashHistory} from 'react-router';
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;

export class Navigation extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        function handleClick(e) {
            switch (e.key) {
                case "MAIN" :
                    hashHistory.push('/main');
                    break;
                case "DESIGN" :
                    hashHistory.push('/design');
                    break;
                case "VERSION" :
                    hashHistory.push('/version');
                    break;
                case "SERVICE" :
                    hashHistory.push('/service');
                    break;
                case "QUALITY" :
                    hashHistory.push('/quality');
                    break;
                case "INTEGRATION" :
                    hashHistory.push('/integration');
                    break;
                case "ACTIVITI" :
                    hashHistory.push('/activiti');
                    break;
                case "USERMNG" :
                    hashHistory.push('/userMng');
                    break;
            }
            console.log('click', e);
        }

        return (
            <Menu theme="dark" id="NavBarUL" onClick={handleClick} className="xp-tp"
                  style={{width: 80, background: '#378cc3'}}
                  mode="vertical">
                <Menu.Item key="MAIN" style={{padding: '8 11px', height: '60px'}}>
                    <span><Icon type="mail"/><span>主页</span></span>
                </Menu.Item>
                <Menu.Item key="DESIGN" style={{padding: '8 11px', height: '60px'}}>
                    <span><Icon type="appstore"/><span>设计</span></span>
                </Menu.Item>
                <Menu.Item key="VERSION" style={{padding: '8 11px', height: '60px'}}>
                    <span><Icon type="mail"/><span>版本</span></span>
                </Menu.Item>
                <Menu.Item key="SERVICE" style={{padding: '8 11px', height: '60px'}}><span><Icon
                    type="mail"/><span>服务</span></span></Menu.Item>
                <Menu.Item key="QUALITY" style={{padding: '8 11px', height: '60px'}}><span><Icon
                    type="mail"/><span>质量</span></span></Menu.Item>
                <Menu.Item key="INTEGRATION" style={{padding: '8 11px', height: '60px'}}><span><Icon type="mail"/><span>集成</span></span></Menu.Item>
                <SubMenu role="presentation" key="SYS" title={<span><icon type="appstore"/><span>系统设置</span></span>}
                         style={{padding: '8 11px', height: '60px'}}>
                    <Menu.Item key="ACTIVITI">审批流设置</Menu.Item>
                    <Menu.Item key="USERMNG">用户设置</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }

    /**
     * 鼠标点击NavBar，该去元素高亮
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
    hiddenSecondMenu(evt) {
        var me = this;
        if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        if ($("#secondMenu")) {
            var secondMenuEle = $("#secondMenu");
            secondMenuEle[0].style.display = "none";
        }
    }
}
