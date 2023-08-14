import React from 'react'
import DetailJobComponent from '../component/DetailJobComponent'
import * as Action from '../action/DetailJobAction'
import { connect } from 'react-redux'
import JobComponent from '../component/JobComponent'
class DetailJobContainer extends React.Component {
    render() {
        // console.log("props Detail container dcmm", this.props);
        return (
                <DetailJobComponent {...this.props} />
        )
    }
}
const mapDispatchToProps = (dispatch) => {           // gửi lên reducer
    return {
        // getDetailJob: (pageNum) => {
        //     return dispatch(Action.getDetailJobAction(pageNum));
        // },
        pageDetailJob: (pageNum) => {
            return dispatch(Action.pageDetailJobAction(pageNum));
        },
        addDetailJob: (data) => {
            return dispatch(Action.addDetailJobAction(data))
        },
        deleteDetailJob: (id) => {
            return dispatch(Action.deleteDetailJobAction(id));
        },
        updateDetailJob: (data) => {
            return dispatch(Action.updateDetailJobAction(data))
        },
        searchDetailJob: (keyword) => {
            return dispatch(Action.searchDetailJobAction(keyword));
        },
        sortDetailJob: (pageNum) => {
            return dispatch(Action.sortDetailJobAction(pageNum));
        },
        sortSearchDetailJob: (data) => {
            return dispatch(Action.sortSearchDetailJobAction(data));
        }
    }
}
const mapStateToProps = (state) => {
    return {
        DataTable: state.detailJobReducer.dataTableDetail,
        total: state.detailJobReducer.total,
        textSearch: state.detailJobReducer.textSearch,
        currentPage: state.detailJobReducer.currentPageDetail,
        isGetting: state.detailJobReducer.isGetting,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailJobContainer)