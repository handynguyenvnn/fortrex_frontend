import React, { useState } from 'react';
import { Modal } from 'antd';
import { agencySubmitInvest,getProfile } from 'services';
import './styles.scss';
import { useAgencyStore } from 'store';
import ActivedInvestPackage from 'components/Modal/ActivedInvestPackage';
import {isEmpty, openNotificationWithIcon} from 'utils/utils';

const ActivePackage = ({ visible, setVisible, packageType, packageChosen,walletBalance }) => {
  const [loading, setLoading] = useState(false);
  const [store, updateStore] = useAgencyStore();
  const [isInvestPackage, setIsInvestPackage] = useState(false);
  const convertColorByName = (name) => {
    switch (name) {
      case 'PRO':
        return 'color-green';
      case 'VIP':
        return 'color-green';
      case 'ELITE':
        return 'color-green';
      default:
        return 'color-green';
    }
  };
  const getInvestbyUser = () => {
    try {
      getProfile()
        .then((res) => {
          if (
            (res && res.data.StatusCode === 401) ||
            res.data.StatusCode === 400
          ) {
            return;
          }
          if (res && res.data.StatusCode === 200) {
            const totalInvest = res.data.Reply.TotalInvest;
            if (totalInvest > 0) {
              setIsInvestPackage(true);
            } else {
              setIsInvestPackage(false);
            }
          }
        })
        .catch()
        .finally(() => {
          setLoading(false);
        });
    } catch (errorInfo) {}
  };
  const convertBgColor = name => {
    switch (name) {
      case 'PRO':
        return 'bg-blue';
      case 'VIP':
        return 'bg-green';
      case 'ELITE':
        return 'bg-green';
      default:
        return 'bg-blue';
    }
  };
  const onClickSubmit = () => {
    if (packageChosen && packageChosen.packageAmount) {
      const amount = Number(packageChosen.packageAmount.replace('$', ''));
      setLoading(true);
      agencySubmitInvest({
        params: {
          amount,
        }
      }).then(res => {
        if (res && res.data) {
          if (res.data.StatusCode === 400) {
            openNotificationWithIcon('error', 'Notification', res.data.Meg);
          } else if (res.data.StatusCode === 200){
            openNotificationWithIcon('success', 'Notification', res.data.Meg);
            getInvestbyUser();
          }
        }
      })
        .catch()
        .finally(() => {
          setVisible(false);
          setLoading(false);
          updateStore(draft => {
            draft.isReloadTable = true;
            draft.isReloadPackage = true;
          });
        });
    }
  };
 
  return (
    <div>
      <Modal
        centered
        width={0}
        footer={null}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <div className="popup modal">
          <div className="inner-agency">
            <div className="card-top">
              <div className="box-img">
                <img src={packageChosen.linkIcon} alt={packageChosen.packageName} />

              </div>
              <div className="box-title">
                <h3 className={`txt ${convertColorByName(packageChosen.packageName)}`}>
                  {packageChosen.packageName}
                </h3>
                <span class="agency-des">In consideration for the referrals, Fortrex shall pay the commission to the Agency in accordance with the Terms and Conditions. The amount of commission will be shown on the dashboard in the Network menu.</span>
                {!isEmpty(packageChosen.title) ?
                  <p className="desc">
                    {packageChosen.title}
                  </p>:
                  <p className="desc" style={{marginBottom: 70}}>

                  </p>
                }
              </div>
              <div className="box-icon">
                <div className="icon">
                  <img src="/images/img-3.png" alt="T-tranfer" height='40px' />
                </div>
                <div className="title">
                  Your wallet balance
                  <span>${walletBalance}</span>
                </div>
              </div>
              <a
                onClick={onClickSubmit}
                className={`btn-1 btn-save w-full ${convertBgColor(packageChosen.packageName)}`}
              >
                ACTIVATE WITH {packageChosen.packageAmount}
              </a>
            </div>
          </div>
        </div>
      </Modal>
      <ActivedInvestPackage
            visible={isInvestPackage}
            setVisible={setIsInvestPackage}
          />
    </div>
  );
};

export default ActivePackage;
