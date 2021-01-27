import React, { useState, useCallback } from "react";
import { Layout, Image, Select } from "antd";
import MenuDrawer from "./MenuDrawer";
import { MenuOutlined } from "@ant-design/icons";

import "./index.css";
const { Header } = Layout;

const GlobalHeader = () => {
  const [MenuDrawerVisible, setMenuDrawerVisible] = useState(false);
  const handleMenuDrawerOpen = useCallback(() => {
    setMenuDrawerVisible(true);
  });

  const handleMenuDrawerClose = useCallback(() => {
    setMenuDrawerVisible(false);
  });

  return (
    <div className="App">
      <Header className="header main-bg">
        <div className="logo">
          <svg
            width="41"
            height="40"
            viewBox="0 0 41 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.8744 32.9433L16.5058 24.5747L14.0017 27.0789L22.3703 35.4474L22.0599 35.7578C20.9256 36.8386 18.9137 36.6781 17.4904 35.3297L11.626 29.4546L9.12183 31.9587L13.5201 36.357C15.1575 37.9944 16.6343 39.0752 17.9291 39.5889C19.224 40.1026 20.5724 40.1347 21.9743 39.6852C23.0123 39.407 23.9862 38.8291 26.1051 36.7423L30.8886 31.948L28.3845 29.4439L24.8744 32.9433Z"
              fill="#0ACF97"
            />
            <path
              d="M7.04585 24.8639L15.4144 16.4953L12.9103 13.9912L4.54171 22.3598L4.23136 22.0494C3.15052 20.9151 3.31104 18.9032 4.65942 17.4799L10.5345 11.6155L8.04109 9.11133L3.64278 13.5096C2.00546 15.147 0.924608 16.6238 0.410937 17.9186C-0.102734 19.2135 -0.134839 20.5619 0.314623 21.9638C0.592862 23.0018 1.17074 23.9757 3.25753 26.0946L8.05179 30.8888L10.5559 28.3847L7.04585 24.8639Z"
              fill="#FC5661"
            />
            <path
              d="M21.0861 17.1376L22.8519 18.9033C23.4512 19.5026 23.4512 20.4657 22.8519 21.065L21.0861 22.8415C20.4869 23.4408 19.5237 23.4408 18.9244 22.8415L17.1587 21.0757C16.5594 20.4764 16.5594 19.5133 17.1587 18.914L18.9244 17.1483C19.513 16.5383 20.4869 16.5383 21.0861 17.1376Z"
              fill="#22D291"
            />
            <path
              d="M39.6853 18.0256C39.407 16.9876 38.8292 16.0137 36.7424 13.8948L31.9588 9.10059L29.4547 11.6047L32.9647 15.1148L24.5962 23.4834L27.1003 25.9875L35.4689 17.619L35.7792 17.9293C36.8601 19.0637 36.6996 21.0755 35.3512 22.4988L29.4761 28.374L31.9802 30.8781L36.3785 26.4798C38.0158 24.8425 39.0967 23.3657 39.6104 22.0708C40.1026 20.7759 40.1347 19.4275 39.6853 18.0256Z"
              fill="#EB5757"
            />
            <path
              d="M15.1256 7.04585L23.4941 15.4144L25.9983 12.9103L17.6297 4.54171L17.94 4.23136C19.0744 3.15052 21.0863 3.31104 22.5096 4.65942L28.3847 10.5345L30.8888 8.03039L26.4798 3.64278C24.8425 2.00546 23.3657 0.924608 22.0708 0.410937C20.7759 -0.102734 19.4276 -0.134839 18.0257 0.314623C16.9876 0.592862 16.0138 1.17074 13.8949 3.25753L9.11133 8.05179L11.6155 10.5559L15.1256 7.04585Z"
              fill="#22D291"
            />
          </svg>
          <span className="app-title">fortrex</span>
        </div>
        <div className="header-right_group">
          <button className="transfer-btn">
            Deposit
          </button>
          <MenuOutlined
            onClick={handleMenuDrawerOpen}
            className="toggle-menu-icon"
          />
        </div>
        <MenuDrawer
          visible={MenuDrawerVisible}
          onClose={handleMenuDrawerClose}
        />
      </Header>
    </div>
  );
};

export default GlobalHeader;
