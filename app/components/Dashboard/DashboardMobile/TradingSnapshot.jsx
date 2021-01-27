//import CollapseTradingSnapShotMobile from '@components/CollapseTradingSnapShotMobile'
import CollapseTradingSnapShotMobile from "components/CollapseTradingSnapShotMobile/index";
import React, {useEffect, useState} from 'react';
import {getDashboardSnapshot} from "services";
import './styles.scss'

const TradingSnapshot = props => {
    const [dataDatable, setDataTable] = useState([]);
    const DashboardSnapshot = () => {
       
        try {
            getDashboardSnapshot()
                .then(res => {
                    if (res && res.data.StatusCode === 200) {
                        setDataTable(res.data.Reply);
                    }
                })
                .catch()
                .finally(() => {}
                );
        } catch (errorInfo) {
        }
    }
    const renderTableDashboardSnapshot = () => {
        return  dataDatable.length > 0 && dataDatable.map((item, index) => {
            const {
                Token,Vol,Profit
            } = item;
            return (
               
                <CollapseTradingSnapShotMobile 
                    icon={"https://static.fortrex.io/images/"+Token+".png?v=2"}
                    title={Token}
                    volume={Vol}
                    netProfit={Profit}
                    defaultOpen={index==0}
                />
          
            )
        })
    }
    
    useEffect( () => {
        DashboardSnapshot();
    }, [])
    return (
        <div className='trading-snapshot'> 
            <h3> Your Trading Snapshot </h3>
            {renderTableDashboardSnapshot()}
        </div>
    )
}

export default TradingSnapshot