import React, { useState, useCallback, useEffect } from "react";
import { changePass, updateProfile } from "services";
import {
  Form,
  Input,
  Typography,
  Modal,
  PageHeader,
  Button,
  DatePicker,
  Select,
} from "antd";

const { Text } = Typography;

import './index.scss';

const Filter = ({ visible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // const handleSuccessOpen = useCallback(() => {
  //   setIsSuccessVisible(true);
  // }, []);

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
    form.resetFields();
  }, [form, onClose]);

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
            title="Filter"
            extra={[
              <Text onClick={handleClose} type="danger">
                Cancel
              </Text>,
            ]}
          />
          <div className="transaction-form_wrap">
            <Form form={form} name="basic">
              <Form.Item
                name="filterbytoken"
                rules={[
                  {
                    required: true,
                    message: "Please input your current password!",
                  },
                ]}
              >
                <Select
                  className="transition-history_select"
                  placeholder={
                    <span className="transition-history_select-span">Filter by token</span>
                  }
                />
              </Form.Item>
              <Form.Item
                name="from"
                label="From"
              >
                <DatePicker className="transition-history_dp" />
              </Form.Item>
              <Form.Item
                label="to"
                name="to"
              >
                <DatePicker className="transition-history_dp" />
              </Form.Item>
            </Form>
          </div>
          <Button className="transition-submit_btn" disabled={loading}>
            APPLY
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Filter;
