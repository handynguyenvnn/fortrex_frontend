export const lineRealTime = (value, width = 1, color = "rgba(123, 118, 118, 1)") => {
    return {
        symbol: "none",
        lineStyle: {
            width,
            color
        },
        yAxis: value,
        label: {
            formatter: function (obj) {
                return ''
            }
        }
    }
}