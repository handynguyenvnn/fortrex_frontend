import React, {useEffect, useState} from 'react';
import {Layout} from 'antd';
import {useLocation} from 'react-router-dom';
import {pushOrder, trading} from "services";
import {openNotificationWithIcon,socketSignalR} from "utils/utils";
import {useTradingStore} from "store";
import { isMobile } from 'react-device-detect';
import {TRADING_ORDER_PENDING, ENUM_WALLET_TRADE} from "constants/constant";
import TradingOrderMobile from './TradingOrderMobile';

const TradingOrderComponent = () => {
    const [dataDatable, setDataTable] = useState([]);
    const [tradingStore, updateTradingStore] = useTradingStore();
    const getTradingHistory = () => {
        try {
            trading({params: {PageIndex: 0, PageSize: 50, Type: TRADING_ORDER_PENDING}})
                .then(res => {
                    if (res && res.data.StatusCode === 401 || res.data.StatusCode === 400) {
                        openNotificationWithIcon('error', 'Notification', res.data.Meg);
                        return;
                    }

                    if (res && res.data.StatusCode === 200) {

                        setDataTable(res.data.Reply.Item);
                    }
                })
                .catch()
                .finally(() => {}
                );
        } catch (errorInfo) {
        }
    }
    const renderTableData = () => {
        return  dataDatable.length > 0 && dataDatable.map((item, index) => {
            const {
              OrderID, Pair,
                Amount,  Type, ByType, Status, StatusName, PlaceTime,
                IsDemo
            } = item;
            return (
                <tr key={OrderID}>
                    <td>{OrderID}</td>
                    <td>{PlaceTime}</td>
                    <td>{Pair}</td>
                    <td>{ Type ? (
                        <button className="btn up">
                            <svg width="18" height="10" viewBox="0 0 18 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.0708 4.36195L15.9292 9.2115L18 7.14071L14.3628 3.51239C13.0089 2.15841 11.7965 1.2646 10.7168 0.839823C9.64602 0.415044 8.53097 0.388496 7.37168 0.760177C6.51327 0.990266 5.70796 1.46814 3.95575 3.19381L0 7.15841L2.0708 9.2292L4.97345 6.32655L7.04425 4.25575L7.30088 3.99912C8.23894 3.10531 9.90265 3.23805 11.0708 4.36195Z"
                                    fill="white"/>
                            </svg>
                        </button>
                    ) : (
                        <button className="btn down">
                            <svg width="18" height="10" viewBox="0 0 18 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.9292 5.63805L2.0708 0.788494L5.80549e-07 2.85929L3.63717 6.48761C4.99115 7.84159 6.20354 8.7354 7.28319 9.16018C8.35398 9.58495 9.46903 9.6115 10.6283 9.23982C11.4867 9.00973 12.292 8.53186 14.0442 6.80619L18 2.84159L15.9292 0.770796L13.0265 3.67345L10.9558 5.74425L10.6991 6.00088C9.76106 6.89469 8.09735 6.76195 6.9292 5.63805Z"
                                    fill="white"/>
                            </svg>
                        </button>
                    )}</td>
                    <td>{Amount}</td>
                    <td>{ ENUM_WALLET_TRADE.filter( x => x.value === ByType)[0].label }</td>
                    <td className={Status>0?"color-win": Status<0?"color-lose":"color-pending"}>{StatusName}</td>
                </tr>
            )
        })
    }

    useEffect( () => {
        getTradingHistory();
    }, [])
    useEffect( () => {
      if(tradingStore.loading){
        updateTradingStore( draft => {
          draft.loading = false;
        })
        getTradingHistory();
      }
    })
    useEffect(() => {
      const socketConnect = socketSignalR();
      if (socketConnect) {
        if (socketConnect && socketConnect.state === "Disconnected") {
          socketConnect
            .start()
            .then(() => {
              socketConnect.on("serverTime", (e) => {
                const serverTime = parseInt(JSON.stringify(e));
                if (serverTime===2) {
                  getTradingHistory();
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
  if(isMobile){
    return (
      <TradingOrderMobile />
    )
  }
    return (
            <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Place time</th>
                      <th>Pair</th>
                      <th>Up/Down</th>
                      <th>Invt. amount</th>
                      <th>Account</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderTableData()}
                  </tbody>
                </table>
        </div>
    )
}

export default TradingOrderComponent;
