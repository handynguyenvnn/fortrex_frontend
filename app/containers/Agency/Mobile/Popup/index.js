import React,{useState, useCallback } from "react";
import { Modal, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { agencySubmitInvest } from 'services';
import { useAgencyStore } from 'store';
import {isEmpty, openNotificationWithIcon} from 'utils/utils';
import PackageSuccess from './success'

const Popup = ({ AgencyDetail, children, visible, cancel, walletBalance }) => {
  const [isSuccessVisible, setSuccessVisible] = useState(false);
  const [store, updateStore] = useAgencyStore();
  const onClickSubmit = useCallback(() => {
    if (AgencyDetail && AgencyDetail.packageAmount) {
      const amount = Number(AgencyDetail.packageAmount.replace("$", ""));
      agencySubmitInvest({
        params: {
          amount,
        },
      })
        .then((res) => {
          if (res && res.data) {
            if (res.data.StatusCode === 400) {
              openNotificationWithIcon("error", "Notification", res.data.Meg);
            } else if (res.data.StatusCode === 200) {
              openNotificationWithIcon("success", "Notification", res.data.Meg);
            }
          }
        })
        .catch()
        .finally(() => {
          cancel()
          setSuccessVisible(true);
          updateStore((draft) => {
            draft.isReloadTable = true;
            draft.isReloadPackage = true;
          });
        });
    }
  },[]);

  return (
    <>
      {children}
      {AgencyDetail && (
        <Modal
          title="Basic Modal"
          visible={visible}
          onCancel={cancel}
          closable={false}
          footer={null}
          title={false}
          className="popup-c"
        >
          <div className="box-popup">
            <div className="popup-head">
              <span onClick={cancel}>
                <ArrowLeftOutlined />
              </span>
              <span onClick={cancel}>Cancel</span>
            </div>
            <div className="popup-content">
              <div className="icon">
                <img
                  src={AgencyDetail?.linkIcon}
                  alt={AgencyDetail?.packageName}
                />
              </div>
              <div className="tle">{AgencyDetail?.packageName}</div>
              <div className="text">
                In consideration for the referrals, Fortrex shall pay the
                commission to the Agency in accordance with the Terms and
                Conditions. The amount of commission will be shown on the
                dashboard in the Network menu.
              </div>
              <div className="box-wallet">
                <div className="image">
                  <img src="/images/img-3.png" alt="T-tranfer" />
                </div>
                <div className="info">
                  <p>Agency Wallet balance</p>
                  <span>{walletBalance}</span>
                </div>
              </div>
              <a href="#" title="ACTIVATE WITH $100" className="btnLink" onClick={onClickSubmit}>
                ACTIVATE WITH {AgencyDetail?.packageAmount}
              </a>
            </div>
          </div>
        </Modal>
      )}
      {isSuccessVisible && <PackageSuccess AgencyDetail={AgencyDetail} visible={isSuccessVisible} />}
    </>
  );
};

export default Popup;
