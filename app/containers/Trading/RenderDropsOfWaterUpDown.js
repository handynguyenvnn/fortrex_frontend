import imgGreen from "components/assets/img/green.jpg";
import imgRed from "components/assets/img/red.jpg";

import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {getLastResult} from "services";
import './style.scss'

const RenderDropsOfWaterUpDown =props => {
  const [dataDatable, setDataTable] = useState([]);

  useEffect( () => {
    getResultLast();
  }, [])

  const getResultLast = () => {
    try {
      getLastResult()
        .then(res => {
          if (res && res.data.StatusCode === 200) {
            setDataTable(res.data.Reply);
          }
        })
        .catch()
        .finally(() => {
        });
    } catch{
    }
  }

  const renderDropsWaters = () => {
    let total = 20
    let i = 0
    let l = []
    let l1 = new Array(total)
    l1.fill(3)
    while( i < 100) {
      let value = dataDatable[i]
      l1[i%total] = value 
      if(i % total == 19) {
        l.push(l1)
        l1 = new Array(total)
        l1.fill(3)
      }
      i++
    }
    
    let l2 = l
    return l2 && l2.length && l2.map( o => {
      return(
        <div className='gr-split'>
          {o.map((e, i) => {
            if(e == 1) return <div className='dwred'/> 
            if(e == 2) return <div className='dwgreen'/> 
            return <div className='dwgray'/> 
          })}
        </div>
      )
    })
}

  return (
    <div className="group-dw">
      {renderDropsWaters()}
   </div>
  )

}
export default RenderDropsOfWaterUpDown;
