/**
 * Created by Administrator on 2017/6/27.
 */
import {
    UPDATA_VERSIONMAINPAGE,
    SET_VERSIONNAME,
    GET_VERSIONCHECKPAGE,
    GET_VERSIONTITLE,
    GET_FILTERCONDTION,
    VERSION_DATA,
    SHOW_ALLCOLUMNS,
    SET_SHOWCOLUMNS,
    SHOW_FILTERCONDITION,
    SET_CONDITIONDATA,
    SET_CONDITIONLIST
} from './constants'
import {fromJS} from 'immutable';
const initialState = fromJS({
    versionDataList:'',
    setVersionName:'',
    getVersionNameList:'',
    getVersionCheckPage:'',
    filterContions:'',
    showAllVersionColumns:true,
    setShowColumns: '',
    showVersionColumns: '',
    versionFilterShow: false,
    versionConditionData: '',
    versionConditionList: ''
})
 function versionReducer(state = initialState, action) {
    switch (action.type){
        case UPDATA_VERSIONMAINPAGE:
            return state.set('versionDataList', action.value);
        case SET_VERSIONNAME:
            return state.set('setVersionName',action.value);
        case GET_VERSIONCHECKPAGE:
            return state.set('getVersionCheckPage',action.value);
        case GET_VERSIONTITLE:
            return state.set('getVersionTitle',action.value);
        case GET_FILTERCONDTION:
            return state.set('filterContions',action.value);
        case VERSION_DATA:
            return state.set('versionData',action.value);
        case SHOW_ALLCOLUMNS:
            return state.set('showAllVersionColumns',action.value);
        case SET_SHOWCOLUMNS:
            return state.set('showVersionColumns',action.value);
        case SHOW_FILTERCONDITION:
            return state
                .set('versionFilterShow', action.value);
        case SET_CONDITIONDATA:
            return state
                .set('versionConditionData', action.value);
        case SET_CONDITIONLIST:
            return state
                .set('versionConditionList', action.value);
        default:
            return state;
    }
}

export default versionReducer;