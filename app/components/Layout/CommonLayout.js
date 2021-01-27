import React from 'react';
import PropTypes from 'prop-types';
import HeaderComponent from '@components/Header';
import SideLeftComponent from '@components/SideLeft';
import '../assets/css/font-awesome.css';
import '../assets/css/style.css';
import '../assets/css/reponsive.css';
import ClearCache from 'react-clear-cache';
import { Modal } from 'antd';
import {UPDATE_VERSION} from "constants/constant";



function CommonLayout({children}) {
  return (
    <div className="main">
      <HeaderComponent/>
      <SideLeftComponent/>
      <div className="content full-width">
        {children}
      </div>
    </div>
  );
}

CommonLayout.propTypes = {
  children: PropTypes.any.isRequired,
};
export default CommonLayout;
