import CommonLayout from '@components/Layout/CommonLayout';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {hot} from 'react-hot-loader/root';
import {Route, Router, Switch} from 'react-router-dom';
import ScrollToTopOnChangeRoute from '../../components/ScrollToTopOnChangeRoute';
import {PAGE_PATHS} from 'constants/constant';
import {history} from '../../utils';
import Dashboard from '@containers/Dashboard';
import Agency from '@containers/Agency';
import Login from '@containers/Login';
import Network from '@containers/Network';
import Wallet from '@containers/Wallet';
import Profile from '@containers/Profile';
import Register from '@containers/Register';
import ForgotPassword from '@containers/ForgotPassword';
import SuccessRegister from '@containers/SuccessRegister';
import ResetPassword from '@containers/ResetPassword';
import ResetPasswordSuccess from '@containers/ResetPasswordSuccess';
import Trading from "@containers/Trading/Trading";

import './style.scss';
import HomePage from "@containers/Home/index";
import TransactionHistory from "containers/TransactionHistory/TransactionHistory";
import TradingOrder from "containers/Trading/TradingOrder";

import WidthDrawSuccess from "containers/SuccessRegister/WithdrawSuccess";
import ActiveAccountSuccess from "containers/SuccessRegister/ActiveAccountSuccess";
const App = () => {

  return (
    <Router history={history}>
      <ScrollToTopOnChangeRoute>
        <Switch>
          <Route
            exact
            path={PAGE_PATHS.HOME_PAGE}
            component={Login}
          />
          <Route
            exact
            path={PAGE_PATHS.LOGIN}
            component={Login}
          />
          <Route
            exact
            path={PAGE_PATHS.REGISTER}
            component={Register}
          />

          <Route
            exact
            path={PAGE_PATHS.FORGOT_PASSWORD}
            component={ForgotPassword}
          />
          <Route
            exact
            path={PAGE_PATHS.SUCCESS_REGISTER}
            component={SuccessRegister}
          />
          <Route
            exact
            path={PAGE_PATHS.RESET_PASSWORD}
            component={ResetPassword}
          />
          <Route
            exact
            path={PAGE_PATHS.RESET_PASSWORD_SUCCESS}
            component={ResetPasswordSuccess}
          />
          <Route
            exact
            path={PAGE_PATHS.TRADING}
            component={Trading}
          />
         <Route
            exact
            path={PAGE_PATHS.WITHDRAW_CONFIRM}
            component={WidthDrawSuccess}
          />
          <Route
            exact
            path={PAGE_PATHS.ACTIVE_ACCOUNT_SUCCESS}
            component={ActiveAccountSuccess}
          />
          <CommonLayout>
            <Route
              exact
              path={PAGE_PATHS.TRADING_ORDER}
              component={TradingOrder}
            />
            <Route
              exact
              path={PAGE_PATHS.DASHBOARD}
              component={Dashboard}
            />
            <Route
              exact
              path={PAGE_PATHS.TRANSACTION_HISTORY}
              component={TransactionHistory}
            />
            <Route
              exact
              path={PAGE_PATHS.AGENCY}
              component={Agency}
            />
            <Route
              exact
              path={PAGE_PATHS.NETWORK}
              component={Network}
            />
            <Route
              exact
              path={PAGE_PATHS.WALLET}
              component={Wallet}
            />
            <Route
              exact
              path={PAGE_PATHS.PROFILE}
              component={Profile}
            />
          </CommonLayout>
        </Switch>
      </ScrollToTopOnChangeRoute>
    </Router>
  );
};

App.propTypes = {
  store: PropTypes.shape({})
};

export default hot(App);
