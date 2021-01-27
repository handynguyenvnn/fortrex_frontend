import { Col, Progress, Row } from 'antd'
import React from 'react'

const TradingExperience = props => {

    const { win } = props
    
    return (
        <div className='trading-experience'> 
            <h3> Your Trading Experience</h3>
            <div className='expericence'>
                <div className='number'>
                    <Row gutter={[0, 0]} justify='center'> 
                        <Col span={12}>
                            <h3> 05</h3>
                            <span> Successive Victory </span>
                        </Col>
                        <Col span={12}>
                            <h3>06</h3>
                            <span> Ave. Daily Trade</span>
                        </Col>
                        <Col span={12}>
                            <h3> 69 <label> USDT</label></h3> 
                            <span> Ave. Order Value </span>
                        </Col>
                        <Col span={12}>
                            <h3>+96 <label> USDT</label></h3>
                            <span> Best trade</span>
                        </Col>
                    </Row>
                </div>
                <div className='progress'>
                    <Progress 
                        type="circle" 
                        percent={win}
                        strokeLinecap='square'
                        strokeWidth={6}
                        width={240}
                        strokeColor='#22D291'
                        trailColor='#EB5757'
                        format={percent => renderPercent(percent)}
                        />
                </div>
            </div>
        </div>
    )
}

const renderPercent = winPercent => {
    return (
        <div className='render-percent'> 
            <div className='line'> 
                <h3 className='color-green'> {winPercent}</h3>
                <span> Win round </span>
            </div>
            <div className='line'>
                <h3 className='color-red'> {100 - winPercent}</h3>
                <span> Lose round </span>
            </div>
        </div>
    )
}

export default TradingExperience