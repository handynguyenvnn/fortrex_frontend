import {
  createStore,
  createHook,
  createContainer,
  createSubscriber,
} from "react-sweet-state";
import {
    isMobile
} from "react-device-detect";
import moment from "moment";
import axios from "axios";
import _ from "lodash";
import {chartKline} from "services";
import {MONEY_TYPE_DEFAULT,DEFAULT_DATA_CHART_GET} from "constants/constant";

const stateDefault = {
  showToolbar: true,
  secondSpace: 60000,
  loopTimes: isMobile?(60 / 10).toFixed(0):(60 / 12).toFixed(0),
  //loopTimes: 0,//(60 / 12).toFixed(0),
  timeStartDefault: 0,
  endStartDefault: 1,
  percentBreak: 30,
  loopTimesCol1: 0,
  loopTimesCol2: 0,
  data: [],
  serverTime: "",
  config: {
    //startValue: 60,
    startValue: isMobile?80:60,
    endValue: 100,
  },
  objTime: {
    "1M": 60,
    "5M": 300,
  },
  timeStart: 60,
  isBet: false,
  valxAxisCol1: "",
  valxAxisCol2: "",
  listPushOrder: [],
  typeChart: "candlestick",
  dataChartOther: [],
  PAIR: MONEY_TYPE_DEFAULT,
  dataLast: {},
  sec: 1,
  isChange: false

};
//let isAddNewCandlestick = 0;
const parseData = (data) => {

  return data.map((item) => {
    return [
      moment(item.Times || item.TIMES).format("HH:mm:ss"),
      item.Close || item.CLOSE,
      item.Open || item.OPEN,
      "",
      "",
      item.High || item.HIGH,
      item.Low || item.LOW,
      "",
      "",
      "-",
      item.Times || item.TIMES
    ];
    // return [
    //   moment(item.Times || item.TIMES).format("HH:mm:ss"),
    //   item.Open || item.OPEN,
    //   item.Close || item.CLOSE,
    //   item.Low || item.LOW,
    //   item.High || item.HIGH,
    //   "",
    //   "",
    //   "-",
    //   item.Times || item.TIMES,
    // ];
  });
};

const parseData2 = (data) => {
  return data.map((item) => {
    return [
      moment(item.TimeClose || item.LASTTIME).format("HH:mm:ss"),
      item.Close || item.CLOSE,
      item.Open || item.OPEN,
      "",
      "",
      item.High || item.HIGH,
      item.Low || item.LOW,
      "",
      "",
      "-",
      item.Times || item.TIMES
    ];
  });
};

const Store = createStore({
  initialState: {...stateDefault},
  actions: {
    resetState: () => ({setState}) => {
      setState({...stateDefault});
    },
    clearPointBet: () => ({setState}) => {
      setState({
        listPushOrder: [],
        dataLast: {},
      });
    },
    changePairChart: ({PAIR}) => ({setState}) => {
      document.getElementById("main-chart").classList.add("loading");
      chartKline({Pair: MONEY_TYPE_DEFAULT,Item:DEFAULT_DATA_CHART_GET}).then((res) => {
        const data = parseData(res.data.Reply);
        const data2 = parseData2(res.data.Reply);
        const end = data.length - 1;
        //let newData = data.slice(end - 150, end);
        let newData = data;//.slice(end - 150, end);
        setState({
          data: newData,
          dataChartOther: data2,
          PAIR: PAIR,
        });
      });
    },
    getLastCandlestickByNumberItem:({PAIR,ITEMS,SORTBY}) => ({setState}) => {
      document.getElementById("main-chart").classList.add("loading");
      chartKline({Pair: MONEY_TYPE_DEFAULT,Item:ITEMS,Sortby:SORTBY}).then((res) => {
        const data = parseData(res.data.Reply);
        const data2 = parseData2(res.data.Reply);
        const end = data.length - 1;
        let newData = data.slice(end - 150, end);
        setState({
          data: newData,
          dataChartOther: data2,
          PAIR: PAIR.replace("/", "_"),
        });
      });
    },
    updatePairColumn: ({valxAxisCol1, valxAxisCol2}) => ({
                                                           setState,
                                                           getState,
                                                         }) => {
      setState({
        valxAxisCol1,
        valxAxisCol2,
      });
    },

    assignLinePushOrder: (amount, color, priceOrder) => ({
                                                           setState,
                                                           getState,
                                                         }) => {
      let {listPushOrder, data} = getState();
      let filterPrice = data.filter((item) => item[1] === priceOrder); // price order from api
      let findPrice = filterPrice.slice(-1)[0]; // get record lasted
      if (findPrice && findPrice.length > 0) {
        listPushOrder.push({
          pricePushOrder: findPrice[1],
          datePushOrder: findPrice[0],
          amount,
          color,
        });
        setState({
          listPushOrder,
        });
      }
    },
    updateTimeConfig: ({
                         timeStart,
                         endStartDefault,
                         loopTimesCol1,
                         loopTimesCol2,
                       }) => ({setState, getState}) => {
      setState({
        timeStart,
        endStartDefault,
        loopTimesCol1,
        loopTimesCol2,
      });
    },
    updateConfigChart: ({start, end}) => ({setState, getState}) => {
      setState({
        config: {
          ...getState().config,
          startValue: start,
          endValue: end,    
        },
      });
    },
    initDataChart: () => ({setState, getState}) => {
      return new Promise((resolve, reject) => {
        chartKline({Pair: MONEY_TYPE_DEFAULT,Item: DEFAULT_DATA_CHART_GET}).then((res) => {
          const data = _.clone(parseData(res.data.Reply), true);
          const data2 = _.clone(parseData2(res.data.Reply), true);

          //const end = data.length - 1; // not need
          //let newData = data.slice(end - 150, end); not need
          setState({data, dataChartOther: data2});
          //resolve(newData);
          resolve(data);
        });
      });
    },
    getServerTime: () => ({setState}) => {
      axios.get("https://api.fortrex.io/api/servertime").then((response) => {
        const {Reply} = response.data;
        setState({serverTime: 59 - Reply});
      });
    },
    //getLastPriceNew
    getLastPriceNewCandlestick_Bak: (newData, sec) => ({setState, getState}) => {
      setState({
        sec,
      });
      return new Promise((resolve, reject) => {
        let {data, isChange, dataChartOther} = getState();
        let dataOld = _.clone(data, true);
        let lastRecord = dataOld[dataOld.length - 1];
        let objLastPrice = parseData([newData])[0];
        const objLastPriceForChartOther = parseData2([newData])[0];
        dataChartOther.push(objLastPriceForChartOther);
        // && (sec === 30 || sec ===0)
        if (objLastPrice && lastRecord) {
              // objLastPrice[2]=objLastPrice[2];
              // objLastPrice[5]=objLastPrice[1];
              // objLastPrice[6]=objLastPrice[1];
               //objLastPrice.shift();
               //objLastPrice.unshift(moment().format("HH:mm:ss"));
            
              objLastPrice.shift();
               //objLastPrice.unshift(moment(newData.TIMES).format("HH:mm:ss"));
               objLastPrice.unshift(moment().format("HH:mm:ss"));
               dataOld.push(objLastPrice);
          //dataOld.push(newData);
          if (data.length !== dataOld.length) {
            dataOld = dataOld.slice(1, dataOld.length);
          }
          setState({
            data: !isChange ? dataOld : [],
            dataChartOther: !isChange ? dataChartOther : [],
            dataLast: {
              price: newData.CLOSE,
              date: moment(newData.LASTTIME).format("HH:mm:ss"),
            },
            isChange: false,
          });
          resolve(getState());
        }
      });
    },
    //getLastPriceNew
    getLastPriceNewCandlestick: (newData, sec) => ({setState, getState}) => {
      setState({
        sec,
      });
      return new Promise((resolve, reject) => {
        let {data, isChange, dataChartOther} = getState();
        let dataOld = _.clone(data, true);
        let lastRecord = dataOld[dataOld.length - 1];
        let objLastPrice = parseData([newData])[0];
        if (objLastPrice && lastRecord) {
              //objLastPrice.shift();
               //objLastPrice.unshift(moment(newData.TIMES).format("HH:mm:ss"));
               //objLastPrice.unshift(moment().format("HH:mm:ss"));
               //dataOld.push(objLastPrice);
              // reload api lastcandlestick


              // chartKline({Pair: MONEY_TYPE_DEFAULT,Item:2}).then((res) => {
              //   let itemData = res.data.Reply[0];
              //   //const rawData = parseData(getItem);
              //   //dataOld = dataOld.slice(dataOld.length-2, dataOld.length-1);
              //   let dataChartItem = dataOld.find(element => element[10] === itemData.Times);
              //     const dataChartIndex = dataOld.findIndex(element => element[10] ==itemData.Times);
              //     let timeItem = moment(itemData.Times).format("HH:mm:ss");
              //     console.log('Times: ',itemData.Times,' - ', timeItem)
              //     //const updateItem =  [timeItem, 1111, 19302.8344, "", "", 19306.2732, 19297.8534, "", "", "-", 1607065320000];
              //     if (dataChartItem) {
              //       dataChartItem[0]=timeItem;
              //       dataChartItem[1]=itemData.Close;//close
              //       dataChartItem[2]=itemData.Open;//open
              //       dataChartItem[5]=itemData.High;//hight
              //       dataChartItem[6]=itemData.Low;//low
              //       //dataChartItem[10]=item[10];
                  
              //     //dataOld[dataChartIndex] = dataChartItem;
              //     dataOld.pop();
              //     dataChartItem.shift();
              //     dataChartItem.unshift(timeItem);
        
              //     dataOld.push(dataChartItem);
              //     }
              //     // else{
              //     //   //  const lastItem = dataOld[dataOld.length-1][10];
              //     //   // if (parseInt(lastItem)< parseInt(item[10])) {
              //     //   //   //const addItem =  [item[0], item[1], item[2], "", "", item[6],item[5], "", "", "-", item[10]];
              //     //   //   objLastPrice.shift();  
              //     //   //   objLastPrice.unshift(timeItem);
              //     //   //   dataOld.push(objLastPrice);
              //     //   // }
              //     // }
              //     objLastPrice.shift();
              //     //objLastPrice.unshift(moment().format("HH:mm:ss"));
              //     objLastPrice.unshift(moment(res.data.Reply[1].Times).format("HH:mm:ss"));
              //     //objLastPrice.unshift(item[0]);
              //     dataOld.push(objLastPrice); 
              // });

              objLastPrice.shift();
              //objLastPrice.unshift(moment().format("HH:mm:ss"));
              objLastPrice.unshift(moment(objLastPrice[0]).format("HH:mm:ss"));
              //objLastPrice.unshift(item[0]);
              dataOld.push(objLastPrice); 
          
          if (data.length !== dataOld.length) {
            dataOld = dataOld.slice(1, dataOld.length);
          }
        
          setState({
            data: !isChange ? dataOld : [],
            dataChartOther: !isChange ? dataChartOther : [],
            dataLast: {
              price: newData.CLOSE,
              date: moment(newData.LASTTIME).format("HH:mm:ss"),
            },
            isChange: false,
          });
          resolve(getState());
        }
      });
    },
    //getLastPriceNew update
    getLastPriceUpdate: (newData, sec) => ({setState, getState}) => {
      setState({
        sec,
      });
      return new Promise((resolve, reject) => {
        let {data, isChange, dataChartOther} = getState();
        let dataOld = _.clone(data, true);
        let lastRecord = dataOld[dataOld.length - 1];
        let objLastPrice = parseData([newData])[0];
        const objLastPriceForChartOther = parseData2([newData])[0];
        dataChartOther.push(objLastPriceForChartOther);

        if (objLastPrice && lastRecord && (sec <= 59 && sec >=1 )) {

          dataOld.pop();
          objLastPrice.shift();
          objLastPrice.unshift(lastRecord[0]);

          dataOld.push(objLastPrice);
          if (data.length !== dataOld.length) {
            dataOld = dataOld.slice(1, dataOld.length);
          }
          setState({
            data: !isChange ? dataOld : [],
            dataChartOther: !isChange ? dataChartOther : [],
            dataLast: {
              price: newData.CLOSE,
              date: moment(newData.LASTTIME).format("HH:mm:ss"),
            },
            isChange: false,
          });
          resolve(getState());
        }
      });
    },
    getLastPrice: (sec) => ({setState, getState}) => {
      setState({
        sec,
      });
      return new Promise((resolve, reject) => {
        axios.post("https://api.fortrex.io/api/markets", {Pair: getState().PAIR}).then((res) => {
          let {data, isChange, dataChartOther, sec} = getState();
          let dataOld = _.clone(data, true);
          const lastRecord = dataOld[dataOld.length - 1];
          const objLastPrice = parseData([res.data])[0];
          const objLastPrice2 = parseData2([res.data])[0];
          dataChartOther.push(objLastPrice2);
          if (objLastPrice && lastRecord) {
            if (sec == 30 || sec == 0) {
              // setTimeout(function() { //Start the timer
              //   objLastPrice.shift();
              //   objLastPrice.unshift(moment().format("HH:mm:ss"));
              //   sec+=1;
              // }.bind(this), 1000)
             // sec+=1;

              //objLastPrice.shift();
              //objLastPrice.unshift(moment().format("HH:mm:ss"));
            } else {
              dataOld.pop();
              objLastPrice.shift();
              objLastPrice.unshift(lastRecord[0]);
            }

            dataOld.push(objLastPrice);
            if (data.length !== dataOld.length) {
              dataOld = dataOld.slice(1, dataOld.length);
            }

            setState({
              data: !isChange ? dataOld : [],
              dataChartOther: !isChange ? dataChartOther : [],
              dataLast: {
                price: res.data.CLOSE,
                date: moment(res.data.LASTTIME).format("HH:mm:ss"),
              },
              isChange: false,
            });
          }
          resolve(getState());
        });
      });
    },
    countDownTime: (serverTime) => ({setState}) => {
      return new Promise((resolve, reject) => {
        if (serverTime === 0) {
          serverTime = 59;
        }
        setState({serverTime});
        resolve(serverTime);
      });
    },
    changeChartType: (typeChart) => ({setState}) => {
      setState({typeChart});
    },
    getResult: () => ({setState}) => {
      return new Promise((resolve, reject) => {
        setState({listPushOrder: [],});
        resolve({});
      });
    },
  },
  name: "Chart Store",
});
export const useHookChart = createHook(Store);
export const Container = createContainer(Store, {
  onInit: () => ({setState}, props) => {
    setState({...props});
  },
});
export const Subscriber = createSubscriber(Store);
