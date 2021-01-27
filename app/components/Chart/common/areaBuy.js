export const areaBuy = (hoverBuyPrice, value) => {
    return [
        {
            yAxis: hoverBuyPrice,
            itemStyle: {
                opacity: 0.15,
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: "rgba(255,255,255,0.1)" },
                        { offset: 1, color: "rgb(127,255,0)" }
                    ],
                    global: false // false by default
                },
            }
        },
        {
            yAxis: value,
        }
    ]
};