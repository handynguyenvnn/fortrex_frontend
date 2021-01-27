/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import 'sanitize.css/sanitize.css';
import 'antd/dist/antd.css';
import LanguageProvider from '@components/ComplexElements/LanguageProvider';

// Import root app
import App from 'containers/App';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess'; // eslint-disable-line import/extensions
// import moment from 'moment';
import {DashboardStore} from "@store/dashboardStore";
import {TradingStore} from "@store/tradingStore";
import {AppStore} from '@store/appStore';
import {AgencyStore} from '@store/agencyStore';
import {NetworkTradingHistoryStore} from '@store/networkTradingHistoryStore';
import {NetworkAgencyHistoryStore} from '@store/networkAgencyHistoryStore';
import {WalletBalanceStore} from '@store/walletBalanceStore';
import {WalletDepositWithdrawHistoryStore} from '@store/walletDepositWithdrawHistoryStore';
import {WalletTransferHistory} from '@store/walletTransferHistoryStore';
import locale from 'antd/lib/locale-provider/vi_VN';
import {ConfigProvider, Modal} from 'antd';
// import 'moment/locale/fr'; // without this line it didn't work
// Import i18n messages
import {translationMessages} from './i18n';
// moment.locale('fr');
// console.log('object', moment().format('dddd'));

// import global style less
import './global.less';
import {UPDATE_VERSION} from "constants/constant";
import UpdateVersion from "react-clear-cache";
// import fonts inter
// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)

// Create redux store with history
// const initialState = {};
// const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = messages => {
  ReactDOM.render(
    <AppStore.Provider>
      <TradingStore.Provider>
        <DashboardStore.Provider>
          <AgencyStore.Provider>
            <NetworkTradingHistoryStore.Provider>
              <NetworkAgencyHistoryStore.Provider>
                <WalletBalanceStore.Provider>
                  <WalletDepositWithdrawHistoryStore.Provider>
                    <WalletTransferHistory.Provider>
                      {/*<LanguageProvider messages={messages}>*/}
                        {/*<ConfigProvider locale={locale}>*/}
                      <UpdateVersion>
                        {({ isLatestVersion, emptyCacheStorage }) => {
                          if (!isLatestVersion) {
                            return (
                              <Modal
                                title="Notification"
                                visible='true'
                                onOk={e => {
                                  e.preventDefault();
                                  emptyCacheStorage();
                                }}
                                maskClosable={false}
                                cancelButtonProps={{ style: { display: 'none' } }}
                              >
                                <div
                                  style={{ background: "white", padding: 27}}
                                  dangerouslySetInnerHTML={{
                                    __html: UPDATE_VERSION,
                                  }}
                                />
                              </Modal>
                            );
                          }
                          return  <App/>;
                        }}
                      </UpdateVersion>

                        {/*</ConfigProvider>*/}
                      {/*</LanguageProvider>*/}
                    </WalletTransferHistory.Provider>
                  </WalletDepositWithdrawHistoryStore.Provider>
                </WalletBalanceStore.Provider>
              </NetworkAgencyHistoryStore.Provider>
            </NetworkTradingHistoryStore.Provider>
          </AgencyStore.Provider>
        </DashboardStore.Provider>
      </TradingStore.Provider>
    </AppStore.Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/vi.js')
      ])
    ) // eslint-disable-line prettier/prettier
    .then(() => render(translationMessages))
    .catch({});
    // .catch(err => {
    //   throw err;
    // });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
} else {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
