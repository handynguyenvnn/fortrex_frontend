import React, { useState } from "react";
import ProfileForm from "./ProfileForm";
import { Tabs } from "antd";
import Security from "./Security";

import "./index.scss";

const { TabPane } = Tabs;

const Profile = ({
  Form,
  form,
  userName,
  email,
  fullName,
  handleUpdateProfile,
  loading,
  isShow2FA,
  confirm2FA,
}) => {
  return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <div className="profile-form w1200">
            <ProfileForm
              Form={Form}
              form={form}
              userName={userName}
              email={email}
              fullName={fullName}
              handleUpdateProfile={handleUpdateProfile}
              loading={loading}
            />
          </div>
        </TabPane>
        <TabPane tab="Security" key="2">
          <div className="security">
            <Security email={email} isShow2FA={isShow2FA} />
          </div>
        </TabPane>
      </Tabs>
  );
};

export default Profile;
