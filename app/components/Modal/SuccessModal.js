import React from 'react';
import { Modal } from 'antd';
import './styles.scss';

const SuccessModal = ({ visible, setVisible, message }) => {
  const handleCloseModal = () => {
    setVisible(false);
  };
  return (
    <div>
      <Modal
        destroyOnClose
        centered
        width={0}
        footer={null}
        visible={visible}
        closable={false}
        onCancel={() => setVisible(false)}
      >
        <div className="popup modal">
          <div className="inner-wallet">
            <div className="table-sucsess">
              <div className="box-img">
                <svg width="164" height="164" viewBox="0 0 164 164" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M98 -32C43.9606 -32 0 11.9606 0 66C0 120.039 43.9606 164 98 164C152.039 164 196 120.039 196 66C196 11.9606 152.039 -32 98 -32Z"
                        fill="#22D291" />
                  <path
                    d="M143.673 45.3119L90.5889 98.3942C88.9963 99.9868 86.9058 100.788 84.8153 100.788C82.7248 100.788 80.6343 99.9868 79.0417 98.3942L52.5005 71.8531C49.3065 68.6605 49.3065 63.4985 52.5005 60.3059C55.6931 57.1118 60.8536 57.1118 64.0477 60.3059L84.8153 81.0735L132.126 33.7647C135.318 30.5706 140.479 30.5706 143.673 33.7647C146.865 36.9573 146.865 42.1178 143.673 45.3119Z"
                    fill="#FAFAFA" />
                </svg>

              </div>
              <h2 className="title">
                Successful
              </h2>
              <p className="desc">
                {message}
              </p>
              <a onClick={handleCloseModal} className="btn-1 btn-save bg-green">OK</a>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default SuccessModal;
