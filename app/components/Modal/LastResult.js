import React, {useEffect, useState} from 'react';
import { Modal } from 'antd';
import {getLastResult} from "services";
import './styles.scss';

const LastResultModal = ({ visible, setVisible, message }) => {
  const [up, setUp] = useState(0);
  const [down, setDown] = useState(0);
  const [hoursAgo, setHoursAgo] = useState(0);
  const [minAgo, setMinAgo] = useState(0);
  const handleCloseModal = () => {
    setVisible(false);
  };
  const getResultLast = () => {
    try {
      getLastResult()
        .then(res => {
          if (res && res.data.StatusCode === 200) {
            let countUp=0;
            let countDown=0;
            res.data.Reply.forEach(item => {
              if (item==1) {
                countDown+=1;
              }else if (item==2) {
                countUp +=1;
              }
            });
            setUp(countUp);
            setDown(countDown);
            // setDown(res.data.Reply._Down);
            // setUp(res.data.Reply._Up);
            // setHoursAgo(res.data.Reply._1HourAgo);
            // setMinAgo(res.data.Reply._1HourAgo);
          }
        })
        .catch()
        .finally(() => {
        });
    } catch{
    }
  }
  useEffect(() => {
    getResultLast();
  }, []);
  return (
    <div>
      <Modal
        destroyOnClose
        centered
        footer={null}
        visible={visible}
        closable={false}
        onCancel={() => setVisible(false)}
      >

        <div className="popup mobile-trading">
          <div className="inner-wallet">
            <div className="btn-close" onClick={handleCloseModal}>
              <a href="#">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289Z"
                    fill="#4D5072"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                    fill="#4D5072"
                  />
                </svg>
              </a>
            </div>
            <div className="results">
              <h3 className="title">Last 100 results</h3>
              <h3 className="ttl">
                Up<span className="up">{up}</span><span className="line">|</span
              ><span className="down">{down}</span>Down
              </h3>
              <ul className="count">
                <li className="bg1"></li>
                <li className="bg1"></li>
                <li className="bg1"></li>
                <li className="bg1"></li>
                <li className="bg2"></li>
                <li className="bg2"></li>
                <li className="bg2"></li>
                <li className="bg2"></li>
                <li className="bg2"></li>
                <li className="bg2"></li>
              </ul>
              <h3 className="title">Last seen sequence</h3>
              <h3 className="ttl2">{hoursAgo} hour ago</h3>
              <ul className="number">
                <li className="bg1">x5</li>
                <li className="bg1"></li>
                <li className="bg1"></li>
                <li className="bg1"></li>
                <li className="bg1"></li>
                <li className="bg2"></li>
              </ul>
              <h3 className="ttl2 mt17">{minAgo} mins ago</h3>
              <ul className="number">
                <li className="bg1">x5</li>
                <li className="bg1"></li>
                <li className="bg1"></li>
                <li className="bg1"></li>
                <li className="bg1"></li>
                <li className="bg3"></li>
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default LastResultModal;
