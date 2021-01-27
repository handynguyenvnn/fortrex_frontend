import React, {useEffect} from 'react';
import { trading } from "services";
import TableCustom from "components/TableCustom/TableCustom";
import {useDashboardStore} from "store/dashboardStore";
import {ENUM_WALLET_TRADE} from "constants/constant";
import higherIcon from '../../assets/images/up.svg';
import lowerIcon from '../../assets/images/down.svg';

const yourTradingExperienceColumn = [
  {
    title: 'No',
    dataIndex: 'OrderID',
    key: 'OrderID',
    align: 'center'
  },
  {
    title: 'Assets',
    dataIndex: 'Pair',
    key: 'Pair',
    align: 'left'
  },
  {
    title: 'Opening Price',
    dataIndex: 'OpeningPrice',
    key: 'OpeningPrice',
    align: 'center'
  },
  {
    title: 'Open Time',
    dataIndex: 'PlaceTime',
    key: 'PlaceTime',
    align: 'center'
  },
  {
    title: 'End Price',
    dataIndex: 'ClosingPrice',
    key: 'ClosingPrice',
    align: 'center'
  }
  ,
  {
    title: 'Expire Time',
    dataIndex: 'CloseTime',
    key: 'CloseTime',
    align: 'center'
  }
  ,
  {
    title: 'Direction',
    dataIndex: 'Type',
    key: 'Type',
    align: 'center',
    render: item => item ? <img height={24} width={36} src={higherIcon}/> :
      <img height={24} width={36} src={lowerIcon}/>
  },
  {
    title: 'Amount',
    dataIndex: 'Amount',
    key: 'Amount',
    align: 'right'
  },
  {
    title: 'Result',
    dataIndex: 'StatusName',
    key: 'StatusName',
    align: 'right',
    render: (item, record) => <p
      className={record.Status > 0 ? "color-win" : record.Status < 0 ? "color-lose" : "color-pending"}>{item}</p>
  },
  {
    title: 'Profits',
    dataIndex: 'Profit',
    key: 'Profit',
    align: 'right'
  },
  {
    title: 'Account',
    dataIndex: 'ByType',
    key: 'ByType',
    align: 'right',
    render: item => ENUM_WALLET_TRADE.filter( x => x.value === item).length > 0 ? ENUM_WALLET_TRADE.filter( x => x.value === item)[0].label : null,
  }
  ];
  
const TradingHistory = props => {
    const [dashboardStore, updateDashboardStore] = useDashboardStore();
    useEffect(() => {
      updateDashboardStore(draft => {
        draft.pageIndex = 0;
        draft.pageSize = 10;
        draft.isRefreshTable = !dashboardStore.isRefreshTable;
        draft.isReloadTable = true;
      });
  
    }, [])
    return (
      <div className="dashboard-trading-history-mobile">
        <div className="title">
          <h3 className="ttl">Trading History</h3>
        </div>
        <div className="table f-width height-table2 trading-history">
          <TableCustom useStore={useDashboardStore} columns={yourTradingExperienceColumn} apiGetList={trading}/>
        </div>
      </div>
    );
  };
export default TradingHistory