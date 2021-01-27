import React, {useEffect, useState} from 'react';
import {Layout} from 'antd';
import {useTradingStore} from "store";
import {
  DEFAULT_WALLET_TRADE,
  ENUM_WALLET_TRADE,
  MONEY_TYPE_DEFAULT,
  PAGE_PATHS,
  STOP_DOWN,
  STOP_UP
} from "constants/constant";
import {affiliateSystemStatistics,getProfile,getBalanceAccount, getLastResult, getMarketPrice, pushOrder} from "services";

import {openNotificationWithIcon} from "utils/utils";
import initSocket from "components/common/socket";
import Time from "components/Time";
import Chart from "components/Chart";
import moment from 'moment';
import LastResultModal from "components/Modal/LastResult";
import {history} from "utils";
import GlobalHeader from "components/GlobalHeader/GlobalHeader";
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
import { 
  Tabs,
  Col,
  Row,
  Button,
  Select,
  Input, 
  Spin
 } from 'antd';
import TableCustom from 'components/TableCustom/TableCustom';
import { useNetworkTradingHistoryStore, useNetworkAgencyHistoryStore } from 'store';
import {tradingHistory, agencyHistory, getNetworkdTradingSnapshot} from 'services';
import {DATE_FORMATTER_STRING} from 'constants/constant';
import './style.scss';
const {Header} = Layout;

const {Option} = Select;
const agencyHistoryColumn = [
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    align: 'left',
    render: text => text ? moment(text).format(DATE_FORMATTER_STRING) : ''
  },
  {
    title: 'UserName',
    dataIndex: 'username',
    key: 'username',
    align: 'left',
    className: "username"
  },
  {
    title: 'Level',
    dataIndex: 'level',
    key: 'level',
    align: 'center',
    className: "level"
  }
    
  ];
const tradingHistoryColumn = [
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      align: 'left',
      render: text => text ? moment(text).format(DATE_FORMATTER_STRING) : ''
    },
    {
      title: 'Email',
      dataIndex: 'userName',
      key: 'userName',
      align: 'left'
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      align: 'center',
      className: "level"
    },
  ];
const networkMemberColumn = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'right',
    },
    {
      title: 'UserName',
      dataIndex: 'userName',
      key: 'userName',
      align: 'left',
      className: "username"
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      align: 'center',
      className: "level"
    }
  ];
const onCopy = () => {
    const copyText = document.getElementById('copyReferralCode');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
    openNotificationWithIcon('success', '', 'Referral Link is copied');
  };
const TradingComponent = () => {
  const [visibleLastResultModal, setVisibleLastResultModal] = useState(false);
  const [agencyHistoryStore, updateAgencyHistoryStore] = useNetworkAgencyHistoryStore();
  const [loading, setLoading] = useState(false);
  const [statistic, setStatistic] = useState({});
  const [hideReferral, setHideReferral] = useState(true);
  const fetchStatistic = () => {
    setLoading(true);
    affiliateSystemStatistics()
      .then(res => {
        if (res && res.data) {
          setStatistic(res.data.Reply);
        }
      })
      .catch()
      .finally(() => {
        setLoading(false);
      });
  };
  const getProfileUser = () => {
    setLoading(true);
    getProfile()
      .then(res => {
        if (res && res.data) {
          if(parseInt(res.data.Reply.TotalInvest) > 0){
            setHideReferral(false);
            //setIsInvestPackage(false);
          }else{
            //setIsInvestPackage(true);
          }
        }
      })
      .catch()
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {

    fetchStatistic();
    getProfileUser();
    //NetWorkdTradingSnapshot();
  }, []);
  const { TabPane } = Tabs;
  return (
    <div className="main mobile-trading" style={{height: "1250px"}}>
      <LastResultModal visible={visibleLastResultModal} setVisible={setVisibleLastResultModal} />
      {/* <GlobalHeader /> */}
      <Tabs defaultActiveKey="1" >
      <TabPane tab="Overview" key="1">
          <div style={{ padding: "10px"}}>
            <div className="title">
              <h3 className="ttl" style={{ color: "#fff"}}>Network</h3>
                <div className="referral-link" style={{background: "#16192A", padding: "10px",     marginBottom: "11px"}}>
                  <h3 className="title">
                    Referral Link
                  </h3>
                  <div className="search-form">
                    <div className="box-input" style={{width: "100%"}}>
                      <Input.Search
                        id="copyReferralCode"
                        enterButton={<b>COPY</b>}
                        onSearch={onCopy}
                        placeholder=""
                        value={hideReferral ? '' : window.location.origin+`/register?referral=${statistic.ReferralCode}`}
                      />
                    </div>
                  </div>
                </div>
              <Spin spinning={loading}>
                          <ul className="list-item">
                            <li>
                              <div className="box-item" style={{width: "100%",background: "#16192A",display: "flex",marginBottom: "11px"}}>
                                <div className="icon" style={{width: "50%"}}>
                                  <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d)">
                                      <rect x="10" y="6" width="64" height="64" rx="16" fill="#2F3047" />
                                      <path
                                        d="M56.5991 41.4559C56.6318 41.4559 56.6644 41.4559 56.7052 41.4477C57.1621 41.3988 57.4966 40.9908 57.4558 40.5258C57.4068 40.0608 56.9989 39.7263 56.5339 39.7753C56.0689 39.8242 55.7344 40.2321 55.7833 40.6971C55.8241 41.1295 56.1831 41.4477 56.5991 41.4559Z"
                                        fill="#29BFFF" />
                                      <path
                                        d="M51.3288 30.7448C51.598 30.3695 51.5246 29.8474 51.1493 29.57C50.774 29.3008 50.2519 29.3824 49.9745 29.7495C49.7053 30.1248 49.7869 30.6469 50.154 30.9243C50.3009 31.0303 50.464 31.0793 50.6354 31.0874C50.8964 31.0956 51.1575 30.9732 51.3288 30.7448Z"
                                        fill="#29BFFF" />
                                      <path
                                        d="M32.875 29.5455C32.4998 29.8148 32.4182 30.345 32.6874 30.7203C32.8506 30.9406 33.0953 31.063 33.3564 31.0711C33.5277 31.0711 33.7072 31.0222 33.8622 30.9161C34.2375 30.6469 34.3191 30.1166 34.0498 29.7413C33.7724 29.3579 33.2503 29.2763 32.875 29.5455Z"
                                        fill="#29BFFF" />
                                      <path
                                        d="M47.617 54.811C47.1928 54.9986 47.0052 55.4963 47.1928 55.9205C47.3315 56.2305 47.6252 56.41 47.9434 56.4182C48.0658 56.4182 48.18 56.3937 48.3023 56.3447C48.7266 56.1571 48.9142 55.6594 48.7266 55.2352C48.5389 54.811 48.0413 54.6233 47.617 54.811Z"
                                        fill="#29BFFF" />
                                      <path
                                        d="M28.8449 35.4845C28.9754 35.558 29.1141 35.5988 29.2528 35.5988C29.5465 35.6069 29.832 35.4519 29.9952 35.1827C30.2236 34.7829 30.0931 34.269 29.6933 34.0405C29.2936 33.8039 28.7796 33.9426 28.5512 34.3424C28.3064 34.734 28.4451 35.248 28.8449 35.4845Z"
                                        fill="#29BFFF" />
                                      <path
                                        d="M41.9797 56.0029C41.5147 56.0029 41.1394 56.3782 41.1394 56.8432C41.1394 57.3001 41.5065 57.6754 41.9634 57.6835C41.9715 57.6835 41.9715 57.6835 41.9797 57.6835C42.4447 57.6835 42.82 57.3083 42.82 56.8432C42.82 56.3782 42.4447 56.0029 41.9797 56.0029Z"
                                        fill="#29BFFF" />
                                      <path
                                        d="M54.7229 35.6403C54.8697 35.6403 55.0166 35.6077 55.1553 35.5261C55.555 35.2976 55.6937 34.7837 55.4653 34.3839C55.2368 33.9842 54.7229 33.8455 54.3231 34.0739C53.9234 34.3023 53.7847 34.8163 54.0131 35.2161C54.16 35.4853 54.4373 35.6321 54.7229 35.6403Z"
                                        fill="#29BFFF" />
                                      <path
                                        d="M27.2783 41.4318C27.3028 41.4318 27.3272 41.44 27.3517 41.44C27.7841 41.4481 28.1512 41.1218 28.2002 40.6894V40.6812C28.2002 40.6731 28.2002 40.6731 28.2002 40.6649C28.2491 40.1999 27.9146 39.792 27.4578 39.743C26.9928 39.6941 26.5848 40.0286 26.5359 40.4854C26.5359 40.4936 26.5359 40.4936 26.5359 40.5018V40.5099C26.4788 40.9668 26.8133 41.3828 27.2783 41.4318Z"
                                        fill="#29BFFF" />
                                      <path
                                        d="M36.3424 54.8032C35.9181 54.6155 35.4205 54.8032 35.2329 55.2274C35.0452 55.6516 35.2329 56.1493 35.6571 56.3369C35.7631 56.3859 35.8774 56.4103 35.9834 56.4103C36.3097 56.4185 36.6198 56.2309 36.7666 55.9127C36.9542 55.4885 36.7585 54.9908 36.3424 54.8032Z"
                                        fill="#29BFFF" />
                                      <path
                                        d="M31.4554 51.7848C30.1256 51.279 29.3261 50.7568 29.3261 50.7568L28.3063 53.9957L28.1677 54.4362L27.7108 53.139C28.7632 51.6706 27.6292 51.5971 27.4334 51.5971C27.2376 51.5971 26.1036 51.6706 27.156 53.139L26.6992 54.4362L26.5605 53.9957L25.5325 50.7568C25.5325 50.7568 24.733 51.279 23.4032 51.7848C21.9347 52.3151 22.0326 53.5225 22 55.7823H27.4253H27.4416H32.8668C32.826 53.5225 32.9158 52.3151 31.4554 51.7848Z"
                                        fill="#29BFFF" />
                                      <path
                                        d="M25.1163 48.7011C25.2305 49.4598 25.8179 50.4306 26.7888 50.7733C27.1804 50.9119 27.6209 50.9119 28.0125 50.7733C28.9589 50.4306 29.5707 49.4679 29.685 48.7092C29.8155 48.7011 29.9787 48.5216 30.1581 47.8771C30.4029 47.0041 30.1418 46.8736 29.9215 46.8899C29.9623 46.7675 29.995 46.6452 30.0194 46.531C30.3947 44.263 29.277 44.1814 29.277 44.1814C29.277 44.1814 29.0976 43.8224 28.6081 43.5532C28.2817 43.3574 27.8249 43.2105 27.2293 43.2595C27.0335 43.2676 26.854 43.3084 26.6827 43.3655C26.4624 43.439 26.2585 43.545 26.079 43.6756C25.8506 43.8142 25.6466 43.9937 25.459 44.1895C25.1653 44.4914 24.8961 44.883 24.7818 45.3725C24.6839 45.7396 24.7084 46.1149 24.79 46.5228C24.8145 46.6452 24.8471 46.7594 24.8879 46.8818C24.6676 46.8573 24.3984 46.9878 24.6513 47.8689C24.8226 48.5134 24.994 48.6929 25.1163 48.7011Z"
                                        fill="#29BFFF" />
                                      <path
                                        d="M60.5885 51.7848C59.2587 51.279 58.4592 50.7568 58.4592 50.7568L57.4394 53.9957L57.3007 54.4362L56.8438 53.139C57.8963 51.6706 56.7623 51.5971 56.5665 51.5971C56.3707 51.5971 55.2367 51.6706 56.2891 53.139L55.8322 54.4362L55.6935 53.9957L54.6656 50.7568C54.6656 50.7568 53.8661 51.279 52.5363 51.7848C51.0678 52.3151 51.1657 53.5225 51.1331 55.7823H56.5583H56.5746H61.9999C61.9591 53.5225 62.0488 52.3151 60.5885 51.7848Z"
                                        fill="#29BFFF" />
                                      <path
                                        d="M54.2496 48.7011C54.3638 49.4598 54.9512 50.4306 55.9221 50.7733C56.3137 50.9119 56.7542 50.9119 57.1458 50.7733C58.0922 50.4306 58.704 49.4679 58.8183 48.7092C58.9488 48.7011 59.112 48.5216 59.2914 47.8771C59.5362 47.0041 59.2751 46.8736 59.0548 46.8899C59.0956 46.7675 59.1283 46.6452 59.1527 46.531C59.528 44.263 58.4103 44.1814 58.4103 44.1814C58.4103 44.1814 58.2227 43.8224 57.7414 43.5532C57.415 43.3574 56.9582 43.2105 56.3626 43.2595C56.1668 43.2676 55.9873 43.3084 55.816 43.3655C55.5957 43.439 55.3918 43.545 55.2123 43.6756C54.9839 43.8142 54.7799 43.9937 54.5923 44.1895C54.2986 44.4914 54.0294 44.883 53.9151 45.3725C53.8172 45.7396 53.8417 46.1149 53.9233 46.5228C53.9478 46.6452 53.9804 46.7594 54.0212 46.8818C53.8009 46.8573 53.5317 46.9878 53.7846 47.8689C53.9559 48.5134 54.1191 48.6929 54.2496 48.7011Z"
                                        fill="#29BFFF" />
                                      <path
                                        d="M41.996 30.5323H47.4213C47.3886 28.2725 47.4865 27.0651 46.018 26.5348C44.6882 26.029 43.8887 25.5068 43.8887 25.5068L42.8608 28.7457L42.7221 29.1862L42.2652 27.8891C43.3176 26.4206 42.1837 26.3471 41.9879 26.3471C41.7921 26.3471 40.6581 26.4206 41.7105 27.8891L41.2536 29.1862L41.1149 28.7457L40.087 25.5068C40.087 25.5068 39.2875 26.029 37.9577 26.5348C36.4892 27.0651 36.5871 28.2725 36.5544 30.5323H41.9879H41.996Z"
                                        fill="#29BFFF" />
                                      <path
                                        d="M39.6871 23.4511C39.8013 24.2098 40.3887 25.1806 41.3596 25.5233C41.7512 25.6619 42.1917 25.6619 42.5833 25.5233C43.5297 25.1806 44.1415 24.2179 44.2558 23.4592C44.3863 23.4511 44.5495 23.2716 44.7289 22.6271C44.9737 21.7541 44.7126 21.6236 44.4923 21.6399C44.5331 21.5175 44.5658 21.3952 44.5902 21.281C44.9655 19.013 43.8478 18.9314 43.8478 18.9314C43.8478 18.9314 43.6602 18.5724 43.1789 18.3032C42.8525 18.1074 42.3957 17.9605 41.8001 18.0095C41.6043 18.0176 41.4248 18.0584 41.2535 18.1155C41.0332 18.189 40.8293 18.295 40.6498 18.4256C40.4214 18.5642 40.2174 18.7437 40.0298 18.9395C39.7361 19.2414 39.4669 19.633 39.3526 20.1225C39.2547 20.4896 39.2792 20.8649 39.3608 21.2728C39.3853 21.3952 39.4179 21.5094 39.4587 21.6318C39.2384 21.6073 38.9692 21.7378 39.2221 22.6189C39.3934 23.2634 39.5566 23.4429 39.6871 23.4511Z"
                                        fill="#29BFFF" />
                                      <path
                                        d="M41.9876 35.917C38.2837 35.917 35.2815 38.9192 35.2815 42.6231C35.2815 46.3269 38.2837 49.3292 41.9876 49.3292C45.6914 49.3292 48.6937 46.3269 48.6937 42.6231C48.7018 38.9192 45.6996 35.917 41.9876 35.917ZM43.9211 45.2745C43.6274 45.6335 43.244 45.8701 42.8034 45.9925C42.6076 46.0496 42.526 46.1475 42.5342 46.3514C42.5424 46.5472 42.5342 46.7512 42.5342 46.947C42.5342 47.1265 42.4445 47.2162 42.2731 47.2244C42.061 47.2325 41.8489 47.2325 41.6368 47.2244C41.4491 47.2244 41.3594 47.1183 41.3594 46.9307C41.3594 46.7838 41.3594 46.6451 41.3594 46.4983C41.3594 46.1801 41.3431 46.1638 41.0412 46.1148C40.6496 46.0496 40.2662 45.9598 39.8991 45.7885C39.6135 45.6498 39.5891 45.5845 39.6706 45.2827C39.7278 45.0624 39.793 44.8421 39.8583 44.6219C39.9399 44.369 40.0051 44.3363 40.2417 44.4587C40.6415 44.6627 41.0657 44.785 41.5063 44.834C41.7918 44.8666 42.0692 44.8421 42.3384 44.7279C42.8279 44.5158 42.9095 43.9366 42.4934 43.5939C42.3547 43.4797 42.1915 43.39 42.0202 43.3165C41.5878 43.1289 41.1391 42.9821 40.7312 42.7373C40.0704 42.3376 39.6462 41.7991 39.6951 40.9914C39.7522 40.0777 40.2662 39.5148 41.0983 39.2048C41.441 39.0824 41.441 39.0824 41.4491 38.7234C41.4491 38.6011 41.4491 38.4787 41.4491 38.3563C41.4573 38.0871 41.5063 38.0381 41.7755 38.03C41.8571 38.03 41.9468 38.03 42.0284 38.03C42.6076 38.03 42.6076 38.03 42.6076 38.6092C42.6076 39.0171 42.6076 39.0171 43.0155 39.0824C43.3255 39.1314 43.6192 39.2211 43.9129 39.3516C44.068 39.425 44.1332 39.5311 44.0843 39.7024C44.0108 39.9472 43.9456 40.2001 43.864 40.4448C43.7906 40.6814 43.7171 40.7141 43.4887 40.5998C43.04 40.3796 42.5668 40.2898 42.0692 40.3225C41.9386 40.3306 41.8081 40.3469 41.6939 40.3959C41.2615 40.5835 41.1962 41.0567 41.5634 41.3504C41.751 41.4972 41.9631 41.6033 42.1752 41.693C42.5587 41.8481 42.9421 42.0031 43.3011 42.1989C44.4188 42.8434 44.7288 44.2874 43.9211 45.2745Z"
                                        fill="#29BFFF" />
                                    </g>
                                    <defs>
                                      <filter id="filter0_d" x="0" y="0" width="84" height="84" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                        <feOffset dy="4" />
                                        <feGaussianBlur stdDeviation="5" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                                      </filter>
                                    </defs>
                                  </svg>
                                </div>
                                <div className="box-text" style={{width: "50%",float: "right"}}>
                                  <h3 className="title" style={{color: "#8E90A6"}}>
                                    Network Agency Vol.
                                  </h3>
                                  <div className="price" style={{color: "#EBEBF0",fontSize: "20px"}}>
                                    ${statistic.AgencyVol}
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="box-item" style={{width: "100%",background: "#16192A",display: "flex",marginBottom: "11px"}}>
                                <div className="icon" style={{width: "50%"}}>
                                  <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d)">
                                      <rect x="10" y="6" width="64" height="64" rx="16" fill="#2F3047" />
                                      <g clip-path="url(#clip0)">
                                        <path d="M33.7969 41.6602V39.3164H36.1406V29.8633H33.7969V27.5195H31.4531V29.8633H29.1094V39.3164H31.4531V41.6602H33.7969Z"
                                              fill="#EB5757" />
                                        <path d="M52.5469 41.6602V39.3164H54.9688L54.8906 20.4883H52.5469V18.1445H50.2031V20.4883H47.8594V39.3164H50.2031V41.6602H52.5469Z"
                                              fill="#EB5757" />
                                        <path d="M43.1719 41.6602V39.3164H45.5156V25.1758H43.1719V22.832H40.8281V25.1758H38.4844V39.3164H40.8281V41.6602H43.1719Z"
                                              fill="#EB5757" />
                                        <path
                                          d="M30.8412 57.2258C32.1545 56.2503 33.9187 55.7236 35.5547 55.7236H46.0546L62 46.3955C62 46.3955 61.4009 45.3647 61.3943 45.3533C60.3832 43.6096 58.015 43.2059 56.2898 44.2483L44.9297 51.0361H37.3125V48.6923H44.3438V44.0048H34.5704C30.1641 44.0048 26.2189 45.6454 22.8439 49.044L22 49.8642L29.9923 57.8564L30.8412 57.2258Z"
                                          fill="#EB5757" />
                                      </g>
                                    </g>
                                    <defs>
                                      <filter id="filter0_d" x="0" y="0" width="84" height="84" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                        <feOffset dy="4" />
                                        <feGaussianBlur stdDeviation="5" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                                      </filter>
                                      <clipPath id="clip0">
                                        <rect width="40" height="40" fill="white" transform="translate(22 18)" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                                <div className="box-text" style={{width: "50%",float: "right"}}>
                                  <h3 className="title" style={{color: "#8E90A6"}}>
                                    Agency Com.
                                  </h3>
                                  <p className="price" style={{color: "#EBEBF0",fontSize: "20px"}}>
                                    ${statistic.AgencyCom}
                                  </p>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="box-item" style={{width: "100%",background: "#16192A",display: "flex",marginBottom: "11px"}}>
                                <div className="icon" style={{width: "50%"}}>
                                  <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d)">
                                      <rect x="10" y="6" width="64" height="64" rx="16" fill="#2F3047" />
                                      <path d="M29.1094 41.5156V39.1719H31.4531V29.7969H29.1094V27.4531H26.7656V29.7969H24.4219V39.1719H26.7656V41.5156H29.1094Z"
                                            fill="#FFC329" />
                                      <path d="M38.4844 36.8281V34.4844H40.8281V25.1094H38.4844V22.7656H36.1406V25.1094H33.7969V34.4844H36.1406V36.8281H38.4844Z"
                                            fill="#FFC329" />
                                      <path d="M47.8594 34.4844V32.1406H50.2031V22.7656H47.8594V20.4219H45.5156V22.7656H43.1719V32.1406H45.5156V34.4844H47.8594Z"
                                            fill="#FFC329" />
                                      <path d="M57.2344 18H54.8906V20.3438H52.5469V29.7969H54.8906V32.1406H57.2344V29.7969H59.5781V20.3438H57.2344V18Z" fill="#FFC329" />
                                      <path
                                        d="M59.8356 40.8816L61.0979 35.4834L56.0213 33.2529L55.0783 35.3975L56.9777 36.2324L51.098 39.1718H41.723L32.348 43.8593H23.1719V46.2031H32.902L42.277 41.5156H51.652L58.0253 38.3294L57.5537 40.3483L59.8356 40.8816Z"
                                        fill="#FFC329" />
                                      <path
                                        d="M59.6562 43.8594H52.5469V55.6562H50.2031V43.8594H43.1719V55.6562H40.8281V45.4787L33.7969 48.9944V55.6562H31.4531V48.5469H24.3438V55.6562H22V58H62V55.6562H59.6562V43.8594Z"
                                        fill="#FFC329" />
                                    </g>
                                    <defs>
                                      <filter id="filter0_d" x="0" y="0" width="84" height="84" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                        <feOffset dy="4" />
                                        <feGaussianBlur stdDeviation="5" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                                      </filter>
                                    </defs>
                                  </svg>
                                </div>
                                <div className="box-text" style={{width: "50%",float: "right"}}>
                                  <h3 className="title" style={{color: "#8E90A6"}}>
                                    Team Daily Trade
                                  </h3>
                                  <p className="price" style={{color: "#EBEBF0",fontSize: "20px"}}>
                                    ${statistic.TeamDailyTrade}
                                  </p>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="box-item" style={{width: "100%",background: "#16192A",display: "flex",marginBottom: "11px"}}>
                                <div className="icon" style={{width: "50%"}}>
                                  <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d)">
                                      <rect x="10" y="6" width="64" height="64" rx="16" fill="#2F3047" />
                                      <g clip-path="url(#clip0)">
                                        <path
                                          d="M42 34.1436C45.7538 34.1436 48.7969 31.1005 48.7969 27.3467C48.7969 23.5929 45.7538 20.5498 42 20.5498C38.2462 20.5498 35.2031 23.5929 35.2031 27.3467C35.2031 31.1005 38.2462 34.1436 42 34.1436Z"
                                          fill="#22D291" />
                                        <path
                                          d="M55.75 34.1436C58.1231 34.1436 60.0469 32.2198 60.0469 29.8467C60.0469 27.4736 58.1231 25.5498 55.75 25.5498C53.3769 25.5498 51.4531 27.4736 51.4531 29.8467C51.4531 32.2198 53.3769 34.1436 55.75 34.1436Z"
                                          fill="#22D291" />
                                        <path
                                          d="M28.25 34.1436C30.6231 34.1436 32.5469 32.2198 32.5469 29.8467C32.5469 27.4736 30.6231 25.5498 28.25 25.5498C25.8769 25.5498 23.9531 27.4736 23.9531 29.8467C23.9531 32.2198 25.8769 34.1436 28.25 34.1436Z"
                                          fill="#22D291" />
                                        <path
                                          d="M32.4836 38.0014C30.7922 36.6156 29.2604 36.7991 27.3047 36.7991C24.3797 36.7991 22 39.1647 22 42.0717V50.6037C22 51.8662 23.0305 52.8928 24.2977 52.8928C29.7684 52.8928 29.1094 52.9918 29.1094 52.6569C29.1094 46.6111 28.3933 42.1774 32.4836 38.0014Z"
                                          fill="#22D291" />
                                        <path
                                          d="M43.8601 36.8314C40.4442 36.5465 37.4751 36.8347 34.914 38.9486C30.6283 42.3814 31.4531 47.0035 31.4531 52.658C31.4531 54.154 32.6703 55.3939 34.189 55.3939C50.6798 55.3939 51.3362 55.9259 52.314 53.7603C52.6348 53.028 52.5469 53.2607 52.5469 46.2549C52.5469 40.6903 47.7287 36.8314 43.8601 36.8314Z"
                                          fill="#22D291" />
                                        <path
                                          d="M56.6953 36.7998C54.7289 36.7998 53.2055 36.6183 51.5164 38.0022C55.5761 42.1472 54.8906 46.2783 54.8906 52.6576C54.8906 52.9947 54.3435 52.8936 59.6203 52.8936C60.9328 52.8936 62 51.8303 62 50.5233V42.0725C62 39.1655 59.6203 36.7998 56.6953 36.7998Z"
                                          fill="#22D291" />
                                      </g>
                                    </g>
                                    <defs>
                                      <filter id="filter0_d" x="0" y="0" width="84" height="84" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                        <feOffset dy="4" />
                                        <feGaussianBlur stdDeviation="5" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                                      </filter>
                                      <clipPath id="clip0">
                                        <rect width="40" height="40" fill="white" transform="translate(22 18)" />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </div>
                                <div className="box-text" style={{width: "50%",float: "right"}}>
                                  <h3 className="title" style={{color: "#8E90A6"}}>
                                    Network Member
                                  </h3>
                                  <p className="price" style={{color: "#EBEBF0",fontSize: "20px"}}>
                                    {statistic.NetworkMember}
                                  </p>
                                </div>
                              </div>
                            </li>
                          </ul>
              </Spin>
              {/* <div style={{ padding: "10px"}}>
                <div className="title">
                  <h3 className="ttl" style={{ color: "#fff"}}>Member by level</h3>
                </div>
                <p className="ttl" style={{ color: "#fff"}}>Char here</p>
              </div> */}
              <div style={{ padding: "10px"}}>
                <div className="title">
                  <h3 className="ttl" style={{ color: "#fff"}}>Network Member</h3>
                </div>
                  <TableCustom useStore={useNetworkTradingHistoryStore} columns={networkMemberColumn} apiGetList={tradingHistory} />
              </div>
            </div>
          </div>
      </TabPane>
      <TabPane tab="Agency Com." key="2">
          {/* <div style={{ padding: "10px"}}>
            <div className="title">
              <h3 className="ttl" style={{ color: "#fff"}}>Agency Com.</h3>
            </div>
            <p className="ttl" style={{ color: "#fff"}}>Char here</p>
          </div> */}
          <div style={{ padding: "10px"}}>
            <div className="title">
              <h3 className="ttl" style={{ color: "#fff"}}>Agency Com. History</h3>
            </div>
            <div className="box-input">
              <input style={{background: "#282C44", border:"#282C44"}} type="text" className="f-control f-input color-white" placeholder="Search by Email" />
            </div>
              <TableCustom useStore={useNetworkTradingHistoryStore} columns={tradingHistoryColumn} apiGetList={tradingHistory} />
          </div>
      </TabPane>
      <TabPane tab="Trading Com." key="3">
          <Select
            labelInValue
            defaultValue={{ value: 'GES' }}
            style={{ width: "100%",padding: "0px 10px 0px 7px"}}
          >
            {/* <Option value="jack">Program name</Option>
            <Option value="lucy">Program name</Option> */}
          </Select>
          <Select
            labelInValue
            defaultValue={{ value: 'USDT' }}
            style={{ width: "100%",padding: "0px 10px 0px 7px", marginTop: "12px"}}
          >
            {/* <Option value="jack">Program name</Option>
            <Option value="lucy">Program name</Option> */}
          </Select>
          <div style={{ padding: "10px"}}>
            <div className="title">
              <h3 className="ttl" style={{ color: "#fff"}}>Trading Com. History</h3>
            </div>
            <div className="box-input">
              <input style={{background: "#282C44", border:"#282C44"}} type="text" className="f-control f-input color-white" placeholder="Search by Email" />
            </div>
              <TableCustom useStore={useNetworkAgencyHistoryStore} columns={agencyHistoryColumn} apiGetList={agencyHistory} />
          </div>

      </TabPane>
    </Tabs>
    </div>
  )
}
export default TradingComponent;
