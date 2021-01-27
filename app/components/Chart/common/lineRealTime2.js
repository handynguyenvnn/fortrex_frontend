import {
    isMobile
} from "react-device-detect";
export const lineRealTime2 = (data, dates) => {
    let offset = dates[dates.length - 1];
    
    if (isMobile) {
        offset = dates[dates.length-1]
    }else{
        //offset =dates[dates.length - 13]
       // offset = setResize(dates);
    }
    return [{
        lineStyle: {
            type: "solid",
            color: "rgba(123, 118, 118, 1)"
        },
        //xAxis: dates[dates.length - 13],
        xAxis: offset,
        yAxis: data[data.length - 1][1],
    },
    {
        xAxis:  dates[dates.length - 1],
        yAxis: data[data.length - 1][1],
        label: {
          
           offset: 0,
            color: 'black',
            distance: "0",// When the positon value is'top', etc.
            //padding: [10, 10, 10, 10],
            padding: [3, 2, 3, 15],
            // backgroundColor: '#E0E0E0',
            backgroundColor: {
                image: '/images/icon-time/arrow-lastprice.png?v=5.2'
            },
            formatter: function (obj) {
                return (obj.data.yAxis)
            }
        },
        lineStyle: {
            offset: 0,
            type: "solid",
            color: "rgba(123, 118, 118, 1)"
        },
    }]
}
function setResize(dates) {
    
    const screenWidth = parseInt(window.innerWidth);
    if(screenWidth >= 415 && screenWidth < 765) {
        return dates[dates.length-1];
    }
    else if (screenWidth >= 765 && screenWidth < 1024) {
        return dates[dates.length-1];
    }
    else if (screenWidth >= 1025 && screenWidth < 1366) {
        //return dates[dates.length - 13];
        return dates[dates.length - 1];
    }
    else if (screenWidth >= 1366) {
        return dates[dates.length -1 ];
    }
}
// window.onresize = function () {
//     setTimeout(() => {
//         configYAxis();
//     }, 600);
//   };
