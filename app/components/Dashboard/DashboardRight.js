import React, {useEffect, useState} from 'react';
import {getBalanceAccount, yourTradingExperience} from "services";
import {openNotificationWithIcon} from "utils/utils";

const DashboardRight = props => {

    const [data, setData]= useState(null);
    useEffect( () => {
      try {
        yourTradingExperience()
          .then(res => {
            if (res && res.data.StatusCode === 401 || res.data.StatusCode === 400) {
              openNotificationWithIcon('error', 'Notification', res.data.Meg);
              return;
            }

            if (res && res.data.StatusCode === 200) {
              setData(res.data.Reply);
            }
          })
          .catch()
          .finally(() => {
          });
      } catch (errorInfo) {
      }
    }, [])

    return (
        <div className="content-right">
            <div className="experience">
                <div className="title">
                    <h3 className="ttl">Your Trading Experience</h3>
                </div>
                <ul className="list-number">
                    <li>
                        <div className="box-number">
                            <p className="number">
                              {data && data.Total_Win_Max}
                            </p>
                            <p className="desc">
                                Successive Victory
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="box-number">
                            <p className="number">
                              {data && data.Avg_Trade_On_Day}
                            </p>
                            <p className="desc">
                                Ave. Daily Trade
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="box-number">
                            <p className="number">
                              {data && data.Avg_Amount} <span>USDT</span>
                            </p>
                            <p className="desc">
                                Ave. Order Value
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="box-number">
                            <p className="number">
                              {data && data.Max_Receive_Bonus} <span>USDT</span>
                            </p>
                            <p className="desc">
                                Best Trade
                            </p>
                        </div>
                    </li>
                </ul>
                <ul className="count">
                    <li className="bg1"><a href="#"></a></li>
                    <li className="bg1"><a href="#"></a></li>
                    <li className="bg1"><a href="#"></a></li>
                    <li className="bg1"><a href="#"></a></li>
                    <li className="bg2"><a href="#"></a></li>
                    <li className="bg2"><a href="#"></a></li>
                    <li className="bg2"><a href="#"></a></li>
                    <li className="bg2"><a href="#"></a></li>
                    <li className="bg2"><a href="#"></a></li>
                    <li className="bg2"><a href="#"></a></li>
                </ul>
            </div>
        </div>
    );
};
DashboardRight.propTypes = {};
export default DashboardRight;
