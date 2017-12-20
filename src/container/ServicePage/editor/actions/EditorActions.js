import {Modal} from 'antd';
import {openShareWin,cacheCurrentFlowData,tableListData} from  '../../actions'

let EditorActions = {
    registActions: (container, editor)=> {
        let {dispatch, currentSchemeInfo} = container.props;
        if (!editor)return;
        /*创建新的检测规则*/
        editor.registerActions([{
            name: "openEditWindow",
            functionality: (node, name)=> {
                let data = node.getUserData();
                dispatch(cacheCurrentFlowData(data.data));
                dispatch(openShareWin(name));
            },
        }]);
        /*删除图元*/
        editor.registerActions([{
            name: "delete",
            functionality: (node, name)=> {
                Modal.confirm({
                    title: '是否确认删除',
                    content: '该操作将要从画布上删除该图元及与该图元连接的线!',
                    onOk: ()=> {
                        editor.removeModels(node.getUserData());
                    },
                    onCancel: function () {
                    }
                });
            },
        }]);
        /*删除规则*/
        editor.registerActions([{
            name: "removeFromCanvas",
            functionality: (node, name)=> {
                Modal.confirm({
                    title: '是否确认删除',
                    content: '该操作将要从检测任务中移除该检测规则!',
                    onOk: ()=> {
                        dispatch(deleteRule(node.getUserData().id, currentSchemeInfo));
                        container.redoEditorLayout();
                    },
                    onCancel: function () {
                    }
                });
            },
        }]);
        /*执行单个规则*/
        editor.registerActions([{
            name: "runCheckRule",
            functionality: (node, name)=> {
                let entity = node.getUserData().entity;
                dispatch(executeRule(entity))
            },
        }]);
    }
};
export default EditorActions;