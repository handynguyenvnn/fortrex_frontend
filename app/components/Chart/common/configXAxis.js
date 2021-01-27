export const configXAxis = (dates) => {
    return {
        xAxis: {
           
            //minInterval: 5,
            //maxInterval: 30,
            interval: false,
           // min: 12,
           // max: 12,
            //   animationType:'expansion',
            // animationDuration:1000,
            // animationDurationUpdate:100000,
            type: 'category',
            data: dates,
           // scale: true,
            // boundaryGap: true,
            // axisLine: {
            //   onZero: false
            // },
            //splitNumber: 25,
            //minInterval: 60000,
            //maxInterval: 31,
            min: "dataMin",
            max: "dataMax",
            //5,11
            axisLabel: {
               // minInterval: 30,
                 //showMaxLabel: false,
                //interval: 11,
                interval: 10,
                color: "#8392A5",
                padding: [0, 48, 0, 0]
            },
            splitLine: {
                //interval: 11,
                interval: 5,// amount grid line
                show: true,
                lineStyle: {
                    width: 1,
                    opacity: 0.1
                }
            },
            axisTick: {
                show: false
            }
        }
    }
}