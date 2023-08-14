import React from "react";
import StatusContainer from "../container/StatusContainer";
import { UserOutlined } from '@ant-design/icons';
import { Button ,Avatar} from "antd";

class StatusManage extends React.Component {
    render() {
        return (
            <div style={{ display: "flex" }}>
                <div style={{
                    width: "15%", backgroundColor: "aqua", display: "flex",
                    flexDirection: "column", alignItems: "center",
                    position: "relative"
                }}>

                    <div className='avata'>
                        <Avatar shape="square" size={100} icon={<UserOutlined />} />
                    </div>
                    <span>Quang Peach</span>
                    <Button style={{ margin: "5px 0" }}>
                        <a href="/">Quan ly cong viec</a>
                    </Button>
                    <Button>
                        <a href="/statusmanage">Quan ly trang thai</a>
                    </Button>
                    <span style={{
                        position: "absolute", bottom: "60px",
                        textDecoration: "underline", right: "20px"
                    }}>
                        By: Quang Peach
                    </span>

                </div>
                <div style={{
                    display: "flex", justifyContent: "center", height: "100vh",
                    width: "80%"  }}>
                    <div style={{width:"100%"}}>
                        <StatusContainer />
                    </div>
                </div>
            </div>
        )
    }
}
export default StatusManage