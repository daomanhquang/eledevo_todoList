import React from 'react'
import StatusComponent from '../component/StatusComponent'
import * as Action from '../action/StatusAction'
import { connect } from 'react-redux'
class StatusContainer extends React.Component {
    render() {
        return (
            <StatusComponent {...this.props}
            />
        )
    }
    componentDidMount() {
        this.props.pageStatus(1);
    }
}
const mapDispatchToProps = (dispatch) => {           // gửi lên reducer
    return {
        pageStatus: (pageNum) => {
            return dispatch(Action.pageStatusAction(pageNum));
        },
        addStatus: (data) => {
            return dispatch(Action.addStatusAction(data))
        },
        deleteStatus: (id) => {
            return dispatch(Action.deleteStatusAction(id));
        },
        updateStatus: (data) => {
            return dispatch(Action.updateStatusAction(data))
        },
        searchStatus: (textSearch) => {
            return dispatch(Action.searchStatusAction(textSearch));
        },
        sortStatus: (pageNum) => {
            return dispatch(Action.sortStatusAction(pageNum));
        },
        sortSearchStatus: (data) => {
            return dispatch(Action.sortSearchStatusAction(data));
        }
    }
}
const mapStateToProps = (state) => {
    return {
        DataTable: state.statusReducer.dataTable,
        total: state.statusReducer.total,          // get total
        textSearch: state.statusReducer.textSearch,
        currentPage: state.statusReducer.currentPage
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StatusContainer)