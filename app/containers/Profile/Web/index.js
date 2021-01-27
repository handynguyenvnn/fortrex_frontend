import React, {useEffect} from "react";
import TowFAComponent from "components/Modal/TowFAComponent";
import ChangePassword from "components/Modal/ChangePassword";
import { Switch, Button } from "antd";

const Web = ({
  Form,
  form,
  towFAVisible,
  setTowFAVisible,
  changePassword,
  changePasswordVisible,
  setChangePasswordVisible,
  userName,
  email,
  fullName,
  handleUpdateProfile,
  loading,
  isShow2FA,
  confirm2FA,
}) => {
  return (
    <div>
      <TowFAComponent visible={towFAVisible} setVisible={setTowFAVisible} />
      <ChangePassword
        visible={changePasswordVisible}
        setVisible={setChangePasswordVisible}
      />
      <div>
        <div className="contact-form">
          <div className="box-form">
            <h3 className="title">Profile information</h3>
            <Form form={form} name="dynamic_rule">
              <div className="row">
                <Form.Item name="userName">
                  <input
                    type="text"
                    name="userName"
                    placeholder="Enter full user name"
                    defaultValue={userName}
                    disabled
                  />
                </Form.Item>
              </div>
              <div className="row">
                <Form.Item name="email">
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    defaultValue={email}
                    disabled
                  />
                </Form.Item>
              </div>
              <div className="row">
                <Form.Item
                  name="fullName"
                  rules={[
                    { required: true, message: "Please input your full name!" },
                  ]}
                >
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter full name"
                    defaultValue={fullName}
                  />
                </Form.Item>
              </div>
              <div className="row">
                <Form.Item name="phone">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter full phone number"
                  />
                </Form.Item>
              </div>
              <Button
                className={`btn success ${loading ? "disabled" : ""}`}
                name="submit"
                onClick={handleUpdateProfile}
                disabled={loading}
              >
                SAVE
              </Button>
            </Form>
          </div>
        </div>
        <div className="security-form">
          <div className="box-form">
            <h3 style={{ color: "#fff" }} className="title">
              Security
            </h3>
            <div className="box-security">
              <div className="change-secu">
                <a onClick={changePassword}>Change Password</a>
              </div>
              <div className="change-secu">
                <h4 style={{ color: "#fff", font: 14 }} className="title txt">
                  Email verification
                  <span className="right-inline">{email}</span>
                </h4>
                <p className="desc">
                  For login, withdrawals, password retrieval, change of security
                  settings
                </p>
              </div>
              <div className="change-secu">
                <h4 style={{ color: "#fff", font: 14 }} className="title txt">
                  Google Authenticator
                  <Switch
                    style={{ position: "absolute", left: "50%" }}
                    checked={isShow2FA}
                    onChange={confirm2FA}
                  />
                </h4>
                <br />
                <p className="desc">
                  For login, withdrawals, password retrieval, change of security
                  settings
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Web;
