import * as type from '../constant/JobConstant'


function getStatusAction(payload){
    return{
        type: "Get_Status_Request",
        payload
    }
}


function pageJobAction(payload){
    return{
        type: type.Page_Job_Request,
        payload
    }
}
function addJobAction(payload){
    return{
        type : type.Add_Job_Request, // ten action
        payload
    };
}
function deleteJobAction(payload){
    return{
        type:type.Delete_Job_Request,
        payload
    }
}
function updateJobAction(payload){
    return{
        type: type.Update_Job_Request,
        payload
    }
}
function searchJobAction(payload){
    return{
        type: type.Search_Job_Request,
        payload
    }
}

function sortJobAction(payload){
    return{
        type: type.Sort_Job_Request,
        payload
    }
}
function sortSearchJobAction(payload){
    return{
        type: type.Sort_Search_Job_Request,
        payload
    }
}
export {addJobAction,deleteJobAction,updateJobAction,pageJobAction,searchJobAction,
sortJobAction,sortSearchJobAction,getStatusAction}