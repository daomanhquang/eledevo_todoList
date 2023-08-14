import { combineReducers } from 'redux'
import JobReducer from "./JobReducer"
import DetailJobReducer from "./DetailJobReducer"
import StatusReducer from "./StatusReducer"


const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    jobReducer: JobReducer,
    detailJobReducer: DetailJobReducer,
    statusReducer: StatusReducer   
})

export default rootReducer