import React, { useEffect, useState } from 'react';
import { getDepositsHistory, getBalanceAccount, withDrawConfirmEmail, withdrawConfirmEmail,getWithdrawHistory } from 'services';
import TableCustom from 'components/TableCustom/TableCustom';
import moment from 'moment';
import { useWalletBalanceStore, useWalletDepositWithdrawHistoryStore, useWalletTransferHistory } from 'store';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import WidthDrawSuccess from "containers/SuccessRegister/WithdrawSuccess";
import { history } from "utils";
import { PAGE_PATHS, DATE_FORMATTER_STRING } from "constants/constant";
import queryString from 'query-string';
import {message} from "antd";
import USDT from "./../../../assets/images/image 10.png";
import GES from "./../../../assets/images/Ellipse 7.png";
import ERC20 from "./../../../assets/images/ERC20 1.png";
import { 
  Col,
  Row,
 } from 'antd';


const Wallet = () => {
  const [walletBalanceStore, updateWalletBalanceStore] = useWalletBalanceStore();
  const [walletDWHistoryStore, updateDWHistoryStore] = useWalletDepositWithdrawHistoryStore();
  const [walletTransferHistory, updateTransferHistory] = useWalletTransferHistory();
  const [dataDatableBalance, setDatableBalance] = useState([]);
  const [visibleDeposit, setVisibleDeposit] = useState(false);
  const [visibleWithdraw, setVisibleWithdraw] = useState(false);
  const [tokenActive, setTokenActive] = useState('');
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('WITHDRAW FAIL')
  const getBalance = () => {
    try {
      setLoading(true);
      getBalanceAccount()
          .then(res => {
            if (res && res.data.StatusCode === 200) {
              setDatableBalance(res.data.Reply.filter( x => x.WalletCode !== 'DEMO'));
            }
          })
          .catch()
          .finally(() => {
            setLoading(false);
          });
    } catch (errorInfo) {
    }
  }
const renderTableBoxBalance = () => {
    return  dataDatableBalance.length > 0 && dataDatableBalance.map((item, index) => {
        const {
          BalanceFormat,WalletCode
        } = item;
        return (
            
           <div class="colum-25">
           <div class="card-body">
             <div class="card-top">
               <div class="ic-wallet">
                 
                 <img height={60} width={60} src={"https://static.fortrex.io/images/"+WalletCode+".png?v=1.1"}/>
               </div>
               <div class="box-wallet-title">
                 <span class="txt w-name">
                 {WalletCode}
                             </span>
                 <h1 class="txt w-balance">
                   ${BalanceFormat}
                             </h1>
               </div>
             </div>

           </div>
         </div>
        )
    })
}


  const walletBalanceColumn = [
    {
      title: 'Token',
      dataIndex: 'time',
      key: 'time',
      align: 'left'
    },
    {
      title: 'Current Balance',
      dataIndex: 'username',
      key: 'username',
      align: 'left'
    },
    // {
    //   title: 'Spot wallet',
    //   dataIndex: 'level',
    //   key: 'level',
    //   align: 'left'
    // },
    // {
    //   title: 'Trading wallet',
    //   dataIndex: 'packageValue',
    //   key: 'packageValue',
    //   align: 'right',
    //   width: 300,
    //   render: text => text ? `$${text}` : ''
    // },
    // {
    //   title: 'Agency Wallet',
    //   dataIndex: 'amount',
    //   key: 'amount',
    //   align: 'right',
    //   width: 300,
    //   render: text => text ? `${text}` : ''
    // }
  ];
  const dwHistoryColumn = [
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      align: 'left'
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      align: 'left',
      className: 'color-wallet'
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      align: 'left',
      className: 'color-wallet'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'left'
    },
    {
      title: 'TxID',
      dataIndex: 'txID',
      key: 'txID',
      align: 'left',
      className: 'color-wallet'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      align: 'left'
    },
    {
      title: 'Confirmations',
      dataIndex: 'confirmations',
      key: 'confirmations',
      align: 'right'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'right',
      render: (item, record) => <p
      className={record.Status ='Success' ? "color-win" : "color-pending"}>{item}</p>
    }
  ];
  const withdrawColumn = [
    
    {
      title: 'From Wallet',
      dataIndex: 'from',
      key: 'from',
      align: 'left'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'left'
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      key: 'fee',
      align: 'left'
    },
    {
      title: 'TxID',
      dataIndex: 'txId',
      key: 'txId',
      align: 'left',
      className: 'color-wallet'
    },
    {
      title: 'Address',
      dataIndex: 'addressWallet',
      key: 'addressWallet',
      align: 'left',
      className: 'color-wallet'
    }
    ,{
      title: 'Create At',
      dataIndex: 'createDate',
      key: 'createDate',
      align: 'left'
    },
    {
      title: 'Approve Date',
      dataIndex: 'approveDate',
      key: 'approveDate',
      align: 'left'
    },
    {
      title: 'Status',
      dataIndex: 'statusName',
      key: 'statusName',
      align: 'right'
    }
  ];

  useEffect( () => {
    getBalance();
}, [])
  useEffect(() => {
    updateWalletBalanceStore(draft => {
      draft.isReloadTable = true;
    });
    updateDWHistoryStore(draft => {
      draft.isReloadTable = true;
    });
    updateTransferHistory(draft => {
      draft.isReloadTable = true;
    });
    const token = queryString.parse(location.search).token;
    if (token) {
      setTokenActive(token);
    }
  }, []);
  const onClickDeposit = () => {
    setVisibleDeposit(true);
  };
  const onClickWithdraw = () => {
    setVisibleWithdraw(true);
  };

  useEffect(() => {
    if (tokenActive) {
      try {
        setLoading(true);
        const params = {
          token: tokenActive,
        };
        withDrawConfirmEmail({ params })
          .then(res => {
            setVisibleSuccess(true);
            if (res && res.data.StatusCode === 401) {
              setMessage(res.data.Meg);
              return;
            }
            if (res && res.data.StatusCode === 200) {
              setMessage(res.data.Meg);
            } else if (res && res.data.StatusCode === 400) {
              setMessage(res.data.Meg);
            }
          })
          .catch()
          .finally(() => {
            setLoading(false);
          });
      } catch (errorInfo) {
      }
    }
  }, [tokenActive])
  return (
    <div>
      <WidthDrawSuccess
        message={message}
        visible={visibleSuccess}
        setVisible={(val) => {
          setVisibleSuccess(val);
          if (!val) {
            setVisibleSuccess(false);
          }
        }}
      />
      {
        visibleDeposit ?
          <Deposit
            visible={visibleDeposit}
            setVisible={setVisibleDeposit}
          />
          : null
      }
      {
        visibleWithdraw ? <Withdraw
          visible={visibleWithdraw}
          setVisible={setVisibleWithdraw}
        /> : null
      }

      <div className="dashboard-top">
        <div className="content-left full-width">
          <div className="order" style={{background: "none"}}>
          <div class="content full-width">
          <div className="order">
            <div className="title">
              <h3 className="ttl">Wallet Balance</h3>
              <div className="w-deposit-app">
                <a onClick={onClickDeposit} className="btn-1 btn-save bg-green">DEPOSIT</a>
                <span style={{ paddingLeft: '8px' }} />
                <a onClick={onClickWithdraw} className="btn-1 btn-save bg-red">WITHDRAW</a>
              </div>
            </div>
            <div class="table-agency">
              <div class="columns box-wallets">
                {renderTableBoxBalance()}
                 </div>
            </div>
          </div>
           
          </div>
         
        </div>
      </div>
      </div>
            {/* <Row>
              <Col span={8}  style={{display: "flex",background: "#16192A",marginRight: "24px",
                padding: "10px 10px 10px 10px",
                marginTop: "13px"}}
                >
                <div>
                  <img src={USDT} alt={"VIP"} />
                </div>
                <div className="text-content">
                  <h3>USDT</h3>
                  <h2>0.00</h2>
                </div>
              </Col>
              <Col span={7} style={{display: "flex",background: "#16192A",marginRight: "24px",
                padding: "10px 10px 10px 10px",
                marginTop: "13px"}}>
                <div>
                  <img src={GES} alt={"VIP"} />
                </div>
                <div className="text-content">
                  <h3>GES</h3>
                  <h2>0.00</h2>
                </div>
              </Col>
              <Col span={8} style={{display: "flex",background: "#16192A",
                padding: "10px 10px 10px 10px",
                marginTop: "13px"}}>
                <div>
                  <img src={ERC20} alt={"VIP"} />
                </div>
                <div className="text-content">
                  <h3>ERC-20</h3>
                  <h2>0.00</h2>
                </div>
              </Col>
            </Row> */}
      <div className="dashboard-bottom">
        <div className="title">
          <h3 className="ttl">Deposit History</h3>
        </div>
        <TableCustom useStore={useWalletDepositWithdrawHistoryStore} columns={dwHistoryColumn} apiGetList={getDepositsHistory} />
      </div>
      <div className="dashboard-bottom">
        <div className="title">
          <h3 className="ttl">Withdraw History</h3>
        </div>
        <TableCustom useStore={useWalletDepositWithdrawHistoryStore} columns={withdrawColumn} apiGetList={getWithdrawHistory} />
      </div>
    </div>
  );
};
export default Wallet;
