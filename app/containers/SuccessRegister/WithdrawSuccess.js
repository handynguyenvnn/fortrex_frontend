import React from 'react';
import { Modal} from "antd";
import imgSuccess from '../../components/assets/images/success.svg';

const WidthDrawSuccess = ({ visible, setVisible, message })  => {
  return (
    <Modal
      centered
      width={400}
      footer={null}
      visible={visible}
      closable={false}
      onCancel={() => setVisible(false)}
      okText={'OK'}
    >

      <h1 style={{color:"white", fontSize:30}} className="title">{message}</h1>
      <p className="title-sub">Thank you for joining with us!</p>
      <div className="img">
        <img width={120} src={imgSuccess} />
      </div>
    </Modal>
  );
};
export default WidthDrawSuccess;
