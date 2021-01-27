import React from "react";
import { Typography, Modal, Button, Image } from "antd";
import KeyLock from "components/assets/images/key_lock.png";

const { Title } = Typography;

const ChangePassSuccess = ({ visible, onClose }) => {
  return (
    <Modal title={null} visible={visible} footer={null} closable={false}>
      <div className="changepass-success_wrap">
        <Title className="changepass-success_title">Success</Title>
        <Title className="changepass-success_subtitle">
          Your password has been changed successfully!
        </Title>
        <div className="changepass-success_svg">
          <Image src={KeyLock} />
        </div>
        <Title className="changepass-success_subtitle">
          You can now use your new password to log in your account.
        </Title>
        <Button onClick={onClose} className="changepass-success_btn">
          OK
        </Button>
      </div>
    </Modal>
  );
};

export default ChangePassSuccess;
