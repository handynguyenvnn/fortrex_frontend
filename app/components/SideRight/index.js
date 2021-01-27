import React, { useEffect, useState } from 'react';
import { Select, Button, Modal } from 'antd';
import { getBalanceAccount, login, pushOrder, getMarketPrice, getLastResult } from "services";
import { _setCookie, openNotificationWithIcon, socketSignalR } from "utils/utils";
import {
  PAGE_PATHS,
  STOP_DOWN,
  STOP_UP,
  DEFAULT_WALLET_TRADE,
  MONEY_TYPE_DEFAULT,
  ENUM_WALLET_TRADE
} from "constants/constant";
import StopDownUpModal from "components/Modal/StopDownUpModal";
import Time from 'components/Time';
import './style.scss';
import { useTradingStore } from "store";
import setCommandSound from '../../../public/sound/setcommand.mp3';
import resultWinSound from '../../../public/sound/resultwin.mp3';

const { Option } = Select;

const SideRightComponent = () => {
  let resultOrders = [];
  // setState({
  //   resultOrders: []
  // });
  const [typeWalletTrade, setTypeWalletTrade] = useState(1);
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
  const [counter, setCounter] = useState(0);
  const [counterMain, setCounterMain] = useState(0);
  const [chooseWallet, setchooseWallet] = useState('');

  useEffect(() => {
    const socketConnect = socketSignalR();
    if (socketConnect) {
      if (socketConnect && socketConnect.state === "Disconnected") {
        socketConnect
          .start()
          .then(() => {
            socketConnect.on("serverTime", (e) => {
              const lastsecond = parseInt(JSON.stringify(e));
              setCounter((59 - lastsecond));
              if (lastsecond === 18) {
                callaudioNotifyPushOrder("audioNotifyPushOrder");
              } else if (lastsecond === 1 && resultOrders.length > 0) {
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

  // useEffect( () => {
  //   if(counter > 30){
  //     updateTradingStore( draft => {
  //       draft.isShowButtonDownUp = false;
  //     });
  //    setCounter(counter-30);
  //   } else {
  //     updateTradingStore( draft => {
  //       draft.isShowButtonDownUp = true;
  //     });
  //     //setCounter(counter);
  //   }

  // }, [counter])
  const callaudioNotifyPushOrder = (audioname) => {
    let sClick = document.getElementById(audioname);
    sClick.play();

  }
  const handleClickMultiplicationMoney = (value) => {
    setAmount(parseInt(amount) * parseInt(value));
  }
  const handleClickAddMoney = (value) => {
    setAmount(parseInt(amount) + parseInt(value));
  }

  const handleClickMaxMoney = value => {
    setAmount(practice.filter(x => x.WalletCode === value)[0].Balance);
  }

  const incrementMoney = () => {
    setAmount(parseInt(amount) + 1);
  }

  const decrementMoney = () => {
    setAmount(parseInt(amount) - 1)
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
      //callaudioNotifyPushOrder("audioPushOrder");
      const byTypeName = ENUM_WALLET_TRADE.filter(x => x.value === byType)[0].label;
      if (chooseWallet==='' || byTypeName == chooseWallet) {
        setchooseWallet(byTypeName);
        pushOrder(body)
        .then(res => {
          if (res && res.data.StatusCode === 401 || res.data.StatusCode === 400) {
            openNotificationWithIcon('error', 'Notification', res.data.Meg);
            callaudioNotifyPushOrder("audioerror");
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
        //openNotificationWithIcon('error', 'Please select '+ chooseWallet +' wallet', "You can only trade 1 wallet per 1 round");
        openNotificationWithIcon('error', 'Please select  wallet', "You can only trade 1 wallet per 1 round");
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
            // setDefaultPractice(walletMoney.WalletCode);
          }
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    } catch (errorInfo) {
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
            setDown(res.data.Reply._Down);
            setUp(res.data.Reply._Up);
            setHoursAgo(res.data.Reply._1HourAgo);
            setMinAgo(res.data.Reply._1HourAgo);
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
  }, [])

  // s

  useEffect(() => {
    if (tradingStore.loading) {
      getBalance();
    }
  }, [tradingStore.loading])


  useEffect(() => {
    setIsShowButtonDownUp(tradingStore.isShowButtonDownUp);
  }, [tradingStore.isShowButtonDownUp])

  return (
    <div className="sideright">
      <StopDownUpModal
        visible={visibleModal}
        setVisible={setVisibleModal}
        data={dataModal}
      />
      <div className="practice">
        <div className="practice-number">
          <p><span style={{ marginBottom: 10 }}>{selectPractice}</span></p>
          <div className="box-select" style={{ width: '210px' }}>
            <Select
              onChange={item => handleChangePractice(item)}
              notFoundContent
              value={selectPractice}
              defaultValue={defaultPractice}
            >
              {(practice || []).map((item, index) => (
                <Option value={item.WalletCode} key={item.WalletCode} >
                  {item.BalanceFormat} <br />{item.WalletName}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="practice-amount">
          <div className="amount">
            <p>Amount</p>
            <button className="btn plus" onClick={() => incrementMoney()}>+</button>
            <input name="qty" type="text" maxLength={5} onChange={item => {
              setAmount(item.target.value)
            }} value={amount} />
            <button className="btn minus" onClick={() => decrementMoney()}>-</button>
          </div>
          <div className="number">
            <a onClick={() => handleClickAddMoney(5)}>+5</a>
            <a onClick={() => handleClickAddMoney(10)}>+10</a>
            <a onClick={() => handleClickAddMoney(20)}>+20</a>
            <a onClick={() => handleClickAddMoney(50)}>+50</a>
            <a onClick={() => handleClickAddMoney(100)}>+100</a>
            <a onClick={() => handleClickMaxMoney(selectPractice)}>MAX</a>
            <a onClick={() => handleClickMultiplicationMoney(2)}>x2</a>
            <a onClick={() => handleClickMultiplicationMoney(3)}>x3</a>
            <a onClick={() => handleClickMultiplicationMoney(5)}>x5</a>
          </div>
        </div>
      </div>
      <div className="profit">
        <h3 className="title">Profit</h3>
        <p className="number">+{marketPrice}%</p>
        <p className="price">+{amount * marketPrice / 100}</p>
        <button disabled={counter < 30} className="btn up" onClick={() => handleStopUpDown(STOP_UP)}>
          <svg width={24} height={13} viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.7611 6.14438L21.2389 12.6105L24 9.84939L19.1504 5.01164C17.3451 3.20633 15.7286 2.01459 14.2891 1.44821C12.8614 0.881843 11.3746 0.846445 9.82891 1.34202C8.68437 1.6488 7.61062 2.28597 5.27434 4.58686L0 9.87299L2.76106 12.6341L6.63127 8.76385L9.39233 6.00279L9.73451 5.6606C10.9853 4.46886 13.2035 4.64585 14.7611 6.14438Z"
              fill="white" />
          </svg>
            UP
          </button>
        <Time />
        <button disabled={counter <= 30} className={counter <= 30 ? "btn down button-disable" : "btn down"} onClick={() => handleStopUpDown(STOP_DOWN)}>
          <svg width={24} height={12} viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.23894 6.85562L2.76106 0.389541L7.74066e-07 3.1506L4.84956 7.98836C6.65487 9.79367 8.27139 10.9854 9.71091 11.5518C11.1386 12.1182 12.6254 12.1536 14.1711 11.658C15.3156 11.3512 16.3894 10.714 18.7257 8.41314L24 3.12701L21.2389 0.365944L17.3687 4.23615L14.6077 6.99721L14.2655 7.33939C13.0147 8.53114 10.7965 8.35414 9.23894 6.85562Z"
              fill="white" />
          </svg>
            DOWN
          </button>
        <audio className="audio-element">
          <source src={setCommandSound}></source>
        </audio>
        <audio className="audio-element-result-win">
          <source src={resultWinSound}></source>
        </audio>
        <audio id="audioPushOrder">
          <source src="https://static.fortrex.io/audio/pushOrder.mp3"></source>
        </audio>
        <audio id="audioNotifyPushOrder">
          <source src="https://static.fortrex.io/audio/NotifyPushOrder2.mp3"></source>
        </audio>
        <audio id="audiowin">
          <source src="https://static.fortrex.io/audio/win.mp3"></source>
        </audio>
        <audio id="audioerror">
          <source src="https://static.fortrex.io/audio/error.mp3"></source>
        </audio>
      </div>
      {/* <div className="results">
          <h3 className="title">Last 100 results 2</h3>
          <h3 className="ttl">Up<span className="up">{up}</span><span className="line">|</span><span
              className="down">{down}</span>Down</h3>
          <ul className="count">
            <li className="bg1"/>
            <li className="bg1"/>
            <li className="bg1"/>
            <li className="bg1"/>
            <li className="bg2"/>
            <li className="bg2"/>
            <li className="bg2"/>
            <li className="bg2"/>
            <li className="bg2"/>
            <li className="bg2"/>
          </ul>
          <h3 className="title">Last seen sequence</h3>
          <h3 className="ttl2"> {hoursAgo} hour ago</h3>
          <ul className="number">
            <li className="bg1">x5</li>
            <li className="bg1"/>
            <li className="bg1"/>
            <li className="bg1"/>
            <li className="bg1"/>
            <li className="bg2"/>
          </ul>
          <h3 className="ttl2 mt17">{minAgo} mins ago</h3>
          <ul className="number">
            <li className="bg1">x5</li>
            <li className="bg1"/>
            <li className="bg1"/>
            <li className="bg1"/>
            <li className="bg1"/>
            <li className="bg3"/>
          </ul>
        </div> */}
    </div>
  )
}

export default SideRightComponent;
