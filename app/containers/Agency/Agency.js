import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Spin } from 'antd';
import ActivePackage from 'components/Modal/ActivePackage';

import { PACKAGE_TYPE, DATE_FORMATTER_STRING } from 'constants/constant';
import { agencyGetPackage, agencyInvestHistory } from 'services';
import TableCustom from 'components/TableCustom/TableCustom';
import { useAgencyStore } from 'store';
import {getBalanceAccount} from "services";
import './style.scss';
import { isMobile } from 'react-device-detect';
import AgencyComponent from "components/Agency";
import { 
  Tabs,
  Col,
  Row,
  Button,
  Select
 } from 'antd';
 
 import { useMedia } from "hooks/useMedia";
 import Mobile from "./Mobile";
 
const Agency = () => {
  const { isDesktopOrLaptop, isTabletOrMobile } = useMedia();

  const [store, updateStore] = useAgencyStore();
  const [loading, setLoading] = useState(false);
  const [packageChosen, setPackageChosen] = useState({});
  const [visibleActivePackage, setVisibleActivePackage] = useState(false);
 
  const [packageType, setPackageType] = useState(null);
  const [agencyPackage, setAgencyPackage] = useState([]);
  const [walletusd, setWalletusd] = useState(null);
  const fetchAgencyPackage = () => {
    setLoading(true);
    agencyGetPackage()
      .then((res) => {
        if (res && res.data && res.data.Reply) {
          setAgencyPackage(res.data.Reply);
        }
      })
      .catch()
      .finally(() => {
        setLoading(false);
        updateStore((draft) => {
          draft.isReloadPackage = false;
        });
      });
  };

  const getBalance = () => {
    try {
      getBalanceAccount()
        .then((res) => {
          if (
            (res && res.data.StatusCode === 401) ||
            res.data.StatusCode === 400
          ) {
            return;
          }

          if (res && res.data.StatusCode === 200) {
            const acc = res.data.Reply.filter((e) => e.WalletCode === "USDT");
            if (acc[0].BalanceFormat !== undefined) {
              setWalletusd(acc[0].BalanceFormat);
            }
          }
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    } catch (errorInfo) {}
  };
  
  useEffect(() => {
    if (store.isReloadPackage) {
      fetchAgencyPackage();
    }
  }, [store.isReloadPackage]);
 useEffect(()=> {
    getBalance();
  
  }, [])
  useEffect(() => {
    updateStore((draft) => {
      draft.isReloadTable = true;
      draft.isReloadPackage = true;
    });
  }, []);
  const purchaseHistoryColumn = [
    {
      title: "Program",
      dataIndex: "_action",
      key: "_action",
      align: "left",
    },
    {
      title: "Activated date",
      dataIndex: "_createOn",
      key: "_createOn",
      align: "left",
      // render: text => text ? moment(text).format(DATE_FORMATTER_STRING) : ''
    },
    {
      title: "Value",
      dataIndex: "_invested",
      key: "_invested",
      align: "right",
    },
  ];
  const iconCheck = (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 0C4.0372 0 0 4.0372 0 9C0 13.9628 4.0372 18 9 18C13.9628 18 18 13.9628 18 9C18 4.0372 13.9628 0 9 0Z"
        fill="#22D291"
      />
      <path
        d="M13.1946 7.09979L8.31953 11.9747C8.17328 12.121 7.98129 12.1946 7.78931 12.1946C7.59732 12.1946 7.40533 12.121 7.25908 11.9747L4.82162 9.53725C4.52829 9.24405 4.52829 8.76999 4.82162 8.47679C5.11482 8.18346 5.58875 8.18346 5.88208 8.47679L7.78931 10.384L12.1341 6.03934C12.4273 5.746 12.9012 5.746 13.1946 6.03934C13.4878 6.33253 13.4878 6.80646 13.1946 7.09979Z"
        fill="#FAFAFA"
      />
    </svg>
  );
  const onClickPackage = (name, pk) => {
    switch (name) {
      case "PRO":
        return onClickPro(pk);
      case "VIP":
        return onClickVip(pk);
      case "ELITE":
        return onClickElite(pk);
      default:
        return onClickPro(pk);
    }
  };
  const convertBgColor = (name) => {
    switch (name) {
      case "PRO":
        return "bg-green";
      case "VIP":
        return "bg-green";
      case "ELITE":
        return "bg-green";
      default:
        return "bg-blue";
    }
  };
  const genSubTitle = (isActive, packageActive, title) => {
    if (isActive) {
      return (
        <div className="box-active">
          <p className="active-pro color-green">
            <span>{iconCheck}</span>
            {packageActive}
          </p>
          <p className="desc">{title}</p>
        </div>
      );
    }
    return (
      <div className="box-active">
        <p className="active-pro color-red none">Upgradable expired</p>
      </div>
    );
  };

  function createMarkup(content) {
    return { __html: content };
  }

  const onClickPro = (val) => {
    setVisibleActivePackage(true);
    setPackageType(PACKAGE_TYPE.PRO);
    setPackageChosen(val);
  };

  const onClickVip = (val) => {
    setVisibleActivePackage(true);
    setPackageType(PACKAGE_TYPE.VIP);
    setPackageChosen(val);
  };
  const onClickElite = (val) => {
    setVisibleActivePackage(true);
    setPackageType(PACKAGE_TYPE.ELITE);
    setPackageChosen(val);
  };

  const convertColorByName = (name) => {
    switch (name) {
      case "PRO":
        return "color-green";
      case "VIP":
        return "color-green";
      case "ELITE":
        return "color-green";
      default:
        return "color-green";
    }
  };
  return (
    <>
      {isDesktopOrLaptop && (
        <div className="agency-wrap">
          <ActivePackage
            visible={visibleActivePackage}
            setVisible={setVisibleActivePackage}
            type={packageType}
            packageChosen={packageChosen}
            walletBalance={walletusd}
          />
         
          <Spin spinning={loading}>
            <div className="table-agency">
              <div className="columns">
                {agencyPackage.map((el) => {
                  return (
                    <div className="full-width">
                      <div className="content">
                        <div className="content-left">
                          <div className="title">
                            <h3> Package Details </h3>
                          </div>
                          <div className="table f-width height-table3">
                            <div
                              dangerouslySetInnerHTML={createMarkup(
                                el.Descriptions
                              )}
                            />
                          </div>
                        </div>
                        <div className="content-right">
                          <div className="package">
                            <div className="box-img">
                              <img src={el.linkIcon} alt={el.packageName} />
                            </div>
                            <div className="box-title">
                              <h3
                                className={`txt ${convertColorByName(
                                  el.packageName
                                )}`}
                              >
                                {el.packageName}
                              </h3>
                            </div>
                          </div>
                          {genSubTitle(el.isActive, el.packageActive, el.title)}
                          <div className="description">
                            In consideration for the referrals, Fortrex shall
                            pay the commission to the Agency in accordance with
                            the Terms and Conditions. The amount of commission
                            will be shown on the dashboard in the Network menu.
                          </div>
                          {el.isActive === false ? (
                            <a
                              onClick={() => onClickPackage(el.packageName, el)}
                              className={`btn-1 btn-save w-full-100 btn-active ${convertBgColor(
                                el.packageName
                              )}`}
                            >
                              ACTIVATE WITH {el.packageAmount}
                            </a>
                          ) : null}
                          <div className="noti">
                            <p>Notice:</p>
                            <p>Agency Com. is based on package value</p>
                            <p>Trading Com. is based on trading volume</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <div className="dashboard-bottom">
          <div className="title">
            <h3 className="ttl">Purchase History</h3>
          </div>
          <TableCustom
            useStore={useAgencyStore}
            columns={purchaseHistoryColumn}
            apiGetList={agencyInvestHistory}
          />
        </div> */}
          </Spin>
        </div>
      )}
      {isTabletOrMobile && (
        <div className="agency-wrap">
          <Mobile
            AgencyPackage={agencyPackage}
            walletBalance={walletusd}
            loading={loading}
          />
        </div>
      )}
    </>
  );
};
export default Agency;
