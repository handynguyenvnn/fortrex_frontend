export const makerPointByCoord = ({ valueLabel, valStart, valEnd, symbol, symbolOffset, symbolSize, color }) => {
    let obj = {
        coord: [
            valStart, // position xAsix
            valEnd // position yAsix max
        ],
        symbol,
        symbolSize,
        symbolOffset,

    };
    const objBg = {
        "red": 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Ski_trail_rating_symbol_red_circle.png',
        "green": 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Ski_trail_rating_symbol-green_circle.svg/480px-Ski_trail_rating_symbol-green_circle.svg.png'
    }
    if (valueLabel) {
        obj = {
            ...obj,
            label: {
                color: 'white',
                padding: [10, 10, 10, 10],
                backgroundColor: {
                    size:10,
                    image: objBg[color],
                    // color: objBgColor[color]
                },
                formatter: function (obj) {
                    return valueLabel ? valueLabel : ''
                }
            },
        }
    }
    return obj
}