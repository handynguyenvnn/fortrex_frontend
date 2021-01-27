import React, { useState } from 'react'
import { Drawer, Button, Radio, Space, Input } from 'antd';
import IconBack from 'components/assets/images/back.svg'
import TradingOrderMobile from '@components/TradingOrder/TradingOrderMobile';
import { useHistory } from 'react-router-dom'
import { PAGE_PATHS } from '../../../constants/constant';
import './styles.scss'

const DrawerOrderMobile = props =>  {

    const { visible, onClose } = props
    const history = useHistory()
    const handleClose = () => {
      onClose && onClose()
    }
    const handleDone = () => {
        onSubmit && onSubmit(itemSelect)
        onClose && onClose()
    }

    return (
      <>
        <Drawer
          {...props}
          placement={'right'}
          closable={false}
          visible={visible}
          className={'drawer-order-mobile'}
          destroyOnClose={props.destroyOnClose}
          height={'100vh'}
          width={'100%'}
          zIndex={5}
        >
        <>
          <div className='drawer-order-mobile-header'>
            <img src={IconBack} onClick={()=> handleClose()}/>
            <span> Open Order</span>
            <span className='trade-history' onClick={() => history.push(PAGE_PATHS.TRANSACTION_HISTORY)}> Trade History </span>
          </div>
          <TradingOrderMobile visible={visible} />
        </>
        </Drawer>
      </>
    );
}


export default DrawerOrderMobile