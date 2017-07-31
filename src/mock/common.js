const Mock = require('mockjs')

let listData = Mock.mock({
  'data|10': [
    {
      id: '@id',
      'type|0-1': 1,
      'code|101-110': 1,
      timeLine: '@datetime("yyyyMMddHH")',
      message: '@cparagraph(1, 3)',
      title: '@ctitle(8, 18)',
      createTime: '@datetime("T")',
      senderName: '@last',
      senderPic () {
        return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.senderName.substr(0, 1))
      },
    },
  ],
})


let database = listData.data

module.exports = {
  'GET /messageList': function (req, res) {
    res.status(200).json(database)
  },
}
