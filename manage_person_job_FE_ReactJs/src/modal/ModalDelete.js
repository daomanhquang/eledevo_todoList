import React from "react";
import { Modal, Input } from 'antd';
import { Button } from "antd";


export default class ModalDeleting extends React.Component {

    state = {

    }
    render() {
        let content;
        if(this.props.modalFor=="job"){
            content = (
                <Modal okText="Delete" open={this.props.isOpen} onCancel={this.props.close} onOk={this.props.handleOk} title="Deleting">
                    <p>
                        Bạn có chắc chắn muốn xóa
                        <span style={{ color: "red", marginLeft: "2px" }}>
                            {this.props.jobName}{" "}
                        </span>
                        không ?
                    </p>
                </Modal>
            );
        }
        else if(this.props.modalFor=="status"){
            content = (
                <Modal okText="Delete" open={this.props.isOpen} onCancel={this.props.close} onOk={this.props.handleOk} title="Deleting">
                    <p>
                        Bạn có chắc chắn muốn xóa
                        <span style={{ color: "red", marginLeft: "2px" }}>
                            {this.props.statusName}{" "}
                        </span>
                        không ?
                    </p>
                </Modal>
            );
        }
        else if(this.props.modalFor=="detailJob"){
            content = (
                <Modal okText="Delete" open={this.props.isOpen} onCancel={this.props.close} onOk={this.props.handleOk} title="Deleting">
                    <p>
                        Bạn có chắc chắn muốn xóa
                        <span style={{ color: "red", marginLeft: "2px" }}>
                            {this.props.detailJobName}{" "}
                        </span>
                        không ?
                    </p>
                </Modal>
            );
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}