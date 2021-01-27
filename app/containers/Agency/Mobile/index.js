import React, { useState, useCallback } from "react";
import { Button, Spin } from "antd";
import HeaderComponent from "components/Header";
import './index.scss';

import Popup from "./Popup";

const PackageDetail = ({ AgencyPackage, loading, walletBalance }) => {
  const [visible, setVisible] = useState(false);

  const handleActivate = useCallback(() => {
    if (window !== undefined) {
      window.scrollTo({ top: 0 });
    }
    setVisible(true);
  }, []);

  return (
    <>
      <Spin spinning={loading}>
        {AgencyPackage &&
          Array.isArray(AgencyPackage) &&
          AgencyPackage.length > 0 &&
          AgencyPackage.map((el) => (
            <>
              <div className="containerPackageDetail">
                <h2 className="title">Agency Package</h2>
                <div className="item">
                  <div className="itemHead">
                    <span className="type">{el.packageName}</span>
                  </div>
                  <div className="itemContent">
                    <div>
                      <div className="icon">
                        <img src={el.linkIcon} alt={el.packageName} />
                      </div>
                    </div>
                    <div className="percent">
                      <span>Up to</span>
                      <div className="number">80%</div>
                      <div className="text">Agency com.</div>
                    </div>
                    <div className="percent">
                      <span>Up to</span>
                      <div className="number">3.9%</div>
                      <div className="text">Trading com.</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="containerPackageInfo">
                <div className="table f-width height-table3">
                  <div dangerouslySetInnerHTML={{ __html: el.Descriptions }} />
                </div>
              </div>
              <div className="containerPackageNote">
                <span className="title">Notice:</span>
                <p>Agency Com. is based on package value</p>
                <p>Trading Com. is based on trading volume</p>
              </div>
              <div className="btnActiveClick">
                <Popup
                  AgencyDetail={el}
                  walletBalance={walletBalance}
                  visible={visible}
                  cancel={() => setVisible(false)}
                >
                  <Button onClick={handleActivate}>
                    ACTIVATE WITH {el.packageAmount}
                  </Button>
                </Popup>
              </div>
            </>
          ))}
      </Spin>
    </>
  );
};

export default PackageDetail;
