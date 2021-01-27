import axios from 'axios';
import { HEADER_KEY_TOKEN } from 'constants/constant';
import { _getCookie, _removeCookie } from 'utils/utils';

export const createInstance = () => {
  const path = 'https://api.fortrex.io';
   //const path = 'http://localhost:8072';

  const instance = axios.create({
    baseURL: `${path}`,
    headers: {
      Accept: 'application/json',
    }
  });
  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.toString().indexOf('401') !== -1) {
        _removeCookie('token');
        window.location.pathname = '/login';
      }
      return Promise.reject(error);
    }
  );
  //set interceptors request
  instance.interceptors.request.use(
    function (config) {
      config.headers[HEADER_KEY_TOKEN] = _getCookie('token');
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return instance;
};
