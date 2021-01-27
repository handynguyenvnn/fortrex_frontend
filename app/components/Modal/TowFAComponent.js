import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "antd";
import "./styles.scss";
import "./changePass.scss";
import { changePass, getTowFACode, update2FA, updateProfile } from "services";
import { openNotificationWithIcon } from "utils/utils";
import { useTradingStore } from "store";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import imgIos from "../assets/images/ios.png";
import imgAndroid from "../assets/images/androi.png";

import 'react-toastify/dist/ReactToastify.css';

const TowFAComponent = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [barCode, setBarCode] = useState("");
  const [userUniqueKey, setUserUniqueKey] = useState("");
  const [codeDigit, setCodeDigit] = useState("");
  const [barCodeImage, setBarCodeImage] = useState("");
  const [, updateTradingStore] = useTradingStore();
  const [isShow2FA, setIsShow2FA] = useState(false);

  const closeModel = async () => {
    visible=false;
    setVisible(false);
  };
  const handleEnable2FA = async () => {
    try {
      setLoading(true);
      const params = {
        UserUniqueKey: userUniqueKey,
        SetupCode: barCode,
        CodeDigit: codeDigit,
      };
      update2FA({ params })
        .then((res) => {
          if (res && res.data.StatusCode === 401) {
            openNotificationWithIcon("error", "Notify", res.data.Meg);
          } else if (res && res.data.StatusCode === 200) {
            setVisibleModal(false);
            updateTradingStore((draft) => {
              draft.isShow2FA = true;
            });
            openNotificationWithIcon("success", "Notify", "Success!");
          } else if (res && res.data.StatusCode === 400) {
            openNotificationWithIcon("error", "Notify", "Failure!");
          }
        })
        .catch()
        .finally(() => {
          setVisibleModal(true);
          setLoading(false);
        });
    } catch (errorInfo) {}
  };

  const handleDisable2FA = async () => {
    try {
      setLoading(true);
      const params = {
        UserUniqueKey: userUniqueKey,
        SetupCode: '',
        CodeDigit: codeDigit,
      };
      update2FA({ params })
        .then((res) => {
          if (res && res.data.StatusCode === 401) {
            openNotificationWithIcon("error", "Notify", res.data.Meg);
          } else if (res && res.data.StatusCode === 200) {
            setVisibleModal(false);
            updateTradingStore((draft) => {
              draft.isShow2FA = false;
            });
            openNotificationWithIcon("success", "Notify", "Success!");
          } else if (res && res.data.StatusCode === 400) {
            openNotificationWithIcon("error", "Notify", "Failure!");
          }
        })
        .catch()
        .finally(() => {
          setVisibleModal(true);
          setLoading(false);
        });
    } catch (errorInfo) {}
  };

  const get2FACode = () => {
    try {
      getTowFACode()
        .then((res) => {
          if (res && res.data && res.data.Reply) {
            setIsShow2FA(res.data.Reply.IsEnable);
            setBarCode(res.data.Reply.SetupCode);
            setUserUniqueKey(res.data.Reply.UserUniqueKey);
            setBarCodeImage(res.data.Reply.BarcodeImageUrl);
          }
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    } catch (errorInfo) {}
  };

  useEffect(() => {
    console.log(isShow2FA);
    get2FACode();
  }, [isShow2FA]);

  return (
    <div className="towFAcomponent">
      <Modal
        centered
        width={800}
        footer={null}
        visible={visible}
        onCancel={() => setVisible(false)}
        closable={true}
        okText={"OK"}
      >
        <div className="popup modal">
        <div className="card-top">
          <div className="qr-code">
            <div  className="box-title w-full" style={{display: 'inline-block'}}>
            <h3 className="title-qr" style={{float: 'left'}}>How to enable Two-Factor Authentication (2FA)</h3>
            <div className='close-modle'>
              <a  onClick={() => closeModel()}>
              <svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
              </a>

            </div>
            </div>
              <div className="box-app-qr">
                <h3 className="title-app-qr">
                  Download Google Authenticator on your mobile device
                </h3>
                <p className="drep-app-qr">
                  iOS users can log into App Store and search “Authenticator” to
                  download. Android users can log into Google Play or search
                  “Google Authenticator” in your mobile browser to download
                </p>
                <div className="group-thum-app">
                  <p className="thum-app-qrcode">
                    <a href="/">
                      <img src={imgIos} alt="" />
                    </a>
                  </p>
                  <p className="thum-app-qrcode">
                    <a href="/">
                      <img src={imgAndroid} alt="" />
                    </a>
                  </p>
                </div>
              </div>
              <div className="box-down-qr">
                <div className="contemt-box-down">
                  <h3 className="title-app-qr">
                    Use Google Authenticator to scan the QR code
                  </h3>
                  <p className="drep-app-qr">
                    Open GA and scan the QR code below or enter the key to add a
                    token.
                  </p>
                  <p className="key-down">Security key</p>
                  <p className="drep-key-down">
                    This key is used to retrieve your GA when you change or lose
                    your phone. Please save and back up the key before binding
                    GA.
                  </p>
                  <div className="group-out-qrcode">
                    <input type="text" value={barCode} placeholder="ABCD1234" />
                    <CopyToClipboard
                      text={barCode}
                      onCopy={() =>
                        toast.info("Copied!", {
                          position: "bottom-center",
                          autoClose: 1500,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        })
                      }
                    >
                      <button style={{ width: 100 }}>COPY</button>
                    </CopyToClipboard>
                  </div>
                </div>
                <div className="thum-box-down">
                  <p className="thum-down">
                    <img src={barCodeImage} />
                  </p>
                </div>
              </div>
              <div className="box-enable-qrcode">
                <h3 className="title-app-qr">
                  Enter the 6-digit verification code in your GA
                </h3>
                <div className="out-enable-qrcode">
                  <input
                    type="text"
                    value={codeDigit}
                    onChange={(e) => {
                      setCodeDigit(e.target.value);
                    }}
                    placeholder="123456"
                  />
                </div>
                {isShow2FA ? (
                  <button
                  className="btn-disable-app"
                  onClick={() => handleDisable2FA()}
                >
                  Remove 2FA
                </button>
                ) : (
                  <button
                  className="btn-enable-app"
                  onClick={() => handleEnable2FA()}
                >
                  ENABLE
                </button>
                )}
              </div>
          </div>
        </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default TowFAComponent;
