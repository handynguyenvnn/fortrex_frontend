import React, { useState, useEffect, useCallback } from "react";
import { Image, Typography, Modal, PageHeader, Button, Input } from "antd";
import { getTowFACode, update2FA} from "services";
import { openNotificationWithIcon } from "utils/utils";
import TFASuccess from "./TFASuccess";
import IosImage from 'components/assets/images/ios.png';
import AndroidImage from 'components/assets/images/androi.png';
import { CopyToClipboard } from "react-copy-to-clipboard";

import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

const { Title } = Typography;

const TFAForm = ({ visible, onClose, callback }) => {
  const [loading, setLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [barCode, setBarCode] = useState('');
  const [userUniqueKey,setUserUniqueKey] = useState('');
  const [codeDigit, setCodeDigit] = useState('');
  const [barCodeImage, setBarCodeImage] = useState('');
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const handleSuccessOpen = useCallback(() => {
    setIsSuccessVisible(true);
  }, []);

  const handleSuccessClose = useCallback(() => {
    if (callback) {
      callback();
    }
    setCodeDigit('');
    setIsSuccessVisible(false);
  }, [callback]);

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
          console.log(res,'res-here')
          if (res && res.data.StatusCode === 401) {
            onClose();
            openNotificationWithIcon("error", "Notify", res.data.Meg);
          } else if (res && res.data.StatusCode === 200) {
            handleSuccessOpen();
            updateTradingStore((draft) => {
              draft.isShow2FA = true;
            });
            openNotificationWithIcon("success", "Notify", "Success!");
          } else if (res && res.data.StatusCode === 400) {
            onClose();
            openNotificationWithIcon("error", "Notify", "Failure!");
          }
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    } catch (errorInfo) {}
  };

  const get2FACode = () => {
    try {
      getTowFACode()
        .then(res => {
          if (res && res.data && res.data.Reply) {
            setBarCode(res.data.Reply.SetupCode);
            setUserUniqueKey(res.data.Reply.UserUniqueKey);
            setBarCodeImage(res.data.Reply.BarcodeImageUrl)
          }
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    } catch (errorInfo) {
    }

  }

  const handleClose = useCallback(()=>{
    if(onClose){
      onClose();
    }
    setCodeDigit('');
  },[onClose])

useEffect( () => {
  get2FACode();
}, [])

  return (
    <>
      <Modal
        title={null}
        visible={visible}
        footer={null}
        closable={false}
        className="tfa-modal"
      >
        <div className="tfa-modal-content">
          <PageHeader
            className="tfa-modal-header"
            onBack={handleClose}
            title="How to enable Two-Factor Authentication (2FA)"
          />
          <div className="tfa-form_wrap">
            <Title className="tfa-form_title">
              Download Google Authenticator on your mobile device
            </Title>
            <Title className="tfa-form_subtitle">
              iOS users can log into App Store and search “Authenticator” to
              download. Android users can log into Google Play or search “Google
              Authenticator” in your mobile browser to download
            </Title>
            <div className="tfa-form-btn_group">
              <Image src={IosImage} />
              <Image src={AndroidImage} />
            </div>
          </div>
          <div className="tfa-form_wrap">
            <Title className="tfa-form_title">
              Use Google Authenticator to scan the QR code
            </Title>
            <Title className="tfa-form_subtitle">
              Open GA and scan the QR code below or enter the key to add a
              token.
            </Title>
            <div className="tfa-form-qr">
              <Image src={barCodeImage} />
            </div>
            <div className="tfa-security-key">
              <Title className="tfa-key_title">Security key</Title>
              <Title className="tfa-key_subtitle">
                This key is used to retrieve your GA when you change or lose
                your phone. Please save and back up the key before binding GA.
              </Title>
              <div class="copy-wrap">
                <Input
                  value={barCode}
                  size="large"
                  className="copy-input"
                  addonAfter={<CopyToClipboard
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
                    <span>COPY</span>
                  </CopyToClipboard>}
                  placeholder="ABCD12345"
                />
              </div>
            </div>
          </div>
          <div className="tfa-form_wrap">
            <Title className="tfa-form_title">
              Enter the 6-digit verification code in your GA
            </Title>
            <Input
              className="tfa-form_input"
              value={codeDigit} onChange={ (e) => {setCodeDigit(e.target.value)}}
              placeholder="Verification code"
            />
            <Button className="tfa-submit_btn" onClick={handleEnable2FA}>
              Enable
            </Button>
          </div>
        </div>
      </Modal>
      <TFASuccess visible={isSuccessVisible} onClose={handleSuccessClose} />
      <ToastContainer />
    </>
  );
};

export default TFAForm;
