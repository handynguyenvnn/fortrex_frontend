import React, { useEffect, useState } from 'react';
import { Layout, Select, Tabs } from 'antd';
import { useTradingStore } from "store";
import {
  DEFAULT_WALLET_TRADE,
  ENUM_WALLET_TRADE,
  MONEY_TYPE_DEFAULT,
  PAGE_PATHS,
  STOP_DOWN,
  STOP_UP
} from "constants/constant";
import { getBalanceAccount, getLastResult, getMarketPrice, pushOrder } from "services";
import { openNotificationWithIcon, socketSignalR } from "utils/utils";
import initSocket from "components/common/socket";
import Time from "components/Time";
import Chart from "components/Chart";
import LastResultModal from "components/Modal/LastResult";
import { history } from "utils";
import HeaderComponent from "components/Header";
import TabsTradingHistory from './TabsTradingHistory';
import DrawerChangeAmount from './DrawerChangeAmount';
import DrawerChangeAccount from './DrawerChangeAccount';
import DrawerOrderMobile from './DrawerOrderMobile';
import IconGES from '@components/assets/images/GES.svg';
import IconDolars from 'components/assets/images/dolars.svg';
import { getIcon } from './DrawerChangeAccount'

import './styles.scss'
import setCommandSound from '../../../public/sound/setcommand.mp3';
import resultWinSound from '../../../public/sound/resultwin.mp3';
import StopDownUpModal from "components/Modal/StopDownUpModal";
import Div100vh, { use100vh } from 'react-div-100vh';

const { Header } = Layout;

const { Option } = Select;

const TradingComponent = () => {
  let resultOrders = [];
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [practice, setPractice] = useState([]);
  const [marketPrice, setMarketPrice] = useState(null);
  const [up, setUp] = useState(0);
  const [down, setDown] = useState(0);
  const [hoursAgo, setHoursAgo] = useState(0);
  const [minAgo, setMinAgo] = useState(0);
  const [tradingStore, updateTradingStore] = useTradingStore();
  const [isShowButtonDownUp, setIsShowButtonDownUp] = useState(false);
  const [selectPractice, setSelectPractice] = useState(DEFAULT_WALLET_TRADE);
  const [defaultPractice, setDefaultPractice] = useState(null);
  const [visibleLastResultModal, setVisibleLastResultModal] = useState(false);
  const [visibleDrawerChangeAmount, setVisibleDrawerChangeAmount] = useState(false);
  const [visibleDrawerChangeAccount, setVisibleDrawerChangeAccount] = useState(false)
  const [visibleDrawerOrderMobile, setVisibleDrawerOrderMobile] = useState(false)
  const [counter, setCounter] = useState(0);
  const [chooseWallet, setchooseWallet] = useState('');
  const height = use100vh();

  useEffect(() => {
    const socketConnect = socketSignalR();
    if (socketConnect) {
      if (socketConnect && socketConnect.state === "Disconnected") {
        socketConnect
          .start()
          .then(() => {
            socketConnect.on("serverTime", (e) => {
              const lastsecond = parseInt(JSON.stringify(e));
              setCounter(59 - lastsecond);
              if (lastsecond === 18) {
                callaudioNotifyPushOrder("audioNotifyPushOrder");
              }
              else if (lastsecond === 3){
                setchooseWallet('');
              }
              else if (lastsecond === 1 && resultOrders.length > 0) {

                let countWin = 0;
                let countLose = 0;
                let byType = -1;
                resultOrders.forEach(item => {
                  if (item.status == -1) {
                    countLose += item.profit;
                  } else if (item.status == 1) {
                    countWin += item.profit;
                  }
                  byType = item.byType;
                });
                //reset notify list
                resultOrders = [];
                //push notify win
                if (countWin > 0) {
                  const byTypeName = ENUM_WALLET_TRADE.filter(x => x.value === byType)[0].label;
                  let result = '';
                  if (byType == 1 || byType == 3) {
                    result = "Result +$" + " " + countWin;

                  } else {
                    result = "Result  +" + countWin + " " + byTypeName;
                  }
                  // show notify
                  setDataModal(result);
                  setVisibleModal(true);
                  const audioEl = document.getElementsByClassName("audio-element-result-win")[0];
                  audioEl.play();
                  setTimeout(
                    () => setVisibleModal(false),
                    5000
                  );
                  //end
                }
                //push notify lose
                if (countLose < 0) {
                  const byTypeName = ENUM_WALLET_TRADE.filter(x => x.value === byType)[0].label;
                  let result = '';
                  if (byType == 1 || byType == 3) {
                    result = "Result -$" + (-1 * countLose);

                  } else {
                    result = "Result  -" + (-1 * countLose) + " " + byTypeName;
                  }
                  // show notify
                  openNotificationWithIcon('success', 'LOSE', result);
                  //end
                }


              }
            });
            socketConnect.on("ResultTrade", (e) => {
              setchooseWallet('');
              switch (e.status) {
                case 1:
                  if (resultOrders.filter(x => x.id === e.id).length == 0) {
                    resultOrders.push({
                      id: e.id,
                      status: e.status,
                      profit: e.profit,
                      byType: e.byType,
                    });
                  }
                  break;
                case -1:
                  if (resultOrders.filter(x => x.id === e.id).length == 0) {
                    resultOrders.push({
                      id: e.id,
                      status: e.status,
                      profit: e.profit,
                      byType: e.byType,
                    });
                  }

                  break;
                case 0:
                  if (resultOrders.filter(x => x.id === e.id).length == 0) {
                    resultOrders.push({
                      id: e.id,
                      status: e.status,
                      profit: e.profit,
                      byType: e.byType,
                    });
                  }
                  break;
                default:
                  break;
              }
              updateTradingStore(draft => {
                draft.loading = true;
              });
            });
          })
      }
      return () => {
        socketConnect.off("ServerTime");
        socketConnect.off("ResultTrade");
        socketConnect.off("AddTrade");
        return null;
      };
    }
  }, []);


  const incrementMoney = () => {
    setAmount(parseInt(amount) + 1);
  }

  const decrementMoney = () => {
    setAmount(parseInt(amount) - 1)
  }
  const onChangeAmount = (value) => {
    let max = parseInt(value) - parseInt(selectPractice) ? parseInt(selectPractice) : parseInt(value)
    max > 0 ? setAmount(max) : setAmount(0)
  }

  const handleStopUpDown = (type) => {
    try {
      const byType = ENUM_WALLET_TRADE.filter(x => x.label === selectPractice)[0].value;
      updateTradingStore(draft => {
        draft.loading = true;
      });
      setLoading(true);
      const body = {
        MarketName: MONEY_TYPE_DEFAULT,
        Amount: parseInt(amount),
        IsCall: type,
        ByType: byType,
        Formatdecimal: 3,
      };
      const byTypeName = ENUM_WALLET_TRADE.filter(x => x.value === byType)[0].label;
      if (chooseWallet==='' || byTypeName == chooseWallet) {
        setchooseWallet(byTypeName);
        pushOrder(body)
        .then(res => {
          if (res && res.data.StatusCode === 401 || res.data.StatusCode === 400) {
            return;
          }

          if (res && res.data.StatusCode === 200) {
            const audioEl = document.getElementsByClassName("audio-element")[0]
            audioEl.play()
            if (byType == 1 || byType == 3) {
              openNotificationWithIcon('success', res.data.Meg, '$' + amount);

            } else {
              openNotificationWithIcon('success', res.data.Meg, amount + " " + byTypeName);
            }
            getBalance();
          }
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
      }else{
        openNotificationWithIcon('error', 'Please select '+ chooseWallet +' wallet', "You can only trade 1 wallet per 1 round");
      }

    } catch (errorInfo) {
    }
  }

  const getBalance = () => {
    try {
      setLoading(true);
      getBalanceAccount()
        .then(res => {
          if (res && res.data.StatusCode === 401 || res.data.StatusCode === 400) {
            openNotificationWithIcon('error', 'Notification', res.data.Meg);
            return;
          }

          if (res && res.data.StatusCode === 200) {
            const practice = res.data.Reply;
            setPractice(practice);
            // const walletMoney = practice.filter(x => x.WalletDefault === true);
            //setDefaultPractice(walletMoney.WalletCode);

          }
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    } catch (errorInfo) {
    }
  }

  const getAmount = () => {
    if (selectPractice) {
      if (selectPractice == DEFAULT_WALLET_TRADE) {
        return practice && practice.length && practice.find(o => o.WalletCode == 'DEMO').BalanceFormat
      } else {
        return practice && practice.length && practice.find(o => o.WalletCode == selectPractice).BalanceFormat
      }

    } else {
      return 0
    }

  }

  const getMarketPrices = () => {
    try {
      setLoading(true);
      getMarketPrice({
        Pair: MONEY_TYPE_DEFAULT,
      })
        .then(res => {
          if (res && res.data.StatusCode === 401 || res.data.StatusCode === 400) {
            openNotificationWithIcon('error', 'Notification', res.data.Meg);
            return;
          }

          if (res && res.data.StatusCode === 200) {
            setMarketPrice(res.data.Reply[0].TradeWinPercent);
          }
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    } catch (errorInfo) {
    }
  }

  const getResultLast = () => {
    try {
      setLoading(true);
      getLastResult()
        .then(res => {
          if (res && res.data.StatusCode === 401 || res.data.StatusCode === 400) {
            openNotificationWithIcon('error', 'Notification', res.data.Meg);
            return;
          }

          if (res && res.data.StatusCode === 200) {
             let countUp=0;
            let countDown=0
            res.data.Reply.forEach(item => {
              if (item==1) {
                countDown+=1;
              }else if (item==2) {
                countUp +=1;
              }
            });
            setUp(countUp);
            setDown(countDown);
          }
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    } catch (errorInfo) {
    }
  }

  const handleChangePractice = (item) => {
    setSelectPractice(item);

  }

  useEffect(() => {
    getMarketPrices();
    getBalance();
    getResultLast();
  }, [])
  useEffect(() => {
    const socketConnect = socketSignalR();
    if (socketConnect) {
      if (socketConnect && socketConnect.state === "Disconnected") {
        socketConnect
          .start()
          .then(() => {
            socketConnect.on("serverTime", (e) => {
              const serverTime = parseInt(JSON.stringify(e));
              if (serverTime===3 || serverTime===33) {
                getResultLast();
              }

            });
          })
      }


      return () => {
        socketConnect.off("ServerTime");
        return null;
      };
    }
  }, []);
  // useEffect(() => {
  //   setTimeout(
  //     getResultLast,
  //     60000
  //   );
  // })

  useEffect(() => {
    if (tradingStore.loading) {
      getBalance();
    }
  }, [tradingStore.loading])


  useEffect(() => {
    setIsShowButtonDownUp(tradingStore.isShowButtonDownUp)
  }, [tradingStore.isShowButtonDownUp]);

  return (
    <Div100vh>
<div className="main mobile-trading trading-mobile">
      <StopDownUpModal
        visible={visibleModal}
        setVisible={setVisibleModal}
        data={dataModal}
      />
      <LastResultModal visible={visibleLastResultModal} setVisible={setVisibleLastResultModal} />
      <HeaderComponent />
      <div className="box-bottom-header">
        <div className="select">
          <span className="icon usdt"></span>
          <select name="">
            <option value="usdt">BTC/USDT</option>
          </select>
        </div>
        <div className="practice-number">
          <div className="box-select" onClick={() => setVisibleDrawerChangeAccount(true)}>
            {getIcon(selectPractice)}
            <div className={'info'}>
              <label> {selectPractice}</label>
              <h3> {getAmount()} </h3>
            </div>
            <img src={IconDolars} />
          </div>
        </div>
      </div>
      <DrawerChangeAccount
        visible={visibleDrawerChangeAccount}
        onClose={() => setVisibleDrawerChangeAccount(false)}
        destroyOnClose={true}
        practice={practice}
        onSubmit={handleChangePractice}
        value={selectPractice}
      />
      <div className="content" style={{ "max-height": (height - 428) + "px"  }}>
        <div className='open-order' onClick={() => setVisibleDrawerOrderMobile(true)}> {`Open Order >`} </div>
        <DrawerOrderMobile
          visible={visibleDrawerOrderMobile}
          onClose={()=> setVisibleDrawerOrderMobile(false)}
         />
        <div className="chart" style={{ "max-height": (height - 428) + "px"  }}>
          <Chart />
        </div>
      </div>
      <div className='box-bottom'>
        <div className='tab-result'>
          <TabsTradingHistory
            up={up}
            down={down}
            hoursAgo={hoursAgo}
            minAgo={minAgo}
          />
        </div>
        <div className="sideright">
          <div className="profit">
            <div className={'profit-content-top'}>
              <span className='label'> Profit</span>
              <span className="price-total">+{marketPrice}%</span>
              <span className="amount">{amount * marketPrice / 100 || 0} <span className='type-amount'> {selectPractice}</span> </span>
            </div>
            <div className={'profit-content-middle'}>
              <div className="practice">
                <div className="practice-amount">
                  <div className="amount">
                    <button className="btn minus" onClick={() => decrementMoney()}>-</button>
                    <div className='amount-input'>
                      <label style={{ color: '#888' }}>Amount</label>
                      <input name="qty" type="text" maxLength={5}
                        onChange={item => setAmount(item.target.value)}
                        onFocus={e => {
                          setVisibleDrawerChangeAmount(true)
                        }}
                        value={parseInt(amount) || 0} defaultValue={200000}
                      />
                    </div>
                    <button className="btn plus" onClick={() => incrementMoney()}>+</button>
                  </div>
                </div>
              </div>
            </div>
            <div className={'profit-content-bottom'}>
              <button disabled={counter < 30} className="btn down" onClick={() => handleStopUpDown(STOP_DOWN)}>
                DOWN
                <svg width={24} height={12} viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.23894 6.85562L2.76106 0.389541L7.74066e-07 3.1506L4.84956 7.98836C6.65487 9.79367 8.27139 10.9854 9.71091 11.5518C11.1386 12.1182 12.6254 12.1536 14.1711 11.658C15.3156 11.3512 16.3894 10.714 18.7257 8.41314L24 3.12701L21.2389 0.365944L17.3687 4.23615L14.6077 6.99721L14.2655 7.33939C13.0147 8.53114 10.7965 8.35414 9.23894 6.85562Z"
                    fill="white" />
                </svg>
              </button>
              <Time />
              <div className="btn-down-mobile">
                <button disabled={counter < 30} className="btn up" onClick={() => handleStopUpDown(STOP_UP)} >
                  <svg width={24} height={13} viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.7611 6.14438L21.2389 12.6105L24 9.84939L19.1504 5.01164C17.3451 3.20633 15.7286 2.01459 14.2891 1.44821C12.8614 0.881843 11.3746 0.846445 9.82891 1.34202C8.68437 1.6488 7.61062 2.28597 5.27434 4.58686L0 9.87299L2.76106 12.6341L6.63127 8.76385L9.39233 6.00279L9.73451 5.6606C10.9853 4.46886 13.2035 4.64585 14.7611 6.14438Z"
                      fill="white" />
                  </svg>
                UP
              </button>
                <audio className="audio-element">
                  <source src={setCommandSound}></source>
                </audio>
                <audio className="audio-element-result-win">
                  <source src={resultWinSound}></source>
                </audio>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DrawerChangeAmount
        visible={visibleDrawerChangeAmount}
        onClose={() => setVisibleDrawerChangeAmount(false)}
        onChangeAmount={value => setAmount(value)}
        amount={amount}
        marketPrice={marketPrice}
        destroyOnClose={true}
        selectPractice={selectPractice}
      />
    </div>
    </Div100vh>
  )
}
export default TradingComponent;
