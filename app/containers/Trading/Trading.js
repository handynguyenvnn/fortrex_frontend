import React, {useEffect, useState} from 'react';
import TradingChartComponent from "components/TradingChart";
import TradingOrderComponent from "components/TradingOrder";
import SideRightComponent from "components/SideRight";
import SideLeftComponent from "components/SideLeft";
import HeaderComponent from "components/Header";
import './style.scss';
import { isMobile } from 'react-device-detect';
import TradingComponent from "components/Trading";
import TradingBottom from "containers/Trading/TradingBottom";


const Trading = () => {

  if (isMobile) {
    return <TradingComponent />
  }
  return (
    <div className="main">
      <HeaderComponent />
      <SideLeftComponent />
      <div className="content"><TradingChartComponent/>
      <TradingBottom />
      </div>
      <SideRightComponent />
    </div>
  );
};
export default Trading;
