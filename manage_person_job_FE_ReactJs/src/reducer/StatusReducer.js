import * as type from '../constant/StatusConstant'
const Default_State = {
    dataTable: [],
    isLoading: false,
    error: false,
    errorMessage: null,
    total: 0,
    textSearch: "",
    currentPage: 1
}
export default (state = Default_State, action) => {

    switch (action.type) {   // action.type: kiểu enum, action lấy từ type
        case type.Page_Status_Request:
            return {
                ...state,
                isLoading: true,
                currentPage: action.payload
            }
        case type.Page_Status_Sucsses:
            return {
                ...state,
                isLoading: false,
                dataTable: action.payload.dataOfPage,
                total: action.payload.total
            }
        case type.Add_Status_Request:
            return {
                ...state,
                isLoading: true,
            }
        case type.Add_Status_Sucsses:
            return {
                ...state,
                isLoading: false,
                total: action.payload.total,
                dataTable: action.payload.dataOfPage,
                currentPage: action.payload.page
            }
        case type.Delete_Status_Request:
            return {
                ...state,
                isLoading: true
            }
        case type.Delete_Status_Sucsses:
            return {
                ...state,
                isLoading: false,
                dataTable: action.payload.dataOfPage,
                total: action.payload.total,
                currentPage: action.payload.currentPage
            }
        case type.Update_Status_Request:
            return {
                ...state,
                isLoading: true,
            }
        case type.Update_Status_Sucsses:
            return {
                ...state,
                isLoading: false,
                dataTable: action.payload.dataOfPage
            }
        case type.Search_Status_Request:
            return {
                ...state,
                isLoading: true,
                textSearch: action.payload.textSearch,
                currentPage: action.payload.page,

            }
        case type.Search_Status_Sucsses:
            return {
                ...state,
                isLoading: false,
                total: action.payload.total,
                dataTable: action.payload.dataOfPage,
            }
        case type.Sort_Status_Request:
            return {
                ...state,
                isLoading: false,
                currentPage: action.payload.page

            }
        case type.Sort_Status_Sucsses:
            return {
                ...state,
                isLoading: false,
                dataTable: action.payload.dataOfPage,
                total: action.payload.total,
            }
        case type.Sort_Search_Status_Request:
            return {
                ...state,
                isLoading: false,
                currentPage: action.payload.page,
                textSearch: action.payload.textSearch,
            }
        case type.Sort_Search_Status_Sucsses:
            return {
                ...state,
                isLoading: false,
                dataTable: action.payload.dataOfPage,
                total: action.payload.total
            }
        default:
            return Default_State;
    }
}