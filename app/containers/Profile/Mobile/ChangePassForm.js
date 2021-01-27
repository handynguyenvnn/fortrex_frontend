import React, { useState, useCallback, useEffect } from "react";
import { changePass, updateProfile } from "services";
import { Form, Input, Typography, Modal, PageHeader, Button } from "antd";
import ChangePassSuccess from "./ChangePassSuccess";

const { Text } = Typography;

const ChangePassForm = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);

  const handleChangePass = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const params = {
        PassOld: values.currentPass,
        PassNew: values.newPass,
        PassNewRe: values.confirmPass,
      };
      changePass({ params })
        .then((res) => {
          if (res && res.data.StatusCode === 401) {
            openNotificationWithIcon("error", "Notification", res.data.Meg);
          } else if (res && res.data.StatusCode === 200) {
            openNotificationWithIcon("success", "Notification", "Success!");
          } else if (res && res.data.StatusCode === 400) {
            openNotificationWithIcon("success", "Notification", "Fail!");
          }
        })
        .catch()
        .finally(() => {
          setIsSuccessVisible(true);
          setLoading(false);
        });
    } catch (errorInfo) {}
  };

  // const handleSuccessOpen = useCallback(() => {
  //   setIsSuccessVisible(true);
  // }, []);

  const handleSuccessClose = useCallback(() => {
    setIsSuccessVisible(false);
    form.resetFields();
  }, [form]);

  const handleClose = useCallback(()=>{
    if(onClose){
      onClose();
    }
    form.resetFields()
  },[form, onClose])

  return (
    <>
     <Modal
        title={null}
        visible={visible}
        footer={null}
        closable={false}
        className="changepass-modal"
      >
        <div className="changepass-modal-content">
          <PageHeader
            className="changepass-modal-header"
            onBack={handleClose}
            title="Change password"
            extra={[
              <Text onClick={handleClose} type="danger">
                Cancel
              </Text>,
            ]}
          />
          <p className="changepass-modal-subtitle">
            The password must contain at least 8 characters including letters
            and numbers.
          </p>
          <div className="profile-form_wrap">
            <Form form={form} name="basic">
              <Form.Item
                name="currentPass"
                rules={[
                  { required: true, message: "Please input your current password!" },
                ]}
              >
                <Input.Password
                  className="profile-form_inputpass"
                  placeholder="Current password"
                />
              </Form.Item>

              <Form.Item
                name="newPass"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input.Password
                  className="profile-form_inputpass"
                  placeholder="New password"
                />
              </Form.Item>

              <Form.Item
                name="confirmPass"
                rules={[
                  {
                    required: true,
                    message: "Please input your confirm password!",
                  },
                ]}
              >
                <Input.Password
                  className="profile-form_inputpass"
                  placeholder="Confirm new password"
                />
              </Form.Item>

              <Form.Item
                name="code"
                className="mb-fixed"
                rules={[{ required: true, message: "Please input your user!" }]}
              >
                <Input className="profile-form_input" placeholder="2FA code" />
              </Form.Item>
            </Form>
          </div>
          <Button
            className="changepass-submit_btn"
            disabled={loading}
            onClick={handleChangePass}
          >
            Change password
          </Button>
        </div>
      </Modal>
      <ChangePassSuccess
        visible={isSuccessVisible}
        onClose={handleSuccessClose}
      />
    </>
  );
};

export default ChangePassForm;
