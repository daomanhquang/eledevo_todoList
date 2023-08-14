import * as type from '../constant/StatusConstant'
function pageStatusAction(payload){
    return{
        type: type.Page_Status_Request,
        payload
    }
}
function addStatusAction(payload){
    return{
        type : type.Add_Status_Request, // ten action
        payload
    };
}
function deleteStatusAction(payload){
    return{
        type:type.Delete_Status_Request,
        payload
    }
}
function updateStatusAction(payload){
    return{
        type: type.Update_Status_Request,
        payload
    }
}
function searchStatusAction(payload){
    return{
        type: type.Search_Status_Request,
        payload
    }
}

function sortStatusAction(payload){
    return{
        type: type.Sort_Status_Request,
        payload
    }
}
function sortSearchStatusAction(payload){
    return{
        type: type.Sort_Search_Status_Request,
        payload
    }
}
export {pageStatusAction,addStatusAction,updateStatusAction,deleteStatusAction,
    searchStatusAction,sortStatusAction,sortSearchStatusAction}