import React, { useEffect, useState } from "react";
import { getTransactionHistory } from "services";
import TableCustom from "components/TableCustom/TableCustom";
import Filter from "./Filter";
import { useWalletBalanceStore } from "store";
import { FilterOutlined } from "@ant-design/icons";

import "./index.scss";

const TransactionHistory = () => {
  const [, updateWalletBalanceStore] = useWalletBalanceStore();
  const [isFilterVisible, setFilterVisible] = useState(false);
  const walletBalanceColumn = [
    {
      title: "No",
      dataIndex: "Id",
      key: "Id",
      align: "left",
    },
    {
      title: "Amount",
      dataIndex: "StrAmount",
      key: "StrAmount",
      align: "left",
    },
    {
      title: "Information",
      dataIndex: "Description",
      key: "Description",
      align: "left",
    },
    {
      title: "From",
      dataIndex: "FromUser",
      key: "FromUser",
      align: "right",
      render: (text) => (text ? `${text}` : ""),
    },
    {
      title: "CreateDate",
      dataIndex: "StrCreateOn",
      key: "StrCreateOn",
      align: "right",
      render: (text) => (text ? `${text}` : ""),
    },
    {
      title: "Status",
      dataIndex: "StatusName",
      key: "StatusName",
      align: "right",
      render: (text) => (text ? `${text}` : ""),
    },
  ];

  useEffect(() => {
    updateWalletBalanceStore((draft) => {
      draft.isReloadTable = true;
    });
  }, []);

  return (
    <div>
      <div className="dashboard-top">
        <div className="content-left full-width mobile-transaction">
          <div className="order">
            <div className="title">
              <h3 className="ttl">Transaction History</h3>
              <div
                className="mobile-transaction_icon"
                onClick={() => {
                  console.log("clicked");
                  setFilterVisible(true);
                }}
              >
                <FilterOutlined />
              </div>
            </div>
            <TableCustom
              useStore={useWalletBalanceStore}
              columns={walletBalanceColumn}
              apiGetList={getTransactionHistory}
            />
          </div>
        </div>
      </div>
      {isFilterVisible && (
        <Filter
          visible={isFilterVisible}
          onClose={() => {
            setFilterVisible(false);
          }}
        />
      )}
    </div>
  );
};
export default TransactionHistory;
