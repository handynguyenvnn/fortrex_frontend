import React, { useEffect, useState } from 'react';
import { Modal, Select, Form } from 'antd';
import {getWalletFrom, withDrawRequest, withDrawSubmit, getBalanceAccount, withdrawConfirmEmail} from 'services';
import { openNotificationWithIcon } from 'utils/utils';
import SuccessModal from 'components/Modal/SuccessModal';
import './styles.scss';
import {history} from "utils";
import {PAGE_PATHS} from "constants";
import WidthDrawSuccess from "containers/SuccessRegister/WithdrawSuccess";

const Withdraw = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [walletBalanceList, setWalletBalanceList] = useState([]);
  const [walletDepositAddr, setWalletDepositAddr] = useState([]);
  const [withdrawRequest, setWithdrawRequest] = useState({});
  const [type, setType] = useState('USDT');
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState('');
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [sumBalance, setSumBalance] = useState(0);
  const fetchWalletBalanceList = () => {
    try {
      setLoading(true);
      getBalanceAccount()
        .then(res => {
          if (res && res.data.StatusCode === 401 || res.data.StatusCode === 400) {
            openNotificationWithIcon('error', 'Notify', res.data.Meg);
            return;
          }

          if (res && res.data.StatusCode === 200) {
            setWalletBalanceList(res.data.Reply);
          }
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    } catch (errorInfo) {
    }
  };

  const fetchWalletDepositAddr = () => {
    setLoading(true);
    getWalletFrom()
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
  const fetchWithDrawRequest = (type, amountParam) => {
    setLoading(true);
    withDrawRequest({
      params: {
        Type: type.toString().toLowerCase(),
        Amount: amountParam
      }
    }).then(res => {
      if (res && res.data && res.data.Reply) {
        if (res.data.StatusCode === 200) {
          setWithdrawRequest(res.data.Reply);
        }
      }
    })
      .catch()
      .finally(() => {
        setLoading(false);
      });
  };
  const changeWalletDeposit = e => {

    fetchWithDrawRequest(e, amount);
    setType(e);
    calAvailBalance(e);
  };

  useEffect(() => {
    fetchWalletDepositAddr();
    fetchWalletBalanceList();
    changeWalletDeposit('USDT');
  }, []);
  const onChangeAmount = (e) => {
    const val = e && e.target && e.target.value || 0;
    setAmount(val);
    fetchWithDrawRequest(type, val);
  };
  const onChangeAddress = e => {
    const val = e && e.target && e.target.value || '';
    setAddress(val);
  };
  const clickWithdraw = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      withDrawSubmit({
        params: {
          Amount: Number(values.amount) || undefined,
          Type: type.toString().toLowerCase(),
          Address: values.address && values.address.toString().trim() || undefined
        }
      })
        .then(res => {
          if (res && res.data) {
            if (res && res.data.StatusCode === 401 || res.data.StatusCode === 400) {
              openNotificationWithIcon('error', 'Notify', res.data.Meg);
              return;
            } else if (res.data.StatusCode === 200) {
              openNotificationWithIcon('error', 'success',res.data.Meg);
              setVisibleSuccess(true);
            } else {
              openNotificationWithIcon('error', 'Error', 'Withdraw is failed');
              return;
            }
          }
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    } catch (e) {
    }

  };
  const calAvailBalance = (wcode) => {
    wcode=wcode||'USDT';
    if (walletBalanceList && walletBalanceList.length > 0) {
      const rel = walletBalanceList.filter(x=>x.WalletCode===wcode)[0];
      if (rel && rel.BalanceFormat) {
        setSumBalance(rel.BalanceFormat);
      return;
      }

    }
    return setSumBalance(0);
  };
  useEffect(() => {
    calAvailBalance();
  }, [walletBalanceList]);


  return (
    <Modal
      centered
      width={0}
      footer={null}
      visible={visible}
      closable={false}
      onCancel={() => setVisible(false)}
    >
      <div>
        <SuccessModal
          visible={visibleSuccess}
          setVisible={(val) => {
            setVisibleSuccess(val);
            if (!val) {
              setVisible(false);
            }
          }}
          message="You have successfully withdraw ."
        />
        <Form form={form} name="dynamic_rule">
          <div className="popup modal">
            <div className="inner-wallet">
              <h3 className="title-profile">Withdraw <span onClick={() => setVisible(false)} style={{color: "red"}}>Close</span></h3>
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
              <div className="box-input">
                <p className="txt-note">Avail. balance: {sumBalance || '0.00'} {type}</p>
                <Form.Item name="address" rules={[{ required: true, message: 'Please input Withdraw address!' }]}>
                  <input type="text" className="f-control f-input w-full-100" placeholder="Withdraw address" />
                </Form.Item>
              </div>
              <div className="box-input d-flex w-full-100">
                <Form.Item className="w-full-100" name="amount" rules={[{ required: true, message: 'Please input Amount!' }]}>
                  <input type="number" onChange={ e => onChangeAmount(e)} className="f-control f-input w-full-100" placeholder="Amount" />
                </Form.Item>
                <button
                  type="button"
                  className="max-button bg-red btn-copy bg2"
                  onClick={() => {
                    form.setFieldsValue({
                      amount: sumBalance
                    });
                    fetchWithDrawRequest(type, sumBalance);
                  }}
                >MAX
                </button>
              </div>
              <p className="txt-note2">Fee: {`${withdrawRequest.Fee || '0.00'}`} {type} |
                                       Receive: {`${(Number(withdrawRequest.Amount) - Number(withdrawRequest.Fee)) || '0.00'}`} {type}</p>
              <a onClick={clickWithdraw} className="btn-1 btn-save w-full bg-red">WITHDRAW</a>
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
};
export default Withdraw;
