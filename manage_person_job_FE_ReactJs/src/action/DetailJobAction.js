import * as type from '../constant/DetailJobConstant'
function getDetailJobAction(payload){
    return{
        type: type.Get_DetailJob_Request,
        payload
    }
}
function pageDetailJobAction(payload){
    return{
        type: type.Page_DetailJob_Request,
        payload
    }
}
function addDetailJobAction(payload){
    return{
        type : type.Add_DetailJob_Request, // ten action
        payload
    };
}
function deleteDetailJobAction(payload){
    return{
        type:type.Delete_DetailJob_Request,
        payload
    }
}
function updateDetailJobAction(payload){
    return{
        type: type.Update_DetailJob_Request,
        payload
    }
}
function searchDetailJobAction(payload){
    return{
        type: type.Search_DetailJob_Request,
        payload
    }
}

function sortDetailJobAction(payload){
    return{
        type: type.Sort_DetailJob_Request,
        payload
    }
}
function sortSearchDetailJobAction(payload){
    return{
        type: type.Sort_Search_DetailJob_Request,
        payload
    }
}
export {getDetailJobAction,pageDetailJobAction,addDetailJobAction,deleteDetailJobAction,updateDetailJobAction,searchDetailJobAction,
    sortDetailJobAction,sortSearchDetailJobAction}
