import React from "react";
import { Input, Button, Typography } from "antd";

const { Title } = Typography;

import "./index.scss";

const ProfileForm = ({
  Form,
  form,
  userName,
  fullName,
  email,
  loading,
  handleUpdateProfile,
}) => {
  return (
      <div className="profile-form_wrap">
        <Form form={form} name="basic">
          <Title className="profile-form_title">Profile information</Title>
          <Form.Item
            name="userName"
            initialValue={userName}
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input className="profile-form_input" placeholder="Full name" />
          </Form.Item>

          <Form.Item
            name="email"
            initialValue={email}
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input className="profile-form_input" placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="fullName"
            initialValue={fullName}
            rules={[{ required: true, message: "Please input your user!" }]}
          >
            <Input className="profile-form_input" placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please input your phonenumber!" },
            ]}
          >
            <Input className="profile-form_input" placeholder="Phone Number" />
          </Form.Item>

          <Form.Item className="customFormItem">
            <Button
              className="profile-form_submit"
              type="primary"
              onClick={handleUpdateProfile}
              disabled={loading}
            >
              SAVE
            </Button>
          </Form.Item>
        </Form>
      </div>
  );
};

export default ProfileForm;
