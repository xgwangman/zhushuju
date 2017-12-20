import {Modal} from 'antd';
import {openEditWindow, setCurrentEditComponentData} from  '../../actions'

let EditorActions = {
    registActions: (container, editor)=> {
        let {dispatch, currentSchemeInfo} = container.props;
        if (!editor)return;
        /*创建新的检测规则*/
        editor.registerActions([{
            name: "openEditWindow",
            functionality: (node, name)=> {
                let data = node.getUserData();
                dispatch(setCurrentEditComponentData(data.data));
                dispatch(openEditWindow(name));
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
    }
};
export default EditorActions;