export const lineColumnOne = (icon, position) => {
    return {
        label: {
            formatter: function (obj) {
                return ''
            }
        },
        lineStyle: {
            type: 'dotted',
            color: {
                colorStops: [{
                    offset: 0, color: 'white'
                }]
            }
        },
        symbolSize: 30,
        symbol: icon,
        name: 'col 1',
        xAxis: position,
        // symbolRotate: [90, 90,90,90]
    }
}