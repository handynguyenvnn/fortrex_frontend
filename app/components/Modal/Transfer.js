import React, { useEffect, useState } from 'react';
import { Modal, Select, Form } from 'antd';
import { getDeposits, getWalletDeposits, transferMoney } from 'services';
import { openNotificationWithIcon } from 'utils/utils';
import SuccessModal from 'components/Modal/SuccessModal';
import './styles.scss';

const Transfer = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const [walletDepositAddr, setWalletDepositAddr] = useState([]);
  const [walletType, setWalletType] = useState('BTC');
  const [loading, setLoading] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const resetFields = () => {
    setWalletType('BTC');
    form.setFieldsValue({ amount: undefined });
  };
  const fetchWalletDepositAddr = () => {
    setLoading(true);
    getDeposits()
      .then(res => {
        if (res && res.data && res.data.Reply) {
          setWalletDepositAddr(res.data.Reply);
        }
      })
      .catch()
      .finally(() => {
        setLoading(false);
      });
  };
  const changeWalletDeposit = e => {
    setWalletType(e);
  };
  useEffect(() => {
    fetchWalletDepositAddr();
    changeWalletDeposit('BTC');
  }, []);
  const onClickTransfer = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      transferMoney({
        params: {
          AmountUSD: values.amount
        }
      })
        .then(res => {
          if (res && res.data && res.data.StatusCode === 200) {
            setVisibleSuccess(true);
          } else {
            openNotificationWithIcon('error', 'Notification', 'Transfer successfully');
          }
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    } catch (errorInfo) {
    }
  };
  return (
    <Modal
      centered
      afterClose={() => resetFields()}
      destroyOnClose
      width={0}
      footer={null}
      visible={visible}
      closable={false}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Form form={form} name="dynamic_rule">
        <SuccessModal
          visible={visibleSuccess}
          setVisible={(val) => {
            setVisibleSuccess(val);
            if (!val) {
              setVisible(false);
            }
          }}
          message={`You have successfully transferred ${form.getFieldValue('amount')} ${walletType}.`}
        />
        <div>
          <div className="popup modal">
            <div className="inner-wallet">
              <h3 className="title-profile">Transfer</h3>
              <div className="box-select drp-100">
                <Select
                  defaultValue="USDT"
                  onChange={e => changeWalletDeposit(e)}
                >
                  {
                    walletDepositAddr.map(el => (
                      <Select.Option key={el.CoinName} value={el.Symbol}>
                        {el.CoinName}
                      </Select.Option>
                    ))
                  }
                </Select>
              </div>
              {/*<div className="box-select">*/}
              {/*  <select>*/}
              {/*    <option value="" selected="">Filter by level</option>*/}
              {/*    <option value="">tim kiem 1</option>*/}
              {/*    <option value="">tim kiem 2</option>*/}
              {/*  </select>*/}
              {/*  <select>*/}
              {/*    <option value="" selected="">Filter by level</option>*/}
              {/*    <option value="">tim kiem 1</option>*/}
              {/*    <option value="">tim kiem 2</option>*/}
              {/*  </select>*/}
              {/*</div>*/}
              <div className="box-input">
                <Form.Item name="amount" rules={[{ required: true, message: 'Please input Input Amount!' }]}>>
                  <input
                    onChange={e => {
                      form.setFieldsValue({
                        amount: e.target.value
                      });
                    }}
                    name="amount"
                    type="number"
                    className="f-control f-input w-full-100"
                    placeholder="Input Amount"
                  />
                </Form.Item>
              </div>
              <a onClick={onClickTransfer} className="btn-1 btn-save w-full bg-blue">Transfer</a>
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
export default Transfer;
