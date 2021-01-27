import React, { useEffect, useState } from 'react';
//import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import ReactHtmlParser from 'react-html-parser';
import {getWalletFrom, getWalletDeposits, withdrawConfirmEmail} from 'services';
import { Input, Modal, Select, Form } from 'antd';
import './styles.scss';
import { openNotificationWithIcon } from 'utils/utils';
import {history} from "utils";
import {PAGE_PATHS} from "constants/constant";
import queryString from 'querystring';

let QRCode = require('qrcode.react');


const Deposit = ({ visible, setVisible }) => {
  const [loading, setLoading] = useState(false);
  const [walletDepositAddr, setWalletDepositAddr] = useState([]);
  const [valueUSDT, setvalueUSDT] = useState(590.8);
  const [walletDepositAddrDetail, setWalletDepositAddrDetail] = useState({});
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
  const changeWalletDeposit = e => {
    setLoading(true);
    getWalletDeposits({
      params: {
        Symbol: e
      }
    }).then(res => {
      if (res && res.data && res.data.Reply) {
        setWalletDepositAddrDetail(res.data.Reply);
      }
    })
      .catch()
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchWalletDepositAddr();
    changeWalletDeposit('USDT');
  }, []);

  const [tokenActive, setTokenActive] = useState('');
  useEffect(() => {
    const token = queryString.parse(location.search).token;
    setTokenActive(token);
  }, []);



  const onCopy = () => {
    const copyText = document.getElementById('copyDepositAddress');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
    openNotificationWithIcon('success', '', 'Successfully copy');
  };

  const getMinTransactionContent = (type) => {
      switch (type) {
        case "USDT":
          return  <p className="txt">Min transaction: 10 USDT.</p>
        case "GES":
          return  <p className="txt">Min transaction: 50 GES.</p>
        case "BRI":
          return  <p className="txt">Min transaction: 50 BRI.</p>
        case "ELD":
          return  <p className="txt">Min transaction: 50 ELD.</p>
        default:
          return <p></p>
      }
  }
  
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
        <div className="popup modal">
          <div className="inner-wallet">
            <h3 className="title-profile">Deposit<span onClick={() => setVisible(false)} style={{color: "red"}}>Close</span></h3>
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
            <div className="img">
              <QRCode value={walletDepositAddrDetail  && walletDepositAddrDetail.WalletAddress  || ""} bgColor='#fff' size='128' width='250' />
              {/* <img src={walletDepositAddrDetail.memo} alt="qrcode" /> */}
            </div>
            <div className="box-input">
              <label className='label-tile'>{walletDepositAddrDetail.Symbol} Address</label>
            <Input.Search
                    id="copyDepositAddress"
                    enterButton={<b>COPY</b>}
                    onSearch={onCopy}
                    placeholder="0x29d7d1dd5b864d9db5...178ae86b"
                    value={walletDepositAddrDetail.WalletAddress}
                  />

              {/*<input type="text" className="f-control f-input" placeholder="0x29d7d1dd5b6f9c864d9db5...178ae86b" />*/}
              {/*<button className="btn-copy" type="button">COPY</button>*/}
            </div>
            <p className="txt">
              {ReactHtmlParser(walletDepositAddrDetail.CoinInfo)}
            </p>
            <p className="txt">Your ETH deposit will be automatically converted to USDT at rate 1 ETH = {valueUSDT} USDT.</p>
            {getMinTransactionContent(walletDepositAddrDetail.Symbol)}
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default Deposit;
