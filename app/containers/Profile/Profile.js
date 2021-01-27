import React, { useEffect, useState } from "react";
import { useMedia } from "hooks/useMedia";
import { _getCookie } from "components/common/helpers";
import { getTowFACode, updateProfile } from "services";
import useKeypress, { openNotificationWithIcon } from "utils/utils";
import { Form } from "antd";
import Web from "./Web";
import Mobile from "./Mobile";
import "./style.scss";
import { useTradingStore } from "store";

const Profile = () => {
  const { isDesktopOrLaptop, isTabletOrMobile } = useMedia();

  const userName = _getCookie("username");
  const email = _getCookie("email");
  const fullName = _getCookie("fullName");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [towFAVisible, setTowFAVisible] = useState(false);
  const [tradingStore, updateTradingStore] = useTradingStore();
  const [isShow2FA, setIsShow2FA] = useState(false);

  const changePassword = () => {
    setChangePasswordVisible(true);
  };

  const confirm2FA = () => {
    setTowFAVisible(true);
  };

  const handleUpdateProfile = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const params = {
        Phone: values.phone,
        FullName: values.fullName,
        CodeDigit: 8888,
      };
      updateProfile({ params })
        .then((res) => {
          if (res && res.data.StatusCode === 401) {
            openNotificationWithIcon("error", "Notify", res.data.Meg);
            return;
          }
          if (res && res.data.StatusCode === 200) {
            openNotificationWithIcon("success", "Notify", "Success!");
          }
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    } catch (errorInfo) {}
  };

  useKeypress("Enter", () => {
    handleUpdateProfile().then();
  });

  const get2FACode = () => {
    try {
      getTowFACode()
        .then((res) => {
          if (res && res.data && res.data.Reply) {
            if (res.data.Reply.IsEnable) {
              setIsShow2FA(res.data.Reply.IsEnable);
              updateTradingStore((draft) => {
                draft.isShow2FA = true;
              });
            }
          }
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    } catch (errorInfo) {}
  };

  useEffect(() => {
    get2FACode();
  }, []);

  useEffect(() => {
    if (tradingStore.isShow2FA) {
      setIsShow2FA(true);
    }
  }, [tradingStore.isShow2FA]);

  useEffect(() => {
    setLoading(false);
  }, [isShow2FA]);

  return (
    <div>
      {isDesktopOrLaptop && (
        <Web
          Form={Form}
          form={form}
          towFAVisible={towFAVisible}
          setTowFAVisible={setTowFAVisible}
          changePassword={changePassword}
          changePasswordVisible={changePasswordVisible}
          setChangePasswordVisible={setChangePasswordVisible}
          userName={userName}
          email={email}
          fullName={fullName}
          handleUpdateProfile={handleUpdateProfile}
          loading={loading}
          isShow2FA={isShow2FA}
          confirm2FA={confirm2FA}
        />
      )}
      {isTabletOrMobile && (
        <Mobile
          Form={Form}
          form={form}
          towFAVisible={towFAVisible}
          setTowFAVisible={setTowFAVisible}
          userName={userName}
          email={email}
          fullName={fullName}
          handleUpdateProfile={handleUpdateProfile}
          loading={loading}
          isShow2FA={isShow2FA}
          confirm2FA={confirm2FA}
        />
      )}
    </div>
  );
};
export default Profile;