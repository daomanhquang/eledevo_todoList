import { notification } from 'antd';
import { Isremote } from "../constant/JobConstant"

const openNotification = (type) => {
  console.log("type:", type);

  switch (type) {
    case Isremote.IsCreate:
      {
        notification.success({
          message: `Thêm thành công`,
          duration: 1,
          description:
            "Thông báo thêm thành công",
          placement: "topRight"
        });
        break
      }
    case Isremote.IsUpdate:
      {
        notification.info({
          message: `Cập nhật thành công`,
          duration: 1,
          description:
            "Thông báo cập nhật thành công",
          placement: "topRight"
        });
        break
      }
    case Isremote.IsDelete:
      {
        notification.error({
          message: `Xóa thành công`,
          duration: 1,
          description:
            "Thông báo xóa thành công",
          placement: "topRight"
        });
        break
      }
  }


};
export {
  openNotification
}