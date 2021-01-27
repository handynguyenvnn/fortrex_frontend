/* eslint-disable no-console */
import { createInstance } from './base';

const service = createInstance();

export const templateGet = async ({ params } = {}) => {
  try {
    return await service.get('/healthcheck', { params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};

// FOR METHOD POST, PUT, PATCH
export const templatePost = async ({ params } = {}) => {
  try {
    return await service.post('/accounts', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};

export const login = async ({ params } = {}) => {
  try {
    return await service.post('/api/user/login', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
}

export const createAccessToken = async (body) => {
  try {
    return await service.post('https://wss.fortrex.io/api/token/CreateToken',{...body});
    //return await service.post('http://localhost:4235/api/token/CreateToken',{...body});
  }
  catch (error) {
    const { response } = error;
    return response;
  }
}

export const register = async (params) => {
  try {
    return await service.post('/api/user/register',  {
     ...params,
    });
  } catch (error) {
    const { response } = error;
    return response;
  }
};

export const pushOrder = async (body) => {
  try {
    return await service.post('/api/user/order', { ...body });
  } catch (error) {
    const { response } = error;
    return response;
  }
};

export const getMarketPrice = async (body) => {
  try {
    return await service.post('/api/martkets', { ...body });
  } catch (error) {
    const { response } = error;
    return response;
  }
};

export const getBalanceAccount = async ({ params } = {}) => {
  try {
    return await service.get('api/user/getbalance', { params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};

export const chartKline = async body=> {
  try {
    return await service.post('api/klines', { ...body});
  } catch (error) {
    const { response } = error;
    return response;
  }
};

export const tickerPriceChangeStatistics = async ({ params } = {}) => {
  try {
    return await service.post('api/ticket/price', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};

export const trading = async ({ params } = {}) => {
  try {
    return await service.post('api/user/tradings', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};

export const yourTradingExperience = async ({ params } = {}) => {
  try {
    return await service.get('/api/dashboard/get', { params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};

export const listYourTradingExperience = async ({ params } = {}) => {
  try {
    return await service.post('/api/dashboard/gets', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};

export const affiliateSystemStatistics = async ({ params } = {}) => {
  try {
    return await service.get('/api/affiliate/statistic', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};

export const tradingHistory = async ({ params } = {}) => {
  try {
    return await service.post('/api/user/affiliateGets', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};

export const agencyHistory = async ({ params } = {}) => {
  try {
    return await service.post('/api/affiliate/agencyhistory', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};
export const agencyChartMember = async ({ params } = {}) => {
  try {
    return await service.post('/api/user/chart-members', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};
export const agencyChartCom = async ({ params } = {}) => {
  try {
    return await service.post('/api/user/chart-agency-com', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};
export const getDeposits = async ({ params } = {}) => {
  try {
    return await service.get('/api/deposit/gets', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};
export const getWalletFrom = async ({ params } = {}) => {
  try {
    return await service.get('/api/deposit/gets', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};




export const getWalletDeposits = async ({ params } = {}) => {
  try {
    return await service.post('/api/deposit/wallet', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};
export const getDepositsHistory = async ({ params } = {}) => {
  try {
    return await service.post('/api/deposit/history', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};
export const getWithdrawHistory = async ({ params } = {}) => {
  try {
    return await service.post('/api/withdraw/historys', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};
export const withDrawRequest = async ({ params } = {}) => {
  try {
    return await service.post('/api/user/withdraw_request', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};
export const withDrawConfirmEmail = async ({ params } = {}) => {
  try {
    return await service.post('/api/withdraw/confirmemail', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};
export const withDrawSubmit = async ({ params } = {}) => {
  try {
    return await service.post('/api/withdraw/submit', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};
export const updateProfile = async ({ params } = {}) => {
  try {
    return await service.post('/api/user/updateprofile', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};
export const changePass = async ({ params } = {}) => {
  try {
    return await service.post('/api/user/changepass', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};
export const forgotPass = async ({ params } = {}) => {
  try {
    return await service.post('/api/user/forgotpass', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};
export const resetPassword = async ({ params } = {}) => {
  try {
    return await service.post('/api/user/resetpassword', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};
export const agencyGetPackage = async ({ params } = {}) => {
  try {
    return await service.get('/api/package/gets', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};
export const agencySubmitInvest = async ({ params } = {}) => {
  try {
    return await service.post('/api/user/investment', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};
export const agencyInvestHistory = async ({ params } = {}) => {
  try {
    return await service.post('/api/user/investmenthistory', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};
export const getWalletAddress = async ({ params } = {}) => {
  try {
    return await service.get('/api/user/get-walletaddress-usd', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};
export const transferMoney = async ({ params } = {}) => {
  try {
    return await service.post('/api/user/transfer_money', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};
export const transferHistory = async ({ params } = {}) => {
  try {
    return await service.post('/api/user/transaction_history', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
};

export const getLastResult = async () => {
  try {
    return await service.get('/api/trading/lastresult');
  } catch (error) {
    const { response } = error;
    return response;
  }
}

export const getServerTime = async () => {
  try {
    return await service.get('/api/servertime');
  } catch (error) {
    const { response } = error;
    return response;
  }
}

export const getTransactionHistory = async ({ params } = {})  => {
  try {
    return await service.post('/api/user/transactions', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
}

export const getTowFACode = async () => {
  try {
    return await service.get('api/user/twofacode/get');
  } catch (error) {
    const { response } = error;
    return response;
  }
}

export const update2FA = async ({ params } = {})  => {
  try {
    return await service.post('/api/user/twofacode/update', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
}


export const activeAccount = async ({ params } = {})  => {
  try {
    return await service.post('/api/user/active-email', { ...params });
  } catch (error) {
    const { response } = error;
    return response;
  }
}

export const getProfile = async () => {
  try {
    return await service.get('api/user/get_userprofile');
  } catch (error) {
    const { response } = error;
    return response;
  }
}

export const getDashboardSnapshot = async () => {
  try {
    return await service.get('api/profit/statistic');
  } catch (error) {
    const { response } = error;
    return response;
  }
}

export const getNetworkdTradingSnapshot = async () => {
  try {
    return await service.get('api/network/statistic');
  } catch (error) {
    const { response } = error;
    return response;
  }
}




