export const PAGE_PATHS = {
  TRADING: '/trading',
  DASHBOARD: '/dashboard',
  SUPPORT: '/support',
  AGENCY: '/agency',
  NETWORK: '/network',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  WALLET: '/wallet',
  FORGOT_PASSWORD: '/forgot-password',
  SUCCESS_REGISTER: '/success-register',
  RESET_PASSWORD: '/reset-password',
  RESET_PASSWORD_SUCCESS: '/reset-password-success',
  HOME_PAGE: '/',
  TRANSACTION_HISTORY: '/transaction-history',
  WITHDRAW_CONFIRM_EMAIL: '/withdraw-verify',
  REGISTER_ACTIVE_EMAIL: '/activate-mail',
  TRADING_ORDER: '/trading-order',
  WITHDRAW_CONFIRM: '/withdraw-confirm',
  ACTIVE_ACCOUNT_SUCCESS: '/active-account',

};

export const LAYOUT_COLUMN = {
  halfColumn: { xs: { span: 24 }, sm: { span: 24 }, md: { span: 12 } },
  fullColumn: { xs: { span: 24 }, sm: { span: 24 }, md: { span: 24 } }
};

export const ERROR_SYSTEM = 'System Error'; // Married

export const EMPTY_TEXT = `Please Enter Input!`;
export const INVALID_FORMAT = `Invalid!`;
export const PACKAGE_TYPE = {
  PRO: 'PRO',
  VIP: 'VIP',
  ELITE: 'ELITE'
};
export const HEADER_KEY_TOKEN = 'Fortrex-Option-User-Token';
export const DEFAULT_ZERO = 0;
export const UNSET_DEFAULT_VALUE = -1;
export const DEFAULT_PAGE_INDEX = 0;
export const PAGE_SIZE = 10;
export const STOP_DOWN = 2;
export const STOP_UP = 1;
export const DATE_FORMATTER_STRING = 'YYYY-MM-ddd HH:mm:ss';
export const SHORT_DATE_FORMATTER_STRING = 'YYYY-MM-DD';
export const DEFAULT_REFERRAL_CODE = '11A7A704F76CFB';
export const DEFAULT_WALLET_TRADE = 'Practice';
export const MONEY_TYPE_DEFAULT = 'BTC_USD';
export const EMAIL_SUPPORT = 'support@fortrex.io';

export const ENUM_WALLET_TRADE = [
  {
    label: 'USDT',
    value: 1,
  },
  {
    label: 'Practice',
    value: 3,
  },
  {
    label: 'DEMO',
    value: 3,
  },
  {
    label: 'GES',
    value: 2,
  },
  {
    label: 'ELD',
    value: 4,
  },
  {
    label: 'BRI',
    value: 5
  },
  {
    label: '',
    value: 0
  }
]
export const TRADING_ORDER_PENDING = 0;
export const TRANSACTION_HISTORY_TYPE = 0;
export const DEFAULT_DATA_CHART_GET = 100;
export const UPDATE_VERSION = '<p>Update Available version 1.0.1</p>\n' +
  '                                                <ul style={{listStyleType:\'square\'}}>\n' +
  '                                                  <li>1. Clear cache</li>\n' +
  '                                                  <li>2. Chart</li>\n' +
  '                                                  <li>3. UI mobile</li>\n' +
  '                                                </ul>';
