import axios from 'axios'
import { API_SERVICES_BASE_URL,HEADER_KEY_TOKEN  } from '@config'
import { _getCookie,_removeCookie } from '@helpers'
// For common config
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.baseURL = API_SERVICES_BASE_URL.USER;

//
//set interceptors response
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.toString().indexOf('401') !== -1) {
      _removeCookie('token')
      window.location.pathname='/login'
    }
    return Promise.reject(error);
  }
);
//end
//set interceptors request
axios.interceptors.request.use(
  function (config) {
    config.headers[HEADER_KEY_TOKEN ] = _getCookie('token');
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
