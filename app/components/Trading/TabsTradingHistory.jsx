import React from 'react'
import { Tabs } from 'antd'
import ResultItem from './ResultItem'
import TabsStatistic from './TabsStatistic'

const { TabPane } = Tabs

const getUpDownBalance = (upCount, downCount) => {
    return(
        <div className='up-down-balance'> 
            <div className='up'> <span> Up</span> <span className='color-green'> {upCount || 0}</span></div>
            <div className='middle'> | </div>
             <div className='down'> <span className='color-red'> {downCount || 0}</span> <span> Down</span> </div>
        </div>
    )
}

const TabsTradingHistory = props => {
    const { up, down } = props

    return (
        <Tabs defaultActiveKey="1"
            tabBarExtraContent={{right: getUpDownBalance(up, down)}}
        >
            <TabPane tab="Last Results" key="1" className={'last-result'}>
                <ResultItem />
            </TabPane>
            <TabPane tab="Statistic" key="2">
                <TabsStatistic 
                    {...props}
                />
            </TabPane>
        </Tabs>
    )
}

export default TabsTradingHistory