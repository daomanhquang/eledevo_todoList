import React from "react";
import { Modal, Input } from 'antd';
import { Button, Select } from "antd";


export default class ModalAdd extends React.Component {

    state = {

    }
    render() {
        // console.log("props cua modal Add", this.props);
        const onChange = (value) => {
            // console.log(`selected ${value}`);
            // console.log("heehi", value.popupClassName);
            this.props.changeIdStatus(value)
        };


        let content;
        if (this.props.modalFor == "status") {
            content = (
                <>
                    <Modal title="Them trang thai" open={this.props.isOpen} okText="Add"
                        onOk={this.props.handleOk} onCancel={this.props.close}>
                        <div>
                            <label>Tên trang thai:</label>
                            <Input name="name" onChange={this.props.onDataInputChange} value={this.props.statusName} />
                            <label>Trang thai:</label>


                        </div>
                    </Modal>
                </>
            );
        }
        else if (this.props.modalFor == "job") {
            content = (
                <>
                    <Modal title="Them cong viec" open={this.props.isOpen} okText="Add"
                        onOk={this.props.handleOk} onCancel={this.props.close}>
                        <div>
                            <label>Tên Công việc:</label>
                            <Input name="name" onChange={this.props.onDataInputChange} value={this.props.jobName} />

                        </div>
                    </Modal>
                </>
            );
        }

        else if (this.props.modalFor == "detailJob") {
            content = (
                <>
                    <Modal title="Them chi tiet cong viec" open={this.props.isOpen} okText="Add"
                        onOk={this.props.handleOk} onCancel={this.props.close}>
                        <div>
                            <label>Tên chi tiet Công việc:</label>
                            <Input name="name" onChange={this.props.onDataInputChange} value={this.props.detailJobName} />
                            <label>Trang thai:</label>
                            <Select
                                style={{ width: "250px" }}
                                // showSearch
                                labelInValue
                                popupClassName="trang thai"
                                placeholder="Select a status"
                                optionFilterProp="children"
                                onChange={onChange}
                                options={this.props.dataStatus}
                                value={this.props.defaultStatus}
                            />
                        </div>
                    </Modal>
                </>
            );
        }

        return (
            <div>
                {content}
            </div>
        )
    }
}