import React from 'react';
import DashboardTop from "components/Dashboard/DashboardTop";
import DashBoardBottom from "components/Dashboard/DashboardBottom";
const Board = props => {
    return (
            <div>
                <DashboardTop/>
                <DashBoardBottom/>
            </div>
    );
};
Board.propTypes = {
};
export default Board;
