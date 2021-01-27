import React, {useEffect, useState} from 'react';
import TradingOrderComponent from "components/TradingOrder";
import './style.scss';


import {Tabs} from 'antd';

import imgRed from '../../components/assets/img/red.jpg';
import imgGreen from '../../components/assets/img/green.jpg';
import {getLastResult} from "services";
import {openNotificationWithIcon,socketSignalR} from "utils/utils";
import RenderPerCentUpDown from "containers/Trading/RenderPerCentUpDown";
import RenderDropsOfWaterUpDown from "containers/Trading/RenderDropsOfWaterUpDown";

const {TabPane} = Tabs;

const TradingBottom = () => {
  const [dropsWaters, setdropsWaters] = useState([]);
  const [up, setUp] = useState(0);
  const [down, setDown] = useState(0);
  const [hoursAgo, setHoursAgo] = useState(0);
  const [minAgo, setMinAgo] = useState(0);

  const getResultLast = () => {
    try {
      getLastResult()
        .then(res => {
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
            // setDown(res.data.Reply._Down);
            // setUp(res.data.Reply._Up);
            // setHoursAgo(res.data.Reply._1HourAgo);
            // setMinAgo(res.data.Reply._1HourAgo);
          }
        })
        .catch()
        .finally(() => {
        });
    } catch{
    }
  }
  // useEffect(() => {
  //   setTimeout(() => {
  //       getResultLast();
  //     }, 15000
  //   );
  // })
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
  useEffect(() => {
    getResultLast();
  }, []);


  return (
    <div class="tab-trading">
      <div class="tab-static-group">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Statistic" key="1">
            <div className="box-static">
              <div className="item-static">
                <h3 className="title-static">Last 100 results</h3>
                <div className="group-pra-static">
                  <p>Up <span className="green-pra-static">{up}</span></p>
                  <p><span className="red-pra-static">{down}</span> Down</p>
                </div>
                <div className="group-level-static">
                  <RenderPerCentUpDown up={up} down={down} />
                </div>
              </div>
              <div className="item-static">
                <h3 className="title-static">Last seen sequence</h3>
                <div className="group-time-static">
                  <div className="item-fist-time">
                    <p className="hour-title-static">{hoursAgo} hour ago</p>
                    <p className="pra-thum-time">
                      <img src={imgGreen} alt=""/>
                      <img src={imgGreen} alt=""/>
                      <img src={imgGreen} alt=""/>
                      <img src={imgGreen} alt=""/>
                      <img src={imgGreen} alt=""/>
                      <img src={imgRed} alt=""/>
                    </p>
                  </div>
                  <div className="item-fist-time">
                    <p className="hour-title-static">{minAgo} mins ago</p>
                    <p className="pra-thum-time">
                      <img src={imgGreen} alt=""/>
                      <img src={imgGreen} alt=""/>
                      <img src={imgGreen} alt=""/>
                      <img src={imgGreen} alt=""/>
                      <img src={imgGreen} alt=""/>
                      <img src={imgGreen} alt=""/>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
         <TabPane tab="Last results" key="2">
            <div className="box-static">
              <div className="item-static">
                <h3 className="title-static">Last 100 results</h3>
                <div className='title-total'>
                <span >UP <b className='total-up'>{up}</b></span>
                <span className='title-splite'>  |  </span>
                <span > <b className='total-down'>{down}</b> Down</span>
              </div>
                <div className="group-level-static">
                
                  <RenderDropsOfWaterUpDown/>
                </div>
              </div>
            
            </div>
          </TabPane>
          <TabPane tab="Open Order" key="3">
            <TradingOrderComponent/>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
};
export default TradingBottom;
