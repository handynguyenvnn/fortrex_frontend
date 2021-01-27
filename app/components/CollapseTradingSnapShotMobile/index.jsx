import React from 'react'
import { Collapse, Space, Table } from 'antd';
import './styles.scss'

const { Panel } = Collapse;
const CollapseTradingSnapShotMobile = props => {
    const {icon, title, volume,netProfit, expandIconPosition, defaultOpen } = props

    const getHeader = () => {
        return(
            <div className='collapse-order-mobile-header'> 
                <img src={icon} />
                <h3> {title}</h3>
            </div>
        )
    }
    return(
        <div className='collapse-order-mobile'>
            <Collapse
                expandIconPosition={expandIconPosition || 'right'}
                defaultActiveKey={defaultOpen? '1': ''}
            >
                <Panel header={getHeader()} key={volume}>
                    <table>
                    <tr> 
                        <td>Volume</td>
                        <td>{volume}</td>
                    </tr>
                    <tr> 
                        <td>Net Profit</td>
                        <td>{netProfit}</td>
                    </tr>
                    </table>
                </Panel>
            </Collapse>
        </div>
    )
}

export default CollapseTradingSnapShotMobile