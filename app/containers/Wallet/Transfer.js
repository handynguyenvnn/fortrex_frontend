import React, { useState } from 'react';

const Transfer = () => {
  return (
    <div>
      <div className="popup">
        <div className="inner-wallet">
          <h3 className="title-profile">Transfer</h3>
          <div className="btn-pop">
            <a href="#">
              <img src="/assets/images/img-3.png" alt="" /> <span>USDT</span>
            </a>
            <a href="#">
              <img src="/assets/images/img-6.png" alt="" /> <span>USDT</span>
            </a>
          </div>
          <div className="box-select">
            <select>
              <option value="" selected="">Filter by level</option>
             
            </select>
            <select>
              <option value="" selected="">Filter by level</option>
            
            </select>
          </div>
          <div className="box-input">
            <input type="text" className="f-control f-input" placeholder="Input Amount" />
          </div>
          <a href="#" className="btn-1 btn-save w-full bg-blue">Transfer</a>
        </div>
      </div>
    </div>
  );
};
export default Transfer;