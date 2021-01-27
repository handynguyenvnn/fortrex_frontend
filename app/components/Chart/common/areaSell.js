export const areaSell = (hoverCellPrice) => {
    return [
        {
            yAxis: 0,
            itemStyle: {
                opacity: 0.15,
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: "rgb(255,49,3,1)" },
                        { offset: 1, color: "rgba(253,255,255,0.1)" }
                    ],
                    global: false // false by default
                }
            }
        },
        {
            yAxis: hoverCellPrice
        }
    ]
}