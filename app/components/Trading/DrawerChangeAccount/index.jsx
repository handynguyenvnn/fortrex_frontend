import React, { useState } from 'react'
import { Drawer, Button, Radio, Space, Input } from 'antd';
import IconPlus from '../../../components/assets/images/plus.svg'
import IconMinus from '../../../components/assets/images/minus.svg'
import IconDelete from 'components/assets/images/delete.svg'
import IconBack from 'components/assets/images/back.svg'
import IconGES from 'components/assets/images/GES.svg'
import IconT from 'components/assets/images/T.svg'
import IconUSDT from 'components/assets/images/usdt.svg'
import IconELD from 'components/assets/images/ELD.svg'
import IconBRI from 'components/assets/images/BRI.svg'
import IconUSD from 'components/assets/images/USD.svg'
import './styles.scss'

const DrawerChangeAccount = props =>  {

    const { visible, onClose, practice, onSubmit, value } = props
    const [itemSelect, setItemSelect] = useState(value)

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
            // visible={true}
          className={'drawer-change-account'}
          destroyOnClose={props.destroyOnClose}
          height={'100vh'}
          width={'100%'}
          zIndex={5}
        >
        <>
            <div className='drawer-change-account-header'>
                    <img src={IconBack} onClick={()=> handleClose()}/>
                    <span> Choose an account</span>
            </div>
            <div className='description'>
                <span> Please confirm which account you would like to trade</span>
            </div>
            <div> 
                {(practice || []).map((item, index) => <ItemTypeAccount 
                    item={item}
                    onClick={()=>{
                        console.log(item.WalletCode)
                        setItemSelect(item.WalletCode)
                    }} 
                    itemSelect={itemSelect}
                    />
                )}
            </div>
            <div className={'btn-submit'}>
                <Button onClick={handleDone}> 
                    <span>  START TRADING </span>
                </Button>
            </div>
        </>
        </Drawer>
      </>
    );
}

const ItemTypeAccount = props => {
    let { item, itemSelect, onClick } = props
    let icon = getIcon(item.WalletCode)
    return (
        <div onClick={onClick} className={`item-type ${item.WalletCode == itemSelect ? 'active' : ''} `}>
            {icon}
            <div className='content'>
                <label>{item.WalletName} </label>
                <h3> {item.BalanceFormat}</h3>
            </div>
    </div>
    )
} 

export const getIcon = type => {
    switch (type) {
        case 'GES':
            return <img class="icon-ticket" src={IconGES} />
        case 'USDT':
            return <img class="icon-ticket" src={IconT} />
        case "DEMO":
            return <img class="icon-ticket" src={IconUSD} />
        case "ELD":
            return <img class="icon-ticket" src={IconELD} />
        case "BRI":
            return <img class="icon-ticket" src={IconBRI} />
        default:
            return <img class="icon-ticket" src={IconUSD} />
    }
}

export default DrawerChangeAccount