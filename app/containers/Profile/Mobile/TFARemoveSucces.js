import React from "react";
import { Typography, Modal, Button, Image } from "antd";
import KeyOpen from 'components/assets/images/key_open.png'

const { Title } = Typography;

const TFARemoveSuccess = ({ visible, onClose }) => {
  return (
    <Modal title={null} visible={visible} footer={null} closable={false}>
      <div className="changepass-success_wrap">
        <Title className="changepass-success_title">Success</Title>
        <Title className="changepass-success_subtitle">
          2FA has been removed!
        </Title>
        <div className="changepass-success_svg">
          <Image src={KeyOpen} />
        </div>
        <Title className="changepass-success_subtitle">
          The system removed 2FA from your account.
        </Title>
        <Button onClick={onClose} className="changepass-success_btn">
          OK
        </Button>
      </div>
    </Modal>
  );
};

export default TFARemoveSuccess;
