import React, { useState } from 'react';
import Board from 'components/Dashboard';
import { isMobile } from 'react-device-detect';
import DashBoardMobile from '@components/Dashboard/DashboardMobile';


const Dashboard = () => {
    if(isMobile) return <DashBoardMobile />
    return (
        <Board />
    );
};
export default Dashboard;
