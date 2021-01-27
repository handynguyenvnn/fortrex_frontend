import React, {useEffect, useState} from 'react';
import CollapseOrderMobile from '@components/CollapseOrderMobile'
import higherIcon from '../../assets/images/up.svg';
import lowerIcon from '../../assets/images/down.svg';
import './styles.scss'
import {pushOrder, trading} from "services";
import {TRADING_ORDER_PENDING, ENUM_WALLET_TRADE} from "constants/constant";


const TradingOrderMobile = props => {
    const [dataDatable, setDataTable] = useState([]);
    useEffect( () => {
        getTradingHistory();
    }, [props.visible == true]);

    const getTradingHistory = () => {
        try {
            trading({params: {PageIndex: 0, PageSize: 20, Type: TRADING_ORDER_PENDING}})
                .then(res => {
                    console.log(res);
                    if (res && res.data.StatusCode === 200) {
                        setDataTable(res.data.Reply.Item);
                    }
                })
                .catch()
                .finally(() => {}
                );
        } catch{
        }
    }
    const renderTableData = () => {
        return  dataDatable.length > 0 && dataDatable.map((item, index) => {
            const {
              OrderID, Pair,
                Amount,  Type, ByType, Status, StatusName, PlaceTime,
                IsDemo
            } = item;
            return (
                <CollapseOrderMobile
                icon={Type?higherIcon:lowerIcon}
                title={Amount + " " + ENUM_WALLET_TRADE.filter( x => x.value === ByType)[0].label  }
                orderID = {OrderID}
                placeTime = {PlaceTime}
                pair = {Pair}
                status = {Status}
                statusName = {StatusName}
                defaultOpen={index==0}
            />
            )
        })
    }
    return(
        <div className='trading-order-mobile'>
             {renderTableData()}
        </div>
    )
}

export default TradingOrderMobile
