import React, { useState } from 'react';
import { Modal } from 'antd';
import './styles.scss';
import { Span } from '@sentry/tracing';
import {history} from "utils";
import {PAGE_PATHS} from "constants/constant";
const NetworksNotAgency = ({ visible, setVisible}) => {
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
            <div className="card-top">
              <div >
              <img height={180} width={180} src={"https://static.fortrex.io/images/NotAgency.svg?v=1.1"}/>
              
              </div>
              <div className="box-title">
               
                <span class="agency-des">
                You need to activate an Agency Package to receive up to 80% commission from fortrex
                </span>
               
              </div>
      
              <a onClick={ () => {history.push(PAGE_PATHS.AGENCY)}}
                className={`btn-1 btn-save w-full bg-green`}>
               ACTIVATE NOW
              </a>
              <br />
              <a onClick={ () => {history.push(PAGE_PATHS.TRADING)}} style={{marginTop: '15px',    display: 'grid'}}
               >
              Back Trading
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NetworksNotAgency;
