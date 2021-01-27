import React, { useState, useEffect, useCallback } from "react";
import { Form, Typography, Modal, PageHeader, Button, Input } from "antd";
import { getTowFACode, update2FA} from "services";
import { openNotificationWithIcon } from "utils/utils";
import TFARemoveSuccess from "./TFARemoveSucces";

import 'react-toastify/dist/ReactToastify.css';

const { Text } = Typography;

const TFARemoveForm = ({ visible, onClose, callback }) => {
  const [form] = Form.useForm();
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [userUniqueKey,setUserUniqueKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeDigit, setCodeDigit] = useState('');

  const handleSuccessOpen = useCallback(() => {
    setIsSuccessVisible(true);
  }, [form]);

  const handleRemove2FA = async () => {
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
            onClose();
            openNotificationWithIcon("error", "Notify", res.data.Meg);
          } else if (res && res.data.StatusCode === 200) {
            handleSuccessOpen();
            updateTradingStore((draft) => {
              draft.isShow2FA = false;
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

  const handleSuccessClose = useCallback(() => {
    if (callback) {
      callback();
    }
    setIsSuccessVisible(false);
  }, [callback]);

  const handleClose = useCallback(()=>{
    if(onClose) {
      onClose();
    }
    form.resetFields()
  },[form, onClose])

  const get2FACode = () => {
    try {
      getTowFACode()
        .then(res => {
          if (res && res.data && res.data.Reply) {
            setUserUniqueKey(res.data.Reply.UserUniqueKey);
          }
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    } catch (errorInfo) {
    }

  }

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
        className="rmtfa-modal"
      >
        <div className="rmtfa-modal-content">
          <PageHeader
            className="rmtfa-modal-header"
            onBack={handleClose}
            title="Remove 2FA"
            extra={[
              <Text onClick={handleClose} type="danger">
                Cancel
              </Text>,
            ]}
          />
          <p className="rmtfa-modal-subtitle">
            Please confirm your email and 2FA code to remove 2FA
          </p>
          <div className="profile-form_wrap">
            <Form form={form} name="basic">
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  className="profile-form_input"
                  placeholder="Email registered"
                />
              </Form.Item>

              <Form.Item
                name="code"
                className="mb-fixed"
                rules={[{ required: true, message: "Please input your user!" }]}
              >
                <Input className="profile-form_input" placeholder="2FA code" value={codeDigit} onChange={ (e) => {setCodeDigit(e.target.value)}} />
              </Form.Item>
            </Form>
          </div>
          <Button className="rmtfa-submit_btn" onClick={handleRemove2FA}>
            Remove 2FA
          </Button>
        </div>
      </Modal>
      <TFARemoveSuccess
        visible={isSuccessVisible}
        onClose={handleSuccessClose}
      />
    </>
  );
};

export default TFARemoveForm;
