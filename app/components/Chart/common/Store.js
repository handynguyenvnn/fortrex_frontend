import { createStore, createHook, createContainer, createSubscriber } from 'react-sweet-state'
import axios from 'axios'
const Store = createStore({
    initialState: {
        listTab: [{
            key: 'trade',
            class: '',
            name: 'TRADE',
        },
        {
            key: 'orders',
            class: '',
            name: 'ORDERS',
        },
        {
            key: 'charts',
            class: '',
            name: 'CHARTS',
        },
        {
            key: 'book',
            class: '',
            name: 'BOOK',
        },
        {
            key: 'history',
            class: '',
            name: 'HISTORY',
        }],
        tabActive: 'top-assets',
        isSideBar: true,
        listTradePair: [],
        listUserTrading: [],
        totalForex: 0,
        totalCrypto: 0,
        keySearch: '',
        pairDefault: 'BTC/USD',
        listTime: {
            "30s":30,
            "2min": 5,
            "5min": 11,
            "15min": 19,
            "30min": 29,
            "3 hours": 11,
            "1 day": 11,
            "30 days": 11
        },
        timeDefault: '30s',
        typeChart: { name: 'Candlestick', type: 'candlestick', icon: "images/icon/tool-chart/candlestick.png" },
        listTypeChart: [
            { name: 'Candlestick', type: 'candlestick', icon: "images/icon/tool-chart/candlestick.png" },
            { name: 'Areaspline', type: 'linearea', icon: "images/icon/tool-chart/linearea.png" },
            { name: 'Line', type: 'line', icon: "images/icon/tool-chart/line.png" },
            // {name:'Ohlc',type:'ohlc',icon:"images/icon/tool-chart/ohlc.png"}
        ],
        hiddenBar: true,
        listFavorite: []
    },
    actions: {
        toggleBar: (hiddenBar) => ({ setState }) => {
            setState({ hiddenBar })
        },

        changeSearch: (keySearch) => ({ setState }) => {
            setState({ keySearch })
        },
        changeTab: (tabActive) => ({ setState }) => {
            setState({ tabActive })
        },

    },
    name: 'Menu Pair Store',
})
export const useHookTradePair = createHook(Store)
export const Container = createContainer(Store, {
    onInit: () => ({ setState }, props) => {
        setState({ ...props })
    },
})
export const Subscriber = createSubscriber(Store)
