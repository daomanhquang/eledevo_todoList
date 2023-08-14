import React from 'react'
import JobComponent from '../component/JobComponent'
import * as Action from '../action/JobAction'
import { getDetailJobAction } from '../action/DetailJobAction'
import { connect } from 'react-redux'
class JobContainer extends React.Component {
    render() {
        return (
            <JobComponent {...this.props}
            />
        )
    }
    componentDidMount() {
        this.props.pageJob(1);
    }
}
const mapDispatchToProps = (dispatch) => {           // gửi lên reducer
    return {

        getDetail: (pageNum) => {
            return dispatch(getDetailJobAction(pageNum));
        },
        getStatus: () => {
            return dispatch(Action.getStatusAction());
        },

        pageJob: (pageNum) => {
            return dispatch(Action.pageJobAction(pageNum));
        },
        addJob: (data) => {
            return dispatch(Action.addJobAction(data))
        },
        deleteJob: (id) => {
            return dispatch(Action.deleteJobAction(id));
        },
        updateJob: (data) => {
            return dispatch(Action.updateJobAction(data))
        },
        searchJob: (textSearch) => {
            return dispatch(Action.searchJobAction(textSearch));
        },
        sortJob: (pageNum) => {
            return dispatch(Action.sortJobAction(pageNum));
        },
        sortSearchJob: (data) => {
            return dispatch(Action.sortSearchJobAction(data));
        }
    }
}
const mapStateToProps = (state) => {
    return {
        DataTable: state.jobReducer.dataTable,
        total: state.jobReducer.total,          // get total
        textSearch: state.jobReducer.textSearch,
        currentPage: state.jobReducer.currentPage,
        dataStatus: state.jobReducer.dataStatus
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(JobContainer)