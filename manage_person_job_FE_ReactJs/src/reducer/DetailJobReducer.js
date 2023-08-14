import * as type from '../constant/DetailJobConstant'
import * as typeStatus from '../constant/StatusConstant'

const Default_State = {
    dataTableDetail: [],
    isLoading: false,
    error: false,
    errorMessage: null,
    total: 10,
    textSearch: "",
    currentPageDetail: 1,
    isGetting: true
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
        case type.Get_DetailJob_Request:
            return {
                ...state,
                isLoading: true,
                // currentPageDetail : action.payload.page,
                isGetting: false
            }
        case type.Get_DetailJob_Sucsses:
            return {
                ...state,
                isLoading: false,
                dataTableDetail: action.payload.dataOfPageDetail,
                total: action.payload.total,
                isGetting: false,
                currentPageDetail: 1

            }
        case type.Page_DetailJob_Request:
            return {
                ...state,
                isLoading: true,
                currentPageDetail: action.payload.page
            }
        case type.Page_DetailJob_Sucsses:
            return {
                ...state,
                isLoading: false,
                dataTableDetail: action.payload.dataOfPageDetail,
                isGetting: false
            }
        case type.Add_DetailJob_Request:
            return {
                ...state,
                isLoading: true,
            }
        case type.Add_DetailJob_Sucsses:
            return {
                ...state,
                isLoading: false,
                total: action.payload.total,
                dataTableDetail: action.payload.dataOfPageDetail,
                currentPageDetail: action.payload.currentPage
            }
        case type.Delete_DetailJob_Request:
            return {
                ...state,
                isLoading: true
            }
        case type.Delete_DetailJob_Sucsses:
            return {
                ...state,
                isLoading: false,
                dataTableDetail: action.payload.dataOfPageDetail,
                total: action.payload.total,
                currentPageDetail: action.payload.currentPage
            }
        case type.Update_DetailJob_Request:
            return {
                ...state,
                isLoading: true,
            }
        case type.Update_DetailJob_Sucsses:
            return {
                ...state,
                isLoading: false,
                dataTableDetail: action.payload.dataOfPageDetail,
                // total: action.payload.total,
                currentPageDetail: action.payload.currentPage
            }
        case type.Search_DetailJob_Request:
            return {
                ...state,
                isLoading: true,
                textSearch: action.payload.textSearch,
                currentPageDetail: action.payload.page,

            }
        case type.Search_DetailJob_Sucsses:
            return {
                ...state,
                isLoading: false,
                total: action.payload.total,
                dataTableDetail: action.payload.dataOfPage,
            }
        case type.Sort_DetailJob_Request:
            return {
                ...state,
                isLoading: false,
                currentPageDetail: action.payload.page

            }
        case type.Sort_DetailJob_Sucsses:
            return {
                ...state,
                isLoading: false,
                dataTableDetail: action.payload.dataOfPage,
                total: action.payload.total,
            }
        case type.Sort_Search_DetailJob_Request:
            return {
                ...state,
                isLoading: false,
                currentPageDetail: action.payload.page,
                textSearch: action.payload.textSearch,
            }
        case type.Sort_Search_DetailJob_Sucsses:
            return {
                ...state,
                isLoading: false,
                dataTableDetail: action.payload.dataOfPage,
                total: action.payload.total
            }
        default:
            return Default_State;
    }
}