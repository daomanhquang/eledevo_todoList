import React from 'react'
import { Alert, Pagination, Input, Select } from 'antd';
import { LIMIT, Isremote } from '../constant/StatusConstant'
import ModalAdd from "../modal/ModalAdd"
import ModalDelete from "../modal/ModalDelete"
import ModalUpdate from "../modal/ModalUpdate"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Spin, Table, Tag } from "antd";
import { openNotification } from './NotificationCommom';
import { DataStatusFake } from './fakeData'

class StatusComponent extends React.Component {
    state = {
        id: "",
        status: {
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
        isOpenModalUpdate: false
    }
    render() {
        const { Search } = Input;

        const columns = [
            {
                title: "Ten trang thai",
                dataIndex: "name",
                key: "name",
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
        // const dataTable = {DataStatusFake}

        const handleOpen = (isRemote, record) => {
            if (isRemote == "Add") {
                this.setState({
                    isOpenModalAdd: true,
                    modalFor: "status",
                });
            }
            if (isRemote == "Update") {
                this.setState({
                    isOpenModalUpdate: true,
                    modalFor: "status",
                    id: record.id,
                    status: {
                        name: record.name
                    }
                });
            }
            if (isRemote == "Delete") {
                this.setState({
                    isOpenModalDelete: true,
                    modalFor: "status",
                    id: record.id,
                    status: {
                        name: record.name
                    }
                });
            }
        }
        const handleClose = () => {
            this.setState({
                isOpenModalAdd: false,
                status: { name: "" },
                modalFor: "",
                id: "",
                isOpenModalDelete: false,
                isOpenModalUpdate: false
            });
        }
        const handleOk = () => {
            if (this.state.isOpenModalAdd) {
                this.props.addStatus({
                    addObject: this.state.status,
                    page: Math.ceil(this.props.total / LIMIT),
                    total: this.props.total
                });
                setTimeout(() => {
                    this.setState({ isOpenModalAdd: false })
                    this.setState({
                        status: {
                            name: ""
                        }
                    });
                    openNotification(Isremote.IsCreate);
                }, 200);
            }
            else if (this.state.isOpenModalDelete) {
                this.props.deleteStatus({
                    id: this.state.id,
                    currentPage: this.props.currentPage,
                    total: this.props.total
                });
                setTimeout(() => {
                    this.setState({ isOpenModalDelete: false })
                    this.setState({
                        id: "",
                        status: {
                            name: ""
                        }
                    });
                    openNotification(Isremote.IsDelete);
                }, 100);
            }
            else if (this.state.isOpenModalUpdate) {
                this.props.updateStatus({
                    updateObject: this.state.status,
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
                        status: {
                            name: ""
                        },
                        id: ""
                    });
                    openNotification(Isremote.IsUpdate);
                }, 100);
                return
            }
        }
        const handleDataChange = (eve) => {
            const { name, value } = eve.target;
            this.setState((preState) => {
                const updateEvents = {
                    ...preState.status,
                    [name]: value,
                };
                return { status: updateEvents }
            });
        }
        const onSearch = (value) => {
            console.log("value day", value);
            // if (value =="") {
            //     this.setState({ searching: false })
            // }
            // else {
            if (this.state.sorting) {
                this.props.sortSearchStatus({
                    page: 1,
                    textSearch: value,
                    sortType: this.state.sortType
                })
            }
            else {
                this.props.searchStatus({
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
                this.props.sortSearchStatus({
                    page: 1,
                    textSearch: this.props.textSearch,
                    sortType: sortType
                })
            }
            else {
                this.props.sortStatus({
                    page: 1,
                    sortType: sortType
                })
            }
            this.setState({ sortType: sortType, sorting: true })


        }
        const changePage = (page) => {
            console.log("state component", this.state);
            console.log("props component", this.props);
            if (this.state.searching) {
                if (this.state.sorting) {
                    this.props.sortSearchStatus({
                        page: page,
                        sortType: this.state.sortType,
                        textSearch: this.props.textSearch
                    })
                }
                else {
                    this.props.searchStatus({
                        page: page,
                        textSearch: this.props.textSearch
                    })
                }
            }
            else if (this.state.sorting) {
                if (this.state.searching) {
                    this.props.sortSearchStatus({
                        page: page,
                        sortType: this.state.sortType,
                        textSearch: this.props.textSearch
                    })
                }
                else {
                    this.props.sortStatus({
                        page: page,
                        sortType: this.state.sortType
                    })
                }
            }
            else {
                this.props.pageStatus(page);
            }
        }
        return (
            <div style={{ width: "100%" }}>
                <h1>Manage Status</h1>
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
                {/* <Button style={{ color: "white", backgroundColor: "green" }} onClick={() => { handleOpen("Add") }}>
                    Add
                </Button> */}
                <div >
                    <Table pagination={false} columns={columns} dataSource={dataTable}
                        style={{ position: "relative" }} />
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
                    statusName={this.state.status.name}
                />
                <ModalDelete
                    isOpen={this.state.isOpenModalDelete}
                    modalFor={this.state.modalFor}
                    close={handleClose}
                    handleOk={handleOk}
                    statusName={this.state.status.name}
                />
                <ModalUpdate
                    isOpen={this.state.isOpenModalUpdate}
                    modalFor={this.state.modalFor}
                    close={handleClose}
                    handleOk={handleOk}
                    onDataInputChange={handleDataChange}
                    statusName={this.state.status.name}
                />

            </div>
        )
    }
}
export default StatusComponent;