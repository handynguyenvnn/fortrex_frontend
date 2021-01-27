import React from 'react'
import { Tabs } from 'antd'
import TradingHistory from './TradingHistory'
import OverView from './OverView'
import './styles.scss'

const { TabPane } = Tabs

const DashBoardMobile = props => {
    return (
        <div className='dashboard-mobile'>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Overview" key="1">
                    <OverView />
                </TabPane>
                <TabPane tab="Trade History" key="2">
                    <TradingHistory />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default DashBoardMobile