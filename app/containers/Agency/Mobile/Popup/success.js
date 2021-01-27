import React from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import { Modal, Button } from "antd";
import { Link } from "react-router-dom";

const PackageSuccess = ({ visible, AgencyDetail }) => {
  return (
    <Modal
      visible={visible}
      title="Basic Modal"
      visible={visible}
      closable={false}
      footer={null}
      title={false}
      className="popup-c"
    >
      <div className="box-popup" style={{ padding: 0 }}>
        <div className="containerPackageSuccess">
          <div className="boxActivated">
            <div className="icon">
              <img
                src={AgencyDetail?.linkIcon}
                alt={AgencyDetail?.packageName}
              />
            </div>
            <div className="text">
              <span className="name">{AgencyDetail?.packageName}</span>
              <div className="containerPackageSuccess-icon_wrap">
                <div className="containerPackageSuccess-icon">
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 0C4.0372 0 0 4.0372 0 9C0 13.9628 4.0372 18 9 18C13.9628 18 18 13.9628 18 9C18 4.0372 13.9628 0 9 0Z"
                      fill="#22D291"
                    />
                    <path
                      d="M13.1945 7.09979L8.31947 11.9747C8.17322 12.121 7.98123 12.1946 7.78925 12.1946C7.59726 12.1946 7.40527 12.121 7.25902 11.9747L4.82156 9.53725C4.52823 9.24405 4.52823 8.76999 4.82156 8.47679C5.11476 8.18346 5.58868 8.18346 5.88202 8.47679L7.78925 10.384L12.1341 6.03934C12.4273 5.746 12.9012 5.746 13.1945 6.03934C13.4877 6.33253 13.4877 6.80646 13.1945 7.09979Z"
                      fill="#FAFAFA"
                    />
                  </svg>
                </div>{" "}
                <p>Package activated</p>
              </div>
            </div>
          </div>
          <div className="textNote">Enjoy ultimate benefit!</div>
          <div className="textContent">
            To help you receive more income from our platform, we allow our
            traders to invite their friends, relatives and acquaintances via a
            referral link. Furthermore, you have to become a member of our
            Special Referrals Program to continue your invitation.
          </div>
          <Link
            href="#"
            title="GO TO NETWORK"
            className="btnLink"
            to='/network'
          >
            GO TO NETWORK
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default PackageSuccess;
