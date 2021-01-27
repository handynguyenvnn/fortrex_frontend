import React, { Fragment, useEffect } from 'react'
import CircleRed from '../../../app/assets/img/sys-red.svg'
import CircleGreen from '../../../app/assets/img/sys-green.svg'
import CircleGray from '../../../app/assets/img/sys-gray.svg'
import './styles.scss'
import { useHookChart } from '@components/Chart/Store'
import moment from "moment"

import {takeRight, chunk} from 'lodash'

let type = ['up', 'down', 'undefine']
let fakeResult = (data) => {
    const l = data.length;
    if(l == 40) {
        for (let i = 0; i < 20; i++) {
            data.push([1,1])
        }
    }
    const _newArr = chunk(data, 20)
    if (_newArr[2].length < 20) {
        let j = (20 - _newArr[2].length);
        for (let i = 0; i < j; i++) {
            _newArr[2].push([1,1])
        }
    }
    return _newArr.map((item, index) => (
        <div className={'result-item'} key={'par' + index}>
            {
                item && !!item.length && item.map((childEl, i) => {
                    return getColorItem(childEl[1] > childEl[2] ? 'up' : childEl[1] < childEl[2] ? 'down' : 'undefine')
                })
            }
        </div>
    ))
}
const ResultItem = props => {
    const [state] = useHookChart();

    useEffect(() => {
        //console.log('data chart change:', state.data)
    }, [state.data])

    const lastRecord = takeRight(state.data, 1)
    //console.log(lastRecord)
    if(!lastRecord || !lastRecord.length) return null;
    const _strTime = lastRecord[0];
    //console.log(_strTime)
    const _time = _strTime[0].split(':');

    const _intMinute = parseInt(_time[1]);

    const timeToShow = (_intMinute % 10 === 0 && _time[2] === '00') ? 41 : (40 + (_intMinute % 10) * 2 + (_time[2] === '30' ? 1: 0));


    const _dataToShow = takeRight(state.data, timeToShow);
    // console.log(_dataToShow);
    return (
        <Fragment>
            {
                _dataToShow && !!_dataToShow.length ?
                fakeResult(_dataToShow) : null 
            }
        </Fragment>
    )
}

const getColorItem = type => {
    switch (type) {
        case 'down':
            return <img src={CircleRed} width={18} height={18} />
        case 'up':
            return <img src={CircleGreen} width={18} height={18} />
        case 'undefine':
            return <img src={CircleGray} width={18} height={18} />
        default:
            return <img src={CircleGray} width={18} height={18} />
    }
}

export default ResultItem