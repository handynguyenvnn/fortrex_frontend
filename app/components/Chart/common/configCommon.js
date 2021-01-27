import {
    isMobile
} from "react-device-detect";
const configYAxis = () => {
    let offset = 18;
    if (isMobile) {
        offset = -45
    }else   {
        offset = setResize();
    }
    return {
        position: "right",
        type: 'value',
        scale: true,
        offset,
        axisLine: {
            offset,
            show: false,
            lineStyle: { color: '#8392A5' }
        },
        axisLabel: {
            // color:'black',
            offset,
            show: true,
            fontSize: 15,
            // borderColor: "rgba(220, 211, 211, 1)",
            // borderRadius: [18, 18, 18, 18],
            // padding: [5, 5, 5, 5],
            // backgroundColor: "rgba(220, 209, 209, 1)"
        },
        axisTick: {
            show: false
        },
        splitLine: {
            offset,
            show: true,
            interval: 30,
            lineStyle: {
                width: 1,
                opacity: 0.1
            }
        },
    }

}
export const configCommon = ({ showToolbar }) => {
    return {
        legend: {
            data: ['日K', 'MA20', 'MA50', 'MA100'],
            inactiveColor: '#777',
            textStyle: {
                color: '#fff'
            }
        },
        toolbox: {
            dataZoom: {
                show: true
            },
            show: showToolbar,
            left: 'center',
            // bottom: "20%",
            // feature: {
            //     left: 'center',
            //     bottom: "43%",
            //     myTool1: {
            //         title: 'Zoom Out',
            //         icon: 'image://../images/icon/minus.png',

            //         onclick: function () {
            //             alert('myToolHandler1')
            //         }
            //     },
            //     myTool2: {
            //         itemSize: 23,
            //         title: 'Focus On Current Price',
            //         icon: 'image://https://forbitoption.com/Images/Icon/tool-chart/Icon-focus-gray.png',
            //         onclick: function () {
            //             alert('myToolHandler2')
            //         }
            //     },
            //     myTool3: {
            //         title: 'Zoom In',
            //         icon: 'image://../images/icon/plus.png',

            //         onclick: function () {
            //             alert('myToolHandler2')
            //         }
            //     }
            // },
            itemSize: 35
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false,
                type: 'cross',
                lineStyle: {
                    color: '#376df4',
                    width: 2,
                    opacity: 1
                }
            }
        },
        yAxis: configYAxis(),
        grid: {
            width: '95%',
            height: '85%',
            right: '7%',
            bottom: 20
        }
    }
}

function setResize() {
    const screenWidth = parseInt(window.innerWidth);
    
    if(screenWidth >= 415 && screenWidth < 765) {
        return -25;
    }
    else if (screenWidth >= 765 && screenWidth < 1024) {
        return -15;
    }
    else if (screenWidth >= 1025 && screenWidth < 1366) {
        return -12;
    }

}

// window.onresize = function () {
//     setTimeout(() => {
//         configYAxis();
//     }, 600);
//   };