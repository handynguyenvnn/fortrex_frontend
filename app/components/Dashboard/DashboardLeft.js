import React, {useEffect, useState} from 'react';
import {getDashboardSnapshot} from "services";

const DashboardLeft = props => {
    const [dataDatable, setDataTable] = useState([]);
    const DashboardSnapshot = () => {
        try {
            getDashboardSnapshot()
                .then(res => {
                    if (res && res.data.StatusCode === 200) {
                        setDataTable(res.data.Reply);
                    }
                })
                .catch()
                .finally(() => {}
                );
        } catch (errorInfo) {
        }
    }
    const renderTableDashboardSnapshot = () => {
        return  dataDatable.length > 0 && dataDatable.map((item, index) => {
            const {
                Token,Vol,Profit
            } = item;
            return (
                <tr  key={Token}>
                <td>
                <img height={18} width={18} src={"https://static.fortrex.io/images/"+Token+".png?v=2"}/>
                   <span style={{marginLeft: 5}}> {Token}</span>
                </td>
                <td>{Vol}</td>
                <td>{Profit}</td>
            </tr>
               
            )
        })
    }

    useEffect( () => {
        DashboardSnapshot();
    }, [])
    return (
        <div className="content-left">
            <div className="experience">
                <div className="title">
                    <h3 className="ttl">Your Trading Snapshot</h3>
                </div>
                <div className="table height-table1">
                    <table>
                        <tr>
                            <th>Token</th>
                            <th>Vol.</th>
                            <th>Net profit</th>
                        </tr>
                        {renderTableDashboardSnapshot()}
                    </table>
                </div>
            </div>
        </div>
    );
};
DashboardLeft.propTypes = {};
export default DashboardLeft;
