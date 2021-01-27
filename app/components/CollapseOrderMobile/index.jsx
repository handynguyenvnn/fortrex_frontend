import React from 'react'
import { Collapse, Space, Table } from 'antd';
import './styles.scss'

const { Panel } = Collapse;
const CollapseOrderMobile = props => {
    const {icon, title, orderID,placeTime,pair,status,statusName, expandIconPosition, defaultOpen } = props

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
                <Panel header={getHeader()} key="1">
                    <table>
                    <tr> 
                        <td>Order ID</td>
                        <td>{orderID}</td>
                    </tr>
                    <tr> 
                        <td>Place Time</td>
                        <td>{placeTime}</td>
                    </tr>
                    <tr> 
                        <td>Pair</td>
                        <td>{pair}</td>
                    </tr>
                    <tr> 
                        <td>Status</td>
                        <td className={status>0?"color-win": status<0?"color-lose":"color-pending"}>{statusName}</td>
                    </tr>
                    </table>
                </Panel>
            </Collapse>
        </div>
    )
}

export default CollapseOrderMobile