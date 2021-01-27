import React, {useEffect, useState} from 'react';
import {Layout} from 'antd';
import {useTradingStore} from "store";
import {
  DEFAULT_WALLET_TRADE,
  ENUM_WALLET_TRADE,
  MONEY_TYPE_DEFAULT,
  PAGE_PATHS,
  STOP_DOWN,
  STOP_UP
} from "constants/constant";
import {getBalanceAccount, getLastResult, getMarketPrice, pushOrder} from "services";
import {openNotificationWithIcon} from "utils/utils";
import initSocket from "components/common/socket";
import Time from "components/Time";
import Chart from "components/Chart";
import LastResultModal from "components/Modal/LastResult";
import {history} from "utils";
import HeaderComponent from "components/Header";
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
import { 
  Tabs,
  Col,
  Row,
  Button,
  Select
 } from 'antd';

const {Header} = Layout;

const {Option} = Select;

const TradingComponent = () => {
  const [visibleLastResultModal, setVisibleLastResultModal] = useState(false);
  const { TabPane } = Tabs;

  return (
    <div className="main mobile-trading" style={{height: "1250px"}}>
      <LastResultModal visible={visibleLastResultModal} setVisible={setVisibleLastResultModal} />
      <Tabs defaultActiveKey="1" >
      <TabPane tab="Agency Package" key="1">
        <h1>Agency Package</h1>
        <div className="pro-content">
          <div className="pro-content-top">
            <h3>PRO</h3>
            <p>More <i class="fa fa-caret-right"></i></p>
          </div>
          <div className="pro-content-bottom">
            <Row>
              <Col span={8} className="pro-content-bottom-img"><img  src={"https://static.fortrex.io/images/agency-3.svg?v=4"} alt={"VIP"} /></Col>
              <Col span={8}>
                <p className="text-upto">Upto</p>
                <h3>47%</h3>
                <p>Agency com.</p>
              </Col>
              <Col span={8}>
                <p className="text-upto">Upto</p>
                <h3>3.1%</h3>
                <p>Trading com.</p>
              </Col>
            </Row>
            <p><span className="pro-content-bottom-text"><i class="fa fa-check-circle"></i>  Package activated</span></p>
            <p><span className="pro-content-bottom-text-you">You can upgrade to higher package before Nov 30th, 2020</span></p>
          </div>
        </div>

        <div className="vip-content">
          <div className="vip-content-top">
            <h3>VIP</h3>
            <p>More <i class="fa fa-caret-right"></i></p>
          </div>
          <div className="vip-content-bottom">
            <Row>
              <Col span={8}><img src={"https://static.fortrex.io/images/agency-3.svg?v=4"} alt={"VIP"} /></Col>
              <Col span={8}>
                <p className="text-upto">Upto</p>
                <h3>53%</h3>
                <p>Agency com.</p>
              </Col>
              <Col span={8}>
                <p className="text-upto">Upto</p>
                <h3>3.4%</h3>
                <p>Trading com.</p>
              </Col>
            </Row>
            <Button className="vip-content-bottom-btn" type="primary" block>
              BUY WITH $200
            </Button>
          </div>
        </div>

        <div className="elite-content">
          <div className="elite-content-top">
            <h3>ELITE</h3>
            <p>More <i class="fa fa-caret-right"></i></p>
          </div>
          <div className="elite-content-bottom">
            <Row>
              <Col span={8}><img src={"https://static.fortrex.io/images/agency-3.svg?v=4"} alt={"VIP"} /></Col>
              <Col span={8}>
                <p className="text-upto">Upto</p>
                <h3>72%</h3>
                <p>Agency com.</p>
              </Col>
              <Col span={8}>
                <p className="text-upto">Upto</p>
                <h3>3.9%</h3>
                <p>Trading com.</p>
              </Col>
            </Row>
            <Button className="elite-content-bottom-btn" type="primary" block>
              BUY WITH $200
            </Button>
          </div>
        </div>
      </TabPane>
      <TabPane tab="Purchase History" key="2">
          <Select
            labelInValue
            defaultValue={{ value: '<Program name>' }}
            style={{ width: "100%",padding: "0px 10px 0px 7px"}}
          >
            <Option value="jack">Program name</Option>
            <Option value="lucy">Program name</Option>
          </Select>
          <Select
            labelInValue
            defaultValue={{ value: '<Program name>' }}
            style={{ width: "100%",padding: "0px 10px 0px 7px", marginTop: "12px"}}
          >
            <Option value="jack">Program name</Option>
            <Option value="lucy">Program name</Option>
          </Select>
          <Select
            labelInValue
            defaultValue={{ value: '<Program name>' }}
            style={{ width: "100%",padding: "0px 10px 0px 7px", marginTop: "12px"}}
          >
            <Option value="jack">Program name</Option>
            <Option value="lucy">Program name</Option>
          </Select>
      </TabPane>
    </Tabs>
    </div>
  )
}
export default TradingComponent;
