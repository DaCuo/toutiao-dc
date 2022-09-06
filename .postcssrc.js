const pxToRem = require('postcss-pxtorem')
module.exports = {
  plugins: [
    pxToRem({
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 70),
      propList: ['*']
    })
  ]
}
