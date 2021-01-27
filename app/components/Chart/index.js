import echarts from "echarts";
import {useHookChart} from "./Store";
import React, {useEffect, useState} from "react";
import moment from "moment";
import {useHookTradePair} from "./common/Store";
import {_getCookie, _removeCookie} from "../common/helpers/index";
import $ from "jquery";
import _ from "lodash";
import './style.scss';
import { use100vh } from 'react-div-100vh';
import {
  lineRealTime,
  lineRealTime2,
  markPointMax,
  areaBuy,
  makerPointByCoord,
  configCommon,
  configXAxis,
  configDataZoom,
  areaSell,
} from "./common";
import {socketSignalR} from "utils/utils";

var myChart;
var hoverBuy = false;
var hoverCell = false;
var hoverBuyPrice = "";
var hoverCellPrice = "";
var markPointBuyX = "";
var markPointBuyY = "";
var markPointCellX = "";
var markPointCellY = "";
let sec, secTemp;

var pairDefaultTemp = "BTC_USD";

var typeChartTemp;
//var PAIRTemp;
const _initDataChart = (actions) => {
  myChart = echarts.init(document.getElementById("main-chart"));
  //actions.initDataChart();
  actions.initDataChart().then((state) => {
    loadChart({state});
  });
};

const _handleLoadChart = ({state, updatePairColumn}) => {
  const {data} = state;
  if (data.length > 0) {
    loadChart({state, updatePairColumn});
  }
};
const _eventHoverBtn = ({state, updatePairColumn}) => {
  $("#btn-buy")
    .mouseenter(function () {
      hoverBuy = true;
      hoverCell = !hoverBuy;
      _handleLoadChart({state, updatePairColumn});
    })
    .mouseleave(function () {
      hoverBuy = false;
      hoverCell = hoverBuy;
      hoverBuyPrice = "";
      hoverCellPrice = "";

      markPointBuyX = "";
      markPointBuyY = "";
      markPointCellX = "";
      markPointCellY = "";
      _handleLoadChart({state, updatePairColumn});
    });

  $("#btn-sell")
    .mouseenter(function () {
      hoverCell = true;
      hoverBuy = !hoverCell;
      _handleLoadChart({state, updatePairColumn});
    })
    .mouseleave(function () {
      hoverCell = false;
      hoverBuy = hoverCell;
      hoverBuyPrice = "";
      hoverCellPrice = "";

      markPointBuyX = "";
      markPointBuyY = "";
      markPointCellX = "";
      markPointCellY = "";
      _handleLoadChart({state, updatePairColumn});
    });
};

const _eventDataZoom = (actions) => {
  myChart.on("dataZoom", (params) => {
    if (params.batch && params.batch[0]) {
      const {start, end} = params.batch[0];
      actions.updateConfigChart({
        start,
        end,
      });
    }
    if (params.start) {
      const {start, end} = params;
      actions.updateConfigChart({
        start,
        end,
      });
    }
  });
};

const addMoreTime = (rawData, loopTimes, secondSpace) => {
  const lastRecordRoot = rawData[rawData.length - 1];
  let timeLast = lastRecordRoot[lastRecordRoot.length - 1];
  for (let i = 1; i <= loopTimes; i++) {
    timeLast += secondSpace;
    rawData.push([
      moment(timeLast).format("HH:mm:ss"),
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      timeLast,
    ]);
  }
  return rawData;
};
const clearAvailable = () => {
  hoverCell = false;
  hoverBuy = false;

  hoverBuyPrice = "";
  hoverCellPrice = "";

  markPointBuyX = "";
  markPointBuyY = "";
  markPointCellX = "";
  markPointCellY = "";
};
const parseListDate = (rawData) => {
  return rawData.map(function (item) {
   // console.log('parseListDate',item);
    return item[0];
  });
};
const parseListData = (rawData) => {
  let data = [];
  rawData.forEach((item) => {

    if (item[1] !== "-" && item[2] !== "-") {
      //data.push([+item[1], +item[2], +item[5], +item[6]]);
      data.push([+item[2], +item[1], +item[6], +item[5]]);
    }
  });
  return data;
};
const calculateMA = (dayCount, data) => {
  var result = [];
  for (var i = 0, len = data.length; i < len; i++) {
    if (i < dayCount) {
      result.push("-");
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += data[i - j][1];
    }
    result.push(parseFloat(sum / dayCount).toFixed(2));
  }
  return result;
};
const _buildMAs = (data) => {
  let result = [];
  [
    {num: 10, name: "MA10", color: "#297DFF"},
    {num: 30, name: "MA30", color: "#FFC329"},
   // {num: 60, name: "MA60", color: "#FD4AD9"},
  ].forEach((item) => {
    result.push({
      itemStyle: {
        color: item.color,
      },
      name: item.name,
      type: "line",
      data: calculateMA(item.num, data),
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 1,
      },
    });
  });
  return result;
};
const _buildLinesBet = (listPushOrder) => {
  let listLine = [],
    listMarkPoint = [];
  // assign line push order
  if (listPushOrder.length > 0) {
    listPushOrder.forEach((item, i) => {
      const {pricePushOrder, datePushOrder, color} = item;
      listLine.push({...lineRealTime(pricePushOrder, 1, color)});
      listMarkPoint.push(
        makerPointByCoord({
          valueLabel: item.amount,
          valStart: datePushOrder,
          valEnd: pricePushOrder,
          symbol: "",
          symbolOffset: [0, -10],
          symbolSize: 10,
          color,
        })
      );
    });
  }

  return {
    listLine,
    listMarkPoint,
  };
};
const _buildChartCandlestick = (data, dates, state, updatePairColumn) => {
  const {
    isBet,
    valxAxisCol1,
    valxAxisCol2,
    listPushOrder,
    timeStart,
    loopTimesCol1,
  } = state;

  let valxAxisCol1Temp = dates[dates.length - 1 - loopTimesCol1];
  let valxAxisCol2Temp =
    dates[dates.length - 1 - loopTimesCol1 + parseInt((30 / 5).toFixed(0))];

  if (isBet) {
    valxAxisCol1Temp = valxAxisCol1;
    valxAxisCol2Temp = valxAxisCol2 || valxAxisCol2Temp;
    const lastPoint = new Date(
      moment().format("DD-MM-YYYY") + " " + dates[dates.length - 13]
    );
    const current = new Date(
      moment().format("DD-MM-YYYY") + " " + valxAxisCol1Temp
    );
    if (lastPoint >= current) {
      let iconTemp2 = timeStart - 30;
      if (iconTemp2 > 0) {
        iconTemp2 =
          iconTemp2.toString().length === 1
            ? "0" + iconTemp2.toString()
            : iconTemp2.toString();
      }
    }
    if (!valxAxisCol2) {
      updatePairColumn({
        valxAxisCol1: valxAxisCol1Temp,
        valxAxisCol2: valxAxisCol2Temp,
      });
    }
  } else {
    updatePairColumn({
      valxAxisCol1: valxAxisCol1Temp,
      valxAxisCol2: valxAxisCol2Temp,
    });
  }

  let listLine = [];
  listLine.push({...lineRealTime(data[data.length - 1][1])});
  listLine.push({...lineRealTime2(data, dates)});

  // config pair hover buy , sell
  let listHover = [];
  let listMarkPoint = [markPointMax()];

  if (hoverBuyPrice) {
    listLine.push({...lineRealTime(hoverBuyPrice, 2, "green")});
  }

  if (hoverCellPrice) {
    listLine.push({...lineRealTime(hoverCellPrice, 2, "red")});
  }

  if (hoverBuy) {
    if (!hoverBuyPrice) {
      hoverBuyPrice = data[data.length - 1][0];
    }
    listHover.push(areaBuy(hoverBuyPrice, data[data.length - 1][1] + 10000));

    if (!markPointBuyX) {
      markPointBuyX = dates[dates.length - 13];
      markPointBuyY = data[data.length - 1][1];
    }
    listMarkPoint.push(
      makerPointByCoord({
        valueLabel: 0,
        valStart: markPointBuyX,
        valEnd: markPointBuyY,
        symbol: "image:///images/icon-time/up.png",
        symbolOffset: [0, 0],
        symbolSize: 26,
      })
    );
  }

  if (hoverCell) {
    if (!hoverCellPrice) {
      hoverCellPrice = data[data.length - 1][1];
    }
    listHover.push(areaSell(hoverCellPrice));

    if (!markPointCellX) {
      markPointCellX = dates[dates.length - 13];
      markPointCellY = data[data.length - 1][1];
    }
    listMarkPoint.push(
      makerPointByCoord({
        valueLabel: 0,
        valStart: markPointCellX,
        valEnd: markPointCellY,
        symbol: "image:///images/icon-time/down.png",
        symbolOffset: [0, 20],
        symbolSize: 26,
      })
    );
  }
  if (listPushOrder.length > 0) {
    const {
      listMarkPoint: listMarkPointTemp,
      listLine: listLineTemp,
    } = _buildLinesBet(listPushOrder);
    listLine = [...listLine, ...listLineTemp];
    listMarkPoint = [...listMarkPoint, ...listMarkPointTemp];
  }
  return [
    {
      smooth: true,
      type: "candlestick",
      data,
      itemStyle: {
        color: "#22D291",
        color0: "#EB5757",
        borderColor: "#22D291",
        borderColor0: "#EB5757",
      },
      markPoint: {
        data: listMarkPoint,
      },
      markLine: {
        silent: true,
        symbol: ["none", "none", "none", ""],
        data: listLine,
      },
      markArea: {
        data: listHover,
      },
    },
  ].concat(_buildMAs(data));
};

const _configByTyChart = ({
                            data,
                            dataChartOther,
                            dates,
                            typeChart,
                            state,
                            updatePairColumn,
                          }) => {
  let result;
  let newData2 = [];
  const {listPushOrder} = state;
  const {listLine, listMarkPoint} = _buildLinesBet(listPushOrder);
  switch (typeChart) {
    case "candlestick":
      result = _buildChartCandlestick(data, dates, state, updatePairColumn);
      break;
    case "linearea":
      dataChartOther.forEach((item, i) => {
        newData2.push(item[0]);
      });
      result = [
        {
          data: newData2,
          markPoint: {
            data: [markPointMax(), ...listMarkPoint],
          },
          markLine: {
            silent: true,
            symbol: ["none", "none", "none", ""],
            data: listLine,
          },
          type: "line",
          smooth: true,
          symbol: "none",
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: " rgba(255,255,255,0.2)"},
                {offset: 1, color: " rgba(255,255,255,0)"},
              ]),
            },
          },
          lineStyle: {
            color: "white",
            width: 1,
          },
        },
      ];
      break;
    case "line":
      dataChartOther.forEach((item, i) => {
        newData2.push(item[0]);
      });
      result = [
        {
          data: newData2,
          markPoint: {
            data: [markPointMax(), ...listMarkPoint],
          },
          markLine: {
            silent: true,
            symbol: ["none", "none", "none", ""],
            data: listLine,
          },
          symbol: "none",
          type: "line",
          smooth: true,
          lineStyle: {
            color: "white",
            width: 1,
          },
        },
      ];
      break;
     default:
  }
  return result;
};

const loadChart = ({state, updatePairColumn}) => {

  const {
    dataChartOther,
    data: newData,
    typeChart,
    showToolbar,
    loopTimes,
    secondSpace,
    config
  } = state;


 const {startValue, endValue} = config;
  let rawData = _.clone(newData, true);
  if (rawData.length === 0) {
    return false;
  }

  rawData = addMoreTime(rawData, loopTimes, secondSpace);

  let rawData2 = _.clone(dataChartOther, true);

  rawData2 = addMoreTime(rawData2, 30, 1000);

  let dates = [];
  if (typeChart !== "candlestick") {
    dates = parseListDate(rawData2);
  } else {
    dates = parseListDate(rawData);
  }

  const data = parseListData(rawData);
 const data2 = parseListData(rawData2);

  const getChartByType = _configByTyChart({
    data,
    dataChartOther: data2,
    dates,
    typeChart,
    state,
    updatePairColumn,
  });
  myChart.setOption({
    ...configCommon({showToolbar}),
    ...configXAxis(dates),
    ...configDataZoom(startValue, endValue),
    animation: true,
    series: getChartByType,
  });
  if (document.getElementById("main-chart")) {
    document.getElementById("main-chart").classList.remove("loading");
  }
};





const Chart = () => {

  const socketConnect =  socketSignalR();
  const [state, actions] = useHookChart();
  const [isLoading, setLoading] = useState(false);
  const [stateSideBar] = useHookTradePair();
  let isConnectPrice = false;

  const listenNewCandlestick = (pair, secInput) => {
    const pairTemp = "NEW_CHART_" + pair.replace("/", "_");
    socketConnect &&
    socketConnect.on(pairTemp, (e) => {
      isConnectPrice = true;
      if (secInput && secInput === secTemp) {
        secTemp = secInput;
        return;
      }
      let newData = {
        OPEN: e.openPrice,
        CLOSE:e.closePrice,
        LOW: e.lowPrice,
        HIGH: e.highPrice,
        LASTTIME: e.timeClose * 1000,
        PriceChangePercent: 0,
        TIMES: e.timeOpen * 1000,
        VolumeFrom: e.volumeFrom,
        VolumeTo: e.volumeTo,
      };
      actions.getLastPriceNewCandlestick(newData, sec).then((state) => {
        //let {typeChart} = state;
        /// case change typeChart then reset point line bet
        // if (typeChartTemp && typeChart !== typeChartTemp) {
        //   actions.clearPointBet();
        // }
        // typeChartTemp = typeChart;
        // loadChart({state, updatePairColumn: actions.updatePairColumn});
      });

     // _initDataChart(actions);
      actions.changePairChart("BTC_USD");
    });
  };
  const listenPrice = (pair, secInput) => {
    const pairTemp = "CHART_" + pair.replace("/", "_");
    socketConnect &&
    socketConnect.on(pairTemp, (e) => {
      isConnectPrice = true;
      if (secInput && secInput === secTemp) {
        secTemp = secInput;
        return;
      }
      let newData = {
        OPEN: e.openPrice,
        CLOSE: e.closePrice,
        LOW: e.lowPrice,
        HIGH: e.highPrice,
        LASTTIME: e.timeClose * 1000,
        PriceChangePercent: 0,
        TIMES: e.timeOpen * 1000,
        VolumeFrom: e.volumeFrom,
        VolumeTo: e.volumeTo,
      };

      actions.getLastPriceUpdate(newData, sec).then((state) => {
        let {typeChart} = state;
        /// case change typeChart then reset point line bet
        if (typeChartTemp && typeChart !== typeChartTemp) {
          actions.clearPointBet();
        }
        typeChartTemp = typeChart;
        loadChart({state, updatePairColumn: actions.updatePairColumn});
      });
    });
  };
  useEffect(() => {
    pairDefaultTemp = stateSideBar.pairDefault;
    if (socketConnect && socketConnect.state === "Disconnected") {
      socketConnect
        .start()
        .then(() => {
          socketConnect.invoke("setPairname", "BTC_USD");
          socketConnect.on("serverTime", (e) => {
            sec =(59 - parseInt(JSON.stringify(e)));
          });
          isConnectPrice = true;
          listenNewCandlestick(stateSideBar.pairDefault, sec);
          listenPrice(stateSideBar.pairDefault, sec);
          

        })
        .catch((err) => {
          if (
            err.toString() === "Error: There was an error with the transport."
          ) {
            _removeCookie("token");
            _removeCookie("username");
            _removeCookie("access_token");
            _removeCookie("registedDate");
            window.location.href = "/login";
          }
        });
    }
  _initDataChart(actions);
    //_eventDataZoom(actions);
  //  _eventHoverBtn({state, updatePairColumn: actions.updatePairColumn});
  window.onresize = function () {
    setTimeout(() => {
      myChart.resize();
    }, 300);
  };
  
    // window.addEventListener("resize", () => {
    //   myChart.resize();
    // });
    $(document).ready(function () {
      $("#trading-sidebar").click(function () {
        setTimeout(() => {
          myChart.resize();
        }, 300);
        //
      });
    });

    // socketConnect &&
    // socketConnect.onreconnected(() => {
    //   socketConnect.invoke(
    //     "setPairname",
    //     pairDefaultTemp.replace("/", "_")
    //   );
    // });
    return () => {
      actions.resetState();
      actions.getResult();
      clearAvailable();
      sec = undefined;
      secTemp = undefined;
      
      // if (socketConnect) {
      //   //socketconnect.stop();
      //   // socketconnect.off(
      //   //   "chart_" + statesidebar.pairdefault.replace("/", "_")
      //   // );
      //   // socketconnect.off(
      //   //   "new_chart_" + statesidebar.pairdefault.replace("/", "_")
      //   // );
      //   socketconnect.off("CHART_BTC_USD");
      //   socketconnect.off("NEW_CHART_BTC_USD");
      //    socketconnect.off("servertime");
      // }

      return null;
    };
  }, []);

  if (pairDefaultTemp && pairDefaultTemp !== stateSideBar.pairDefault) {
    const temp = stateSideBar.pairDefault.replace("/", "_");
    setLoading(true);
    socketConnect && socketConnect.off("CHART_" + pairDefaultTemp);
    socketConnect && socketConnect.off("NEW_CHART_" + pairDefaultTemp);
    actions.resetState({PAIR: temp});
    clearAvailable();
    setTimeout(() => {
      socketConnect && socketConnect.invoke("setPairname", temp);
      socketConnect.on("serverTime", (e) => {
        sec =(59 - parseInt(JSON.stringify(e)));
      });
      myChart && myChart.dispose();
      if (document.getElementById("main-chart")) {
        document.getElementById("main-chart").classList.add("loading");
      }

      listenNewCandlestick(stateSideBar.pairDefault, sec);
      listenPrice(stateSideBar.pairDefault, sec);
      
      _initDataChart(actions);
      _eventDataZoom(actions);

      setTimeout(() => {
        myChart.resize();
        setLoading(false);
      }, 2000);
    }, 500);
  }
  pairDefaultTemp = stateSideBar.pairDefault;
  const height = (use100vh() - 428) + "px";
  return (

    <div
      className={`${isLoading ? "loading active" : ""}`}
      id="main-chart"
      style={{width: "100%", height: height}}/>
  );
};

export default Chart;
