import React from 'react'
import { Alert, Pagination, Modal, Input, Select } from 'antd';
import { LIMIT, Isremote } from "../constant/DetailJobConstant"
import ModalAdd from "../modal/ModalAdd"
import ModalDelete from "../modal/ModalDelete"
import ModalUpdate from "../modal/ModalUpdate"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Spin, Table, Tag } from "antd";
import { openNotification } from './NotificationCommom';
import { DataDetailJobFake } from './fakeData'

class DetailJobComponent extends React.Component {
    state = {
        id: "",
        detailJob: {
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
        options: [],
        idStatus: "",
        defaultStatus: null,
        textSearchDetail: "",
    }

    render() {
        // console.log("props Detail Component:", this.props);
        const { Search } = Input;

        const columns = [
            {
                title: "Ten chi tiet cong viec",
                dataIndex: "name",
                key: "name",
                render: (text) => <span> {text}</span>,
            },
            {
                title: "Trang thai",
                dataIndex: "status",
                key: "status",
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
                            <EditOutlined />
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
        // const dataTable = { DataDetailJobFake }

        const handleOpen = (isRemote, record) => {
            this.setState(() => {
                let optionss = [];
                for (let i = 0; i < this.props.dataStatus.length; i++) {
                    optionss.push({
                        label: this.props.dataStatus.at(i).name,
                        value: this.props.dataStatus.at(i).id,
                    });
                }
                return { options: optionss }
            });
            if (isRemote == "Add") {
                this.setState({
                    isOpenModalAdd: true,
                    modalFor: "detailJob",
                });
            }
            else if (isRemote == "Update") {
                // console.log("options ne", this.state.options);
                this.setState({
                    defaultStatus: record.status,
                    isOpenModalUpdate: true,
                    modalFor: "detailJob",
                    id: record.id,
                    detailJob: {
                        name: record.name,
                    },
                    // idStatus: record.idStatus,
                });
                // console.log("re cot sua:", record);
            }
            else if (isRemote == "Delete") {
                this.setState({
                    isOpenModalDelete: true,
                    modalFor: "detailJob",
                    id: record.id,
                    detailJob: {
                        name: record.name
                    }
                });
                console.log("re cot xoa:", record);
            }
        };
        const handleClose = () => {
            this.setState({
                isOpenModalAdd: false,
                detailJob: { name: "" },
                modalFor: " ",
                id: "",
                isOpenModalDelete: false,
                isOpenModalUpdate: false,
                isOpenDetailJob: false,
                idStatus: "",
                defaultStatus: ""
            });
        };
        const handleOk = () => {

            // console.log("options ne", this.state.options);
            // console.log("delete detailJob name", this.state.detailJob.name, "id", this.state.id);             //ok da lay dc doi tuong
            if (this.state.isOpenModalAdd) {
                // console.log("add detailJob name", this.state.detailJob.name, "idJob", this.props.idJob, "idStatus", this.state.idStatus);             //ok da lay dc doi tuong

                this.props.addDetailJob({
                    addObject: {
                        name: this.state.detailJob.name,
                        idJob: this.props.idJob,
                        idStatus: this.state.idStatus
                    },
                    page: Math.ceil(this.props.total / LIMIT),
                    total: this.props.total,

                });
                setTimeout(() => {
                    this.setState({ isOpenModalAdd: false })
                    this.setState({
                        isOpenModalAdd: false, idStatus: "", detailJob: { name: "" },
                        id: "", defaultStatus: ""

                    })
                    openNotification(Isremote.IsCreate);

                }, 100);
            }
            else if (this.state.isOpenModalUpdate) {
                // console.log("default khi an ok", this.state.defaultStatus);
                if (this.state.idStatus != "") {
                    this.props.updateDetailJob({
                        updateObject: {
                            name: this.state.detailJob.name,
                            idJob: this.props.idJob,
                            idStatus: this.state.idStatus,

                        },
                        page: this.props.currentPage,
                        id: this.state.id,
                        sorting: this.state.sorting,
                        searching: this.state.searching,
                        sortType: this.state.sortType,
                        textSearch: this.props.textSearch
                    });

                }
                setTimeout(() => {
                    this.setState({
                        detailJob: {
                            name: ""
                        },
                        id: "",
                        idStatus: "",
                        defaultStatus: ""
                    });
                    this.setState({ isOpenModalUpdate: false })
                    openNotification(Isremote.IsUpdate);
                }, 100);

            }
            else if (this.state.isOpenModalDelete) {
                this.props.deleteDetailJob({
                    id: this.state.id,
                    currentPage: this.props.currentPage,
                    total: this.props.total,
                    idJob: this.props.idJob
                });
                setTimeout(() => {
                    this.setState({ isOpenModalDelete: false })
                    this.setState({
                        id: "",
                        detailJob: {
                            name: ""
                        }
                    });
                    openNotification(Isremote.IsDelete);
                }, 100);
            }
        }
        const handleDataChange = (eve) => {
            // if(this.state.isOpenModalUpdate){
            //     this.setState({haveChangeInUpdate:true})
            // }
            const { name, value } = eve.target;
            this.setState((preState) => {
                const updateEvents = {
                    ...preState.detailJob,
                    [name]: value,
                };
                return { detailJob: updateEvents }
            });
        };
        const onSearch = (value) => {
            // console.log("value day", value);
            this.setState({ textSearch: "value" })
            if (this.state.sorting) {
                this.props.sortSearchDetailJob({
                    page: 1,
                    textSearch: value,
                    sortType: this.state.sortType,
                    idJob: this.props.idJob
                })

            }
            else {
                this.props.searchDetailJob({
                    page: 1,
                    textSearch: value,
                    idJob: this.props.idJob

                })
            }
            this.setState({ searching: true })

            // }
        }
        const handleSort = (sortType) => {
            console.log(sortType, "sortType in Detail component");
            if (this.state.searching) {
                this.props.sortSearchDetailJob({
                    page: 1,
                    textSearch: this.props.textSearch,
                    sortType: sortType.value,
                    idJob: this.props.idJob

                })
            }
            else {
                this.props.sortDetailJob({
                    page: 1,
                    sortType: sortType.value,
                    idJob: this.props.idJob

                })
            }
            this.setState({ sortType: sortType.value, sorting: true })
            this.props.changeSortType(sortType);
        }
        const changePage = (page) => {
            console.log("state component", this.state);
            console.log("props component", this.props);
            if (this.state.searching) {
                if (this.state.sorting) {
                    this.props.sortSearchDetailJob({
                        page: page,
                        sortType: this.state.sortType,
                        textSearch: this.props.textSearch,
                        idJob: this.props.idJob

                    })
                }
                else {
                    this.props.searchDetailJob({
                        page: page,
                        textSearch: this.props.textSearch,
                        idJob: this.props.idJob

                    })
                }
            }
            else if (this.state.sorting) {
                if (this.state.searching) {
                    this.props.sortSearchDetailJob({
                        page: page,
                        sortType: this.state.sortType,
                        textSearch: this.props.textSearch,
                        idJob: this.props.idJob

                    })
                }
                else {
                    this.props.sortDetailJob({
                        page: page,
                        sortType: this.state.sortType,
                        idJob: this.props.idJob

                    })
                }
            }
            else {
                this.props.pageDetailJob({
                    page: page,
                    idJob: this.props.idJob
                });
            }
        }

        const changeStatus = (data) => {
            console.log("id Status", data);
            this.setState({ idStatus: data.value, defaultStatus: data.label })
            // this.setState({ idStatus: data.value })
        };

        return (
            <div>

                <Modal open={this.props.isOpen} onCancel={this.props.close} onOk={this.props.handleOk} >
                    <h1>Manage Detail Job {this.props.jobName}</h1>
                    <div style={{ display: "flex", width: "100%", justifyContent: "space-around" }}>
                        <Button style={{ color: "white", backgroundColor: "green" }} onClick={() => { handleOpen("Add") }}>
                            Add
                        </Button>
                        <Search
                            style={{ width: "400px" }}
                            allowClear
                            size='large'
                            placeholder="input search text"
                            onSearch={onSearch}
                            value={this.props.textSearchDetail}
                            name='name'
                            onChange={this.props.changeTextSearch}
                        />
                        <Select placeholder="Chon cach sap xep"
                            labelInValue

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
                            value={this.props.sortType}
                            name='sortType'
                        />
                    </div>

                    <div >
                        <Table pagination={false} columns={columns} dataSource={dataTable} />
                        <div> <Pagination current={this.props.currentPage} total={this.props.total} defaultPageSize={LIMIT}
                            onChange={changePage}
                        /></div>
                    </div>
                    <ModalAdd
                        isOpen={this.state.isOpenModalAdd}
                        modalFor={this.state.modalFor}
                        close={handleClose}
                        handleOk={handleOk}
                        onDataInputChange={handleDataChange}
                        detailJobName={this.state.detailJob.name}
                        idJob={this.props.idJob}
                        dataStatus={this.state.options}
                        changeIdStatus={changeStatus}
                        defaultStatus={this.state.defaultStatus}
                    // idStatus={this.state.idStatus}
                    />
                    <ModalDelete
                        isOpen={this.state.isOpenModalDelete}
                        modalFor={this.state.modalFor}
                        close={handleClose}
                        handleOk={handleOk}
                        detailJobName={this.state.detailJob.name}
                    />
                    <ModalUpdate
                        isOpen={this.state.isOpenModalUpdate}
                        modalFor={this.state.modalFor}
                        close={handleClose}
                        handleOk={handleOk}
                        onDataInputChange={handleDataChange}
                        detailJobName={this.state.detailJob.name}
                        dataStatus={this.state.options}
                        changeIdStatus={changeStatus}
                        defaultStatus={this.state.defaultStatus}
                        idStatus={this.state.idStatus}
                    />
                </Modal>

            </div>
        )
    }
}
export default DetailJobComponent;