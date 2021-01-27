import React, { useState } from 'react'
import { Drawer, Button, Radio, Space, Input } from 'antd';
import IconPlus from '../../../components/assets/images/plus.svg'
import IconMinus from '../../../components/assets/images/minus.svg'
import IconDelete from 'components/assets/images/delete.svg'

import './styles.scss'
import { parseInt } from 'lodash';

const DrawerChangeAmount = props =>  {

    const { visible, onClose, amount, marketPrice, selectPractice, onChangeAmount } = props

    const handeOnPlusAmount = value => {
      let total = parseInt(value) + parseInt(amount)
      onChangeAmount && onChangeAmount(parseInt(total))
    }
    
    const handleOnMultiAmount = value => {
      let total = parseInt(value) * parseInt(amount)
      onChangeAmount && onChangeAmount(parseInt(total))
    }

    const handeOnAddAmount = str => {
      let s = amount + str
      onChangeAmount && onChangeAmount(parseInt(s))
    }
    const handeOnRemoveLastCharAtAmount = () => {
      let s = amount + '';
      if (s.length == 1) {
        onChangeAmount && onChangeAmount(0)
      } else {
        onChangeAmount && onChangeAmount(parseInt(s.slice(0, -1)))
      }
    }
    
    const handleDone = () => {
      onClose && onClose()
    }

    return (
      <>
        <Drawer
          {...props}
          placement={'bottom'}
          closable={false}
          visible={visible}
          className={'drawer-change-amount'}
          destroyOnClose={props.destroyOnClose}
          height={376}
          zIndex={2}
        >
        <>
          <div className={'profit-content-top'}>
            <span className='label'> Profit</span>
            <span className="price-total">+{marketPrice}%</span>
            <span className="amount">{amount * marketPrice / 100 || 0} <span className='type-amount'> {selectPractice}</span> </span>
          </div>
          <div className={'profit-content-middle'}>
            <label>Amount</label> 
            <Input 
              prefix={<img src={IconMinus} onClick={()=> handeOnAddAmount(-1)} />}
              suffix={<img src={IconPlus} onClick={()=> handeOnAddAmount(1)} />}
              value={amount || 0}
              maxLength={5}
              readOnly={true}
              onChange={e => handeOnPlusAmount(e.target.value)}
            />
          </div>
          <div className="list-booter">
              <div onClick={() => handeOnPlusAmount(selectPractice)}>MAX</div>
              <div onClick={() => handeOnPlusAmount(5)}>+5</div>
              <div onClick={() => handeOnPlusAmount(10)}>+10</div>
              <div onClick={() => handeOnPlusAmount(20)}>+20</div>
              <div onClick={() => handeOnPlusAmount(50)}>+50</div>
              <div onClick={() => handeOnPlusAmount(100)}>+100</div>
              <div onClick={() => handleOnMultiAmount(2)}>x2</div>
              <div onClick={() => handleOnMultiAmount(3)}>x3</div>
              <div onClick={() => handleOnMultiAmount(5)}>x5</div>
          </div>
          <div class="grid-number">
            <div class="grid-item" onClick={()=> handeOnAddAmount('1')}>1</div>
            <div class="grid-item" onClick={()=> handeOnAddAmount('2')}>2</div>
            <div class="grid-item" onClick={()=> handeOnAddAmount('3')}>3</div>  
            <div class="grid-item" onClick={()=> handeOnAddAmount('4')}>4</div>
            <div class="grid-item" onClick={()=> handeOnAddAmount('5')}>5</div>
            <div class="grid-item" onClick={()=> handeOnAddAmount('6')}>6</div>  
            <div class="grid-item" onClick={()=> handeOnAddAmount('7')}>7</div>
            <div class="grid-item" onClick={()=> handeOnAddAmount('8')}>8</div>
            <div class="grid-item" onClick={()=> handeOnAddAmount('9')}>9</div>  
            <div class="grid-item no-bg" onClick={()=> handeOnRemoveLastCharAtAmount()}><img src={IconDelete} /></div>  
            <div class="grid-item" onClick={()=> handeOnAddAmount('0')}>0</div>  
            <div class="grid-item no-bg" onClick={() => handleDone()}>Done</div>  
          </div>
        </>
        </Drawer>
      </>
    );
}

export default DrawerChangeAmount