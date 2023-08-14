import React from "react";
import { Modal, Input } from 'antd';
import { Button, Select } from "antd";


export default class ModalAdd extends React.Component {

    render() {
       
       
        // console.log("props Modal update",this.props);
        const onChange = (value) => {
            // console.log(`selected ${value}`);
            // console.log("heehi", value);
            this.props.changeIdStatus(value)
        };
        if(this.props.isOpen && this.props.idStatus == ""){       // lấy ra idstatus của detailjob gửi sang, sau đó gửi ngược lại cho component
            for(let i=0;i<this.props?.dataStatus.length;i++){
                if(this.props?.defaultStatus==this.props?.dataStatus.at(i).label){
                    {onChange(this.props?.dataStatus.at(i))}
                    // console.log("status day:", this.props?.dataStatus.at(i));
                }
            }
        }
      
        let content;
        switch (this.props.modalFor) {
            case "job":
                {
                    content = (
                        <Modal 
                        title="Sua cong viec" open={this.props.isOpen}
                        onOk={this.props.handleOk} 
                        onCancel={this.props.close} 
                        okText="Update">
                            <label>Tên Công việc:</label>
                            <Input value={this.props.jobName} name="name" onChange={this.props.onDataInputChange} />
                        </Modal>
                    );
                break;
            }
            case "status": 
            {
                content = (
                    <Modal title="Sua trang thai" open={this.props.isOpen}
                        onOk={this.props.handleOk} onCancel={this.props.close} okText="Update">
                        <label>Tên trang thai:</label>
                        <Input value={this.props.statusName} 
                               name="name" 
                               onChange={this.props.onDataInputChange} />
                    </Modal>
                );
                break;
            }
                case  "detailJob":
                {
                    content = (
                        <Modal title="Sua Detail Job" open={this.props.isOpen}
                            onOk={this.props.handleOk} onCancel={this.props.close} okText="Update">
                            <label>Tên detailJob:</label>
                            <Input value={this.props.detailJobName} name="name" onChange={this.props.onDataInputChange} />
                            <label>Trang thai:</label>
                            <Select
                                // showSearch
                                style={{ width: "250px" }}

                                labelInValue
                                popupClassName="trang thai"
                                placeholder="Select a person"
                                optionFilterProp="children"
                                onChange={onChange}
                                options={this.props.dataStatus}
                                value={this.props.defaultStatus}
                            />
                        </Modal>
                    );
                break;
                }
        }
        return (
            <div>
                {content}

            </div>
        )
    }
}