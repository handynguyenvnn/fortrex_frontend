import React, {useEffect, useMemo, useState} from 'react';
import {yourTradingExperience} from "services";
import {_setCookie, openNotificationWithIcon} from "utils/utils";
import {history} from "utils";
import DashboardLeft from "components/Dashboard/DashboardLeft";
import DashboardRight from "components/Dashboard/DashboardRight";
import './style.scss';

const DashboardTop = props => {
    const [yourTrading, setYourTrading] = useState(null);
    const getYourTradingExperience = () => {
        try {
            yourTradingExperience().then(res => {
                if (res && res.data.StatusCode === 401) {
                    openNotificationWithIcon('error', 'Notification', res.data.Meg);
                    return;
                }
                if (res && res.data.StatusCode === 200) {
                }
            })
        } catch (e) {
        }
    }

    useEffect(() => {
        getYourTradingExperience();
    }, [])

    return (
        <div className="dashboard-top">
            <DashboardLeft/>
            <DashboardRight/>
        </div>
    );
};
DashboardTop.propTypes = {};
export default DashboardTop;
