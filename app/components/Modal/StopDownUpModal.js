import React, {useEffect, useState} from 'react';
import { Modal } from 'antd';
import './styles.scss';
import img1 from '../assets/images/popup_img1.svg'
import {formatThousandOfNumber} from "utils/utils";

const StopDownUpModal = ({ visible, setVisible, data}) => {
   // const priceOrder = data && data.PriceOrder;
    //const pairName = data && data.Pairname;
    const handleCloseModal = () => {
        setVisible(false);
    }
    return (
        <div>
            <Modal
                centered
                width={0}
                footer={null}
                visible={visible}
                closable={false}
                onCancel={() => setVisible(false)}
            >
                <div className="popup">
                    <div className="inner">
                        <div className="img">
                            <img src={img1} alt="" />
                        </div>
                        <h3 className="title">CONGRATULATION!</h3>
                        {/* <p className="number">+ {formatThousandOfNumber(priceOrder)}<span>{pairName}</span></p> */}
                        <p className="number"><span>{data}</span></p>
                        <button className="btn" onClick={() => handleCloseModal()}>CONTINUE TRADE</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
export default StopDownUpModal;
