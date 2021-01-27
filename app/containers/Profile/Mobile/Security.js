import React, { useState, useCallback, useEffect } from "react";
import { Typography } from "antd";
import ChangePassForm from "./ChangePassForm";
import TFAForm from "./TFAForm";
import TFARemoveForm from "./TFARemoveForm";

const { Title } = Typography;

const Security = ({ email, isShow2FA }) => {
  const [isTFAVisible, setIsTFAVisible] = useState(false);
  const [isTFARemoveVisible, setIsTFARemoveVisible] = useState(false);
  const [isPassFormVisible, setIsPassFormVisible] = useState(false);
  const [gAuthEnable, setGAuthEnable] = useState(isShow2FA);

  //enable TFA
  const handleTFAOpen = useCallback(() => {
    setIsTFAVisible(true);
  }, []);

  const handleTFAClose = useCallback(() => {
    setIsTFAVisible(false);
  }, []);

  const handleTFAEnable = useCallback(() => {
    setGAuthEnable(true);
    setIsTFAVisible(false);
  }, []);

  //disable TFA
  const handleRemoveTFAOpen = useCallback(() => {
    setIsTFARemoveVisible(true);
  }, []);

  const handleTFARemoveClose = useCallback(() => {
    setIsTFARemoveVisible(false);
  }, []);

  const handleTFADisable = useCallback(() => {
    setGAuthEnable(false);
    setIsTFARemoveVisible(false);
  }, []);

  //change pass form
  const handlePassFormOpen = useCallback(() => {
    setIsPassFormVisible(true);
  }, []);

  const handlePassFormClose = useCallback(() => {
    setIsPassFormVisible(false);
  }, []);

  return (
    <div className="security_wrap">
      <div className="security-item">
        <Title className="security_title">Security</Title>
        <p className="security_changepass" onClick={handlePassFormOpen}>
          Change password
        </p>
      </div>
      <div className="security-item">
        <Title className="security_subtitle">Email verification</Title>
        <p className="security_smallquote">
          For login, withdrawals, password retrieval, change of security
          settings
        </p>
        <p className="security_email">{email}</p>
      </div>
      <div
        className="security-item"
        style={{ border: "none", marginBottom: 0 }}
      >
        <div className="security-authenticator_wrap">
          <Title className="security_subtitle">Google Authenticator</Title>
          {!gAuthEnable ? (
            <span
              className="security-gauth_enable security-gauth_control"
              onClick={handleTFAOpen}
            >
              Enable
            </span>
          ) : (
            <span
              className="security-gauth_disable security-gauth_control"
              onClick={handleRemoveTFAOpen}
            >
              Disable
            </span>
          )}
        </div>
        <p className="security_smallquote mb-fixed">
          For login, withdrawals, password retrieval, change of security
          settings
        </p>
      </div>
      <ChangePassForm
        visible={isPassFormVisible}
        onClose={handlePassFormClose}
      />
      <TFAForm
        visible={isTFAVisible}
        onClose={handleTFAClose}
        callback={handleTFAEnable}
      />
      <TFARemoveForm
        visible={isTFARemoveVisible}
        onClose={handleTFARemoveClose}
        callback={handleTFADisable}
      />
    </div>
  );
};

export default Security;
