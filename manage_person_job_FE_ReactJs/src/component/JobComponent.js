import React from 'react'
import { Alert, Pagination, Select, Space } from 'antd';
import { LIMIT, Isremote } from "../constant/JobConstant"
import ModalAdd from "../modal/ModalAdd"
import ModalDelete from "../modal/ModalDelete"
import ModalUpdate from "../modal/ModalUpdate"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Spin, Input, Table, Tag } from "antd";
import DetailJobComponent from './DetailJobComponent'
import DetailJobContainer from '../container/DetailJobContainer'
import { openNotification } from './NotificationCommom';
import { DataJobFake } from './fakeData'
import { type } from '@testing-library/user-event/dist/type';
class JobComponent extends React.Component {
    state = {
        id: "",
        job: {
            name: "",
        },
        defaultCurrentPage: 1,
        modalFor: "",
        textSearch: "",
        searching: false,
        sortType: "",
        sorting: false,
        isOpenModalAdd: false,
        isOpenModalDelete: false,
        isOpenModalUpdate: false,
        isOpenDetailJob: false,
        dataDetailJob: [],
        dataStatus: [],
        textSearchInDetail: {
            name: ""
        },
        defaultSort: "",
        sortTypeInDetail: null
    }
    render() {
        const { Search } = Input;
        // console.log("state cua job component", this.state);

        const handelDetailData = (record) => {
            this.props.getDetail({ page: 1, idJob: record.id })
            setTimeout(() => {
                this.props.getStatus()

            }, 200);
            this.setState({
                dataDetailJob: this.props?.dataDetailJob,
                isOpenDetailJob: true,
                id: record.id,
                job: {
                    name: record.name
                }
            })
            // console.log("state day", this.state.dataDetailJob);
        }
        const columns = [
            {
                title: "Ten cong viec",
                dataIndex: "name",
                key: "name",
                render: (_, record) => (
                    // <a onClick={() => { handleOpen("DetailJob", record) }} >{record.name}</a>
                    <a onClick={() => { handelDetailData(record) }} >{record.name}</a>

                ),
            },

            {
                title: "Tien do",
                dataIndex: "process",
                key: "process",
            },
            {
                title: "Action",
                key: "action",

                render: (record) => (
                    <>
                        <Button
                            onClick={() => {
                                handleOpen("Update", record);
                            }}
                        >
                            <EditOutlined style={{ color: "blue" }} />
                        </Button>
                        <Button
                            onClick={() => {
                                handleOpen("Delete", record);
                            }}
                        >
                            <DeleteOutlined style={{ color: "red" }} />
                        </Button>
                    </>
                ),
            },
        ];
        const dataTable = this.props?.DataTable
        // const dataTable = {DataJobFake}
        const changePage = (page) => {
            console.log("props component", this.props);
            if (this.state.searching) {
                if (this.state.sorting) {
                    this.props.sortSearchJob({
                        page: page,
                        sortType: this.state.sortType,
                        textSearch: this.props.textSearch
                    })
                }
                else {
                    this.props.searchJob({
                        page: page,
                        textSearch: this.props.textSearch
                    })
                }
            }
            else if (this.state.sorting) {
                if (this.state.searching) {
                    this.props.sortSearchJob({
                        page: page,
                        sortType: this.state.sortType,
                        textSearch: this.props.textSearch
                    })
                }
                else {
                    this.props.sortJob({
                        page: page,
                        sortType: this.state.sortType
                    })
                }
            }
            else {
                this.props.pageJob(page);
            }
        }
        const handleOpen = (isRemote, record) => {
            if (isRemote == "DetailJob") {
                this.setState({
                    isOpenDetailJob: true,
                    id: record.id,
                    // job:{
                    //     name: record.name
                    // }
                })
            }
            else if (isRemote == "Add") {
                this.setState({
                    isOpenModalAdd: true,
                    modalFor: "job",
                });
            }
            else if (isRemote == "Update") {
                this.setState({
                    isOpenModalUpdate: true,
                    modalFor: "job",
                    id: record.id,
                    job: {
                        name: record.name
                    }
                });
                console.log("re cot sua:", record);
            }
            else if (isRemote == "Delete") {
                this.setState({
                    isOpenModalDelete: true,
                    modalFor: "job",
                    id: record.id,
                    job: {
                        name: record.name
                    }
                });
                console.log("re cot xoa:", record);
            }
        };
        const handleClose = () => {
            if (this.state.isOpenDetailJob) {
                this.props.pageJob(this.props.currentPage);
                this.setState({ isOpenDetailJob: false })
            }
            this.setState({
                isOpenModalAdd: false,
                job: { name: "" },
                modalFor: " ",
                id: "",
                isOpenModalDelete: false,
                isOpenModalUpdate: false,
                textSearchInDetail: { name: "" },
                sortTypeInDetail: null

            });
        };
        const handleOk = () => {
            if (this.state.isOpenDetailJob) {
                this.props.pageJob(this.props.currentPage);
                this.setState({
                    isOpenDetailJob: false, id: "",
                    textSearchInDetail: {
                        name: ""
                    },
                    sortTypeInDetail: null

                })

            }
            else if (this.state.isOpenModalAdd) {
                this.props.addJob({
                    addObject: this.state.job,
                    page: Math.ceil(this.props.total / LIMIT),
                    total: this.props.total
                });
                setTimeout(() => {
                    this.setState({ isOpenModalAdd: false })
                    this.setState({
                        job: {
                            name: ""
                        }
                    });
                    openNotification(Isremote.IsCreate);

                }, 100);
                return
            }
            else if (this.state.isOpenModalDelete) {
                this.props.deleteJob({
                    id: this.state.id,
                    currentPage: this.props.currentPage,
                    total: this.props.total
                });
                setTimeout(() => {
                    this.setState({ isOpenModalDelete: false })
                    this.setState({
                        id: "",
                        job: {
                            name: ""
                        }
                    });
                    openNotification(Isremote.IsDelete);

                }, 100);
            }
            else if (this.state.isOpenModalUpdate) {
                this.props.updateJob({
                    updateObject: this.state.job,
                    page: this.props.currentPage,
                    id: this.state.id,
                    sorting: this.state.sorting,
                    searching: this.state.searching,
                    sortType: this.state.sortType,
                    textSearch: this.props.textSearch
                });
                setTimeout(() => {
                    this.setState({ isOpenModalUpdate: false })
                    this.setState({
                        job: {
                            name: ""
                        },
                        id: ""
                    });
                    openNotification(Isremote.IsUpdate);

                }, 100);
                return
            }
        };

        const handleDataChange = (eve) => {

            const { name, value } = eve.target;
            this.setState((preState) => {
                console.log(preState, 'Day la gif');
                const updateEvents = {
                    ...preState.job,
                    [name]: value,
                };
                return { job: updateEvents }
            });
        };
        const onSearch = (value) => {
            console.log("value day", value);
            // if (value =="") {
            //     this.setState({ searching: false })
            // }
            // else {
            if (this.state.sorting) {
                this.props.sortSearchJob({
                    page: 1,
                    textSearch: value,
                    sortType: this.state.sortType
                })
            }
            else {
                this.props.searchJob({
                    page: 1,
                    textSearch: value
                })
            }
            this.setState({ searching: true })

            // }
        }
        const handleSort = (sortType) => {
            // console.log(sortType);
            if (this.state.searching) {
                this.props.sortSearchJob({
                    page: 1,
                    textSearch: this.props.textSearch,
                    sortType: sortType
                })
            }
            else {
                this.props.sortJob({
                    page: 1,
                    sortType: sortType
                })
            }
            this.setState({ sortType: sortType, sorting: true })


        }
        const changeTextSearchInDetail = (e) => {
            const { name, value } = e.target;
            this.setState((preState) => {
                const updateEvents = {
                    ...preState.textSearchInDetail,
                    [name]: value,
                };
                return { textSearchInDetail: updateEvents }
            });
        }
        const changeSortTypeInDetail = (e) => {
            console.log("sorrttype in Job component", e);
            this.setState({ sortTypeInDetail: e.label })
            // this.setState({ idStatus: data.value, defaultStatus: data.label })

        }

        return (
            <div style={{ width: "100%" }}>
                <h1>Manage Job</h1>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                    <Button style={{ color: "white", backgroundColor: "green" }} onClick={() => { handleOpen("Add") }}>
                        Add
                    </Button>
                    <Search
                        style={{ width: "400px" }}
                        allowClear
                        size='large'
                        placeholder="input search text"
                        onSearch={onSearch}
                    />
                    <Select placeholder="Chon cach sap xep"

                        options={[
                            {
                                value: "asc",
                                label: "A-Z"
                            },
                            {
                                value: "desc",
                                label: "Z-A"
                            }
                        ]}
                        onChange={handleSort}
                    />
                </div>

                <div >
                    <Table rowKey="name" pagination={false} columns={columns} dataSource={dataTable}
                        style={{ position: "relative" }}
                    />
                    <div> <Pagination current={this.props.currentPage} total={this.props.total} defaultPageSize={LIMIT}
                        onChange={changePage} style={{ position: "absolute", right: "150px" }}
                    /></div>
                </div>
                <ModalAdd
                    isOpen={this.state.isOpenModalAdd}
                    modalFor={this.state.modalFor}
                    close={handleClose}
                    handleOk={handleOk}
                    onDataInputChange={handleDataChange}
                    jobName={this.state.job.name}
                />
                <ModalDelete
                    isOpen={this.state.isOpenModalDelete}
                    modalFor={this.state.modalFor}
                    close={handleClose}
                    handleOk={handleOk}
                    jobName={this.state.job.name}
                />
                <ModalUpdate
                    isOpen={this.state.isOpenModalUpdate}
                    modalFor={this.state.modalFor}
                    close={handleClose}
                    handleOk={handleOk}
                    onDataInputChange={handleDataChange}
                    jobName={this.state.job.name}
                />
                <DetailJobContainer
                    idJob={this.state.id}
                    isOpen={this.state.isOpenDetailJob}
                    close={handleClose}
                    handleOk={handleOk}
                    // dataDetailJob={this.state.dataDetailJob}
                    jobName={this.state.job.name}
                    dataStatus={this.props.dataStatus}
                    textSearchDetail={this.state.textSearchInDetail.name}
                    changeTextSearch={changeTextSearchInDetail}
                    // defaultSort={this.state.defaultSort}
                    sortType={this.state.sortTypeInDetail}
                    changeSortType={changeSortTypeInDetail}

                />
            </div>
        )
    }
}
export default JobComponent;