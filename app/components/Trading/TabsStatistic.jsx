import React from 'react'

const TabsStatistic = props => {
    const {up, down, hoursAgo, minAgo} = props
    return (
        <div className="results tab-statistic">
            <h3 className="title">Last seen sequence</h3>
            <div className='line'>
                <h3 className="ttl2"> {hoursAgo || 0} hour ago</h3>
                <ul className="number">
                    <li className="bg1">x5</li>
                    <li className="bg1"/>
                    <li className="bg1"/>
                    <li className="bg1"/>
                    <li className="bg2"/>
                </ul>
            </div>
            <div className='line'>
                <h3 className="ttl2 mt17">{minAgo || 0} mins ago</h3>
                <ul className="number">
                    <li className="bg1">x5</li>
                    <li className="bg1"/>
                    <li className="bg1"/>
                    <li className="bg1"/>
                    <li className="bg3"/>
                </ul>
            </div>
      </div>
    )
}

export default TabsStatistic