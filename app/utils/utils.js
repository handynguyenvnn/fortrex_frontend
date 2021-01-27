import React, { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { notification } from 'antd';
import moment from 'moment';
import {UNSET_DEFAULT_VALUE} from "constants/constant";
import * as signalR from "@microsoft/signalr";

export const isEmpty = input => {
  if (input === null || input === undefined) {
    return true;
  }
  if (typeof input === 'string' && input.trim() === '') {
    return true;
  }
  if (Array.isArray(input) && input.length === 0) {
    return true;
  }
  if (typeof input === 'object' && Object.keys(input).length === 0) {
    return true;
  }
  return false;
};

/**
 * format currency
 * @param {*} num
 */
export const formatThousandOfNumber = num =>
  `${num}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/**
 * calculate post's time
 * @param {*} time
 */
export const timeFromNow = time => {
  const hoursFromNow = moment(time).diff(new Date(), 'hours');
  if (hoursFromNow > 24) {
    return formatTime(time);
  }
  return moment(time).fromNow();
};

/**
 *
 * @param {object} boundingClientRect element.getBoundingClientRect()
 * @param {number} spaceToStop; default 100; position of element is 100; spaceToStop = 10; -> element's position will strop is 90
 */
export const getPositionOfElementToScroll = (
  boundingClientRect,
  spaceToStop = 250,
) => boundingClientRect.y + window.pageYOffset - spaceToStop;

/**
 *
 * @param {element} current element.getBoundingClientRect()
 * @param {number} spaceToStop; default 100; position of element is 100; spaceToStop = 10; -> element's position will strop is 90
 */
/* eslint-disable react-hooks/rules-of-hooks */
export const scrollToPageContent = (ref, spaceToTop) => {
  useEffect(() => {
    scroll.scrollTo(
      getPositionOfElementToScroll(
        ref.current.getBoundingClientRect(),
        spaceToTop,
      ),
    );
  }, []);
  return null;
};

export const mapDataComboBox = data => {
  if (Array.isArray(data)) {
    return data.map(item => ({
      id: item.code,
      label: item.vnName || item.name,
      value: item.code,
    }));
  }
  return [];
};

export const mapDataPhoneCodeComboBox = data => {
  if (Array.isArray(data)) {
    return data.map(item => ({
      id: item.code,
      label: `+ ${item.phoneCode}`,
      value: item.code,
      name: item.vnName || item.name,
    }));
  }
  return [];
};


export const openNotificationWithIcon = (
  type,
  title = 'Notify',
  content,
) => {
  const messStyle = {
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'primary-color',
    zIndex: 9999,
  };
  const contentStyle = {
    fontSize: '14px',
    color: 'primary-color',
    lineHeight: '1.5',
    whiteSpace: 'pre-line',
  };
  notification[type]({
    message: <div style={messStyle}>{title}</div>,
    description: <div style={contentStyle}>{content}</div>,
  });
};

export const checkErrorResponse = ({ data: { ErrorCode } }) =>
  Boolean(ErrorCode);


export const _setCookie = function (key, value, timeSet) {
  let timeDefault = 1000 * 60 * 24 * 30 * 365;
  let timeEp = timeSet ? timeSet : timeDefault;
  let expires = new Date();
  expires.setTime(expires.getTime() + timeEp);
  document.cookie =
    key +
    "=" +
    encodeURIComponent(value) +
    ";expires=" +
    expires.toUTCString() +
    ";path=/";
};

export const _getCookie = function (cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return decodeURIComponent(c.substring(name.length, c.length));
    }
  }
  return "";
};
export const _removeCookie = function (name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const removeParamsForServer = (requestData, param_remove = UNSET_DEFAULT_VALUE) => {
  Object.keys(requestData).forEach(propName => {
    // eslint-disable-next-line camelcase
    if (isEmpty(requestData[propName]) || requestData[propName] === param_remove || requestData[propName].toString() === 'NaN') {
      // eslint-disable-next-line no-param-reassign
      delete requestData[propName];
    }
  });
  return requestData;
}

export default function useKeypress(key, action) {
  useEffect(() => {
    function onKeyup(e) {
      if (e.key === key) action()
    }
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, []);
}

export const socketSignalR = () => {
  const protocol = new signalR.JsonHubProtocol();
  const transport = signalR.HttpTransportType.WebSockets || signalR.HttpTransportType.LongPolling;
  let access_token = _getCookie("access_token");

  const options = {
    transport,
    formatType: "json&format=text",
    skipNegotiation: true,
    accessTokenFactory: () => access_token,
  };
  let socketConnect;
  if (access_token) {
    try {
      socketConnect = new signalR.HubConnectionBuilder()
      .withUrl("https://wss.fortrex.io/stocks", options)
      //.withUrl("http://localhost:4235/stocks", options)
        .withHubProtocol(protocol)
       // .withAutomaticReconnect([0, 200, 500, 1000, null])
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            if (retryContext.elapsedMilliseconds < 60000) {
              return Math.random() * 3000;
            } else {
              return null;
            }
          },
        })
        .build();
    } catch (err) {
    }
  }
  return socketConnect;
}
