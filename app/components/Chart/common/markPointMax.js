export const markPointMax = () => {
  return {
      label: {
          formatter: function (obj) {
              return ''
          },
      },
      symbol: 'image://../images/icon-time/time-10.png',
      type: "max",
      valueIndex: 0,
      symbolSize: 6,
  }
}