import React, { useState } from 'react';
import { Modal } from 'antd';
import './styles.scss';
import { Span } from '@sentry/tracing';
import {history} from "utils";
import {PAGE_PATHS} from "constants/constant";
const ActivedInvestPackage = ({ visible, setVisible}) => {
  const convertColorByName = (name) => {
    return 'color-green';
  };
  const convertBgColor = name => {
    return 'bg-green';
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
            <div className="card-top package-actived">
              <div style={{display: 'flow-root'}}>
              <div className="box-img ">
                <img src='https://static.fortrex.io/images/agency-3.svg?v=5' alt='VIP' />
              </div>
              <div className={`title-actived`}>
                <h1 className={`txt color-green`}> VIP  </h1>
                <span className={`txt color-green`}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 0C4.0372 0 0 4.0372 0 9C0 13.9628 4.0372 18 9 18C13.9628 18 18 13.9628 18 9C18 4.0372 13.9628 0 9 0Z" fill="#22D291"/>
<path d="M13.1945 7.09991L8.31947 11.9748C8.17322 12.1211 7.98123 12.1947 7.78925 12.1947C7.59726 12.1947 7.40527 12.1211 7.25902 11.9748L4.82156 9.53737C4.52823 9.24417 4.52823 8.77011 4.82156 8.47691C5.11476 8.18358 5.58868 8.18358 5.88202 8.47691L7.78925 10.3841L12.1341 6.03946C12.4273 5.74612 12.9012 5.74612 13.1945 6.03946C13.4877 6.33266 13.4877 6.80658 13.1945 7.09991Z" fill="#FAFAFA"/>
</svg>
   <b style={{marginLeft: '5px'}}>Package activated</b>
                </span>
                <br />
                <span style={{color: '#97ADCB'}}>
                Enjoy ultimate benefit!
                </span>
                </div>
              </div>
              <div className="box-title w-full">
                <span class="agency-des">
                To help you receive more income from our platform, we allow our traders to invite their friends, relatives and acquaintances via a referral link. Furthermore, you have to become a member of our Special Referrals Program to continue your invitation.
                </span>
              </div>
              <a onClick={ () => {history.push(PAGE_PATHS.NETWORK)}}
                className={`btn-1 btn-save w-full bg-green`}>
                GO TO NETWORK
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ActivedInvestPackage;
