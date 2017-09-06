const Mock = require('mockjs')

let pvListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      'type|0-1': 1,
      'code|101-110': 1,
      name: '@cname',
      timeLine: '@datetime("yyyyMMddHH")',
      pv: '@integer(600, 10000)',
      uv: '@integer(100, 5000)',
      duration: '@integer(10, 500)',
      bounceRate: '@float(0, 1)',
      createTime: '@datetime("T")',
    },
  ],
})


let database = pvListData.data

module.exports = {
  'GET /pv': function (req, res) {
    res.status(200).json({
      database,
      total: database.length,
    })
  },
}
