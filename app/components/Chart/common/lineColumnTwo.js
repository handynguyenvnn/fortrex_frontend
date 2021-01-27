export const lineColumnTwo = (icon, position) => {
  return {
      label: {
          formatter: function (obj) {
              return ''
          }
      },
      lineStyle: {
          type: 'solid',
          width: 1,
          color: {
              colorStops: [{
                  offset: 0, color: '#da4830'
              }]
          }
      },
      symbolSize: 30,
      symbolRotate: 180,
      symbol: icon,
      name: 'col 1',
      xAxis: position
  }
}