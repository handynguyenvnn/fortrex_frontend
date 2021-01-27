import React, {useState} from 'react';
import {Button, Form, Modal} from 'antd';
import './styles.scss';
import './changePass.scss';
import {changePass, updateProfile} from "services";
import useKeypress, {openNotificationWithIcon} from "utils/utils";
import {history} from "../../utils";
import {PAGE_PATHS} from "constants/constant";
import StopDownUpModal from "components/Modal/StopDownUpModal";

const ChangePassword = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

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
        .then(res => {
          if (res && res.data.StatusCode === 401) {
            openNotificationWithIcon('error', 'Notification', res.data.Meg);
          } else if (res && res.data.StatusCode === 200) {
            openNotificationWithIcon('success', 'Notification', 'Success!');
            setVisibleModal(true);
          } else if(res && res.data.StatusCode === 400){
            openNotificationWithIcon('error', 'Notification', 'Fail!');
          }
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    } catch (errorInfo) {
    }
  }
  useKeypress('Enter', () => {
    handleChangePass().then();
  });

  return (
    <div>
      <StopDownUpModal
        visible={visibleModal}
        setVisible={setVisibleModal}
      />
      <Modal
        centered
        width={0}
        footer={null}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <div className="popup modal">
          <div className="inner-profile">
            <h3 className="title-profile">CHANGE PASSWORD</h3>
            <p className="desc">
              Password should be 8 characters include text, number
            </p>
            <div className="box-input">
              <Form form={form} name="dynamic_rule">
                <div className="row">
                  <Form.Item name="currentPass" maxLength="8" rules={[{ required: true, message: 'Please input your Current Password!' }]}>
                    <input type="password" name="currentPass" placeholder="Current Password" />
                  </Form.Item>
                </div>
                <div className="row">
                  <Form.Item name="newPass" maxLength="8" rules={[{ required: true, message: 'Please input your New Password!' }]}>
                    <input type="password" name="newPass" placeholder="New Password" />
                  </Form.Item>
                </div>
                <div className="row">
                  <Form.Item name="confirmPass" maxLength="8" rules={[{ required: true, message: 'Please input your Confirm new password!' }]}>
                    <input type="password" name="confirmPass" placeholder="Confirm new password" />
                  </Form.Item>
                </div>
                <div className="row">

                </div>
                <Button
                  className={`btn success ${loading ? 'disabled' : ''}`}
                  name="submit"
                  onClick={() => handleChangePass()}
                  disabled={loading}
                >
                  SAVE
                </Button>

              </Form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChangePassword;
