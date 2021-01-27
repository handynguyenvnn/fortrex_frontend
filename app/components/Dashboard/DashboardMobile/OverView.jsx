import React from 'react'
import TradingExperience from './TradingExperience'
import TradingSnapshot from './TradingSnapshot'

const OverView = props => {
    return (
        <div className={'dashboard-overview-mobile'}> 
            <TradingExperience win={60} />
            <TradingSnapshot />
        </div>
    )
}

export default OverView