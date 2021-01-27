import React, {useEffect} from 'react';
import {Layout} from 'antd';
import {useLocation} from 'react-router-dom';
import Chart from "@components/Chart";
import { loadScript, loadActiveCssInternal } from "../common/script";
import SideRightComponent from "components/SideRight";

const {Header} = Layout;

const TradingChartComponent = () =>{
    //      loadActiveCssInternal();
    useEffect(() => {
        loadScript();
        return function() {
            return null;
        };
    }, []);
    return <Chart/>
}
export default TradingChartComponent;
