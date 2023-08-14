import * as type from '../constant/JobConstant'
import * as typeDetail from '../constant/DetailJobConstant'
import * as typeStatus from '../constant/StatusConstant'

const Default_State = {
    dataTable: [],
    isLoading: false,
    error: false,
    errorMessage: null,
    total: 10,
    textSearch: "",
    currentPage: 1,
    dataStatus: []
}
export default (state = Default_State, action) => {
    switch (action.type) {   // action.type: kiểu enum, action lấy từ type
        case typeStatus.Get_Status_Request:
            return {
                ...state,
            }
        case typeStatus.Get_Status_Sucsses:
            return {
                ...state,
                dataStatus: action.payload.dataStatus
            }
        case typeDetail.Get_DetailJob_Request:
            return {
                ...state,
            }
        case typeDetail.Get_DetailJob_Sucsses:
            return {
                ...state,
            }
        case typeDetail.Page_DetailJob_Request:
            return {
                ...state,
            }
        case typeDetail.Page_DetailJob_Sucsses:
            return {
                ...state,
            }
        case typeDetail.Add_DetailJob_Request:
            return {
                ...state,
            }
        case typeDetail.Add_DetailJob_Sucsses:
            return {
                ...state,
            }
        case typeDetail.Delete_DetailJob_Request:
            return {
                ...state,
            }
        case typeDetail.Delete_DetailJob_Sucsses:
            return {
                ...state,
            }
        case typeDetail.Update_DetailJob_Request:
            return {
                ...state,
            }
        case typeDetail.Update_DetailJob_Sucsses:
            return {
                ...state,
            }
        case typeDetail.Sort_DetailJob_Request:
            return {
                ...state,
            }
        case typeDetail.Sort_DetailJob_Sucsses:
            return {
                ...state,
            }
        case typeDetail.Search_DetailJob_Request:
            return {
                ...state,
            }
        case typeDetail.Search_DetailJob_Sucsses:
            return {
                ...state,
            }
        case typeDetail.Sort_Search_DetailJob_Request:
            return {
                ...state,
            }
        case typeDetail.Sort_Search_DetailJob_Sucsses:
            return {
                ...state,
            }
        ////////////////////////////////////////Reducer of Job////////////////////////////////////////////
        case type.Page_Job_Request:
            return {
                ...state,
                isLoading: true,
                currentPage: action.payload
            }
        case type.Page_Job_Sucsses:
            return {
                ...state,
                isLoading: false,
                dataTable: action.payload.dataOfPage,
                total: action.payload.total
            }
        case type.Add_Job_Request:
            return {
                ...state,
                isLoading: true,
            }
        case type.Add_Job_Sucsses:
            return {
                ...state,
                isLoading: false,
                total: action.payload.total,
                dataTable: action.payload.dataOfPage,
                currentPage: action.payload.currentPage
            }
        case type.Delete_Job_Request:
            return {
                ...state,
                isLoading: true
            }
        case type.Delete_Job_Sucsses:
            return {
                ...state,
                isLoading: false,
                dataTable: action.payload.dataOfPage,
                total: action.payload.total,
                currentPage: action.payload.currentPage
            }
        case type.Update_Job_Request:
            return {
                ...state,
                isLoading: true,
            }
        case type.Update_Job_Sucsses:
            return {
                ...state,
                isLoading: false,
                dataTable: action.payload.dataOfPage
            }
        case type.Search_Job_Request:
            return {
                ...state,
                isLoading: true,
                textSearch: action.payload.textSearch,
                currentPage: action.payload.page,
                
            }
        case type.Search_Job_Sucsses:
            return {
                ...state,
                isLoading: false,
                total: action.payload.total,
                dataTable: action.payload.dataOfPage,
            }
        case type.Sort_Job_Request:
            return {
                ...state,
                isLoading: false,
                currentPage: action.payload.page

            }
        case type.Sort_Job_Sucsses:
            return {
                ...state,
                isLoading: false,
                dataTable: action.payload.dataOfPage,
                total: action.payload.total,
            }
        case type.Sort_Search_Job_Request:
            return {
                ...state,
                isLoading: false,
                currentPage: action.payload.page,
                textSearch: action.payload.textSearch,
            }
        case type.Sort_Search_Job_Sucsses:
            return {
                ...state,
                isLoading: false,
                dataTable: action.payload.dataOfPage,
                total:action.payload.total
            }
        default:

            return Default_State;
    }
}