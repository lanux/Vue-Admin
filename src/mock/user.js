const Mock = require('mockjs')
import * as api from '../api.js'


let usersListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      name: '@cname',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: '@datetime',
      avatar () {
        return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.nickName.substr(0, 1))
      },
      delFlag:0,
      status:1,
      userType:'1',
      no: '@id',
      remarks: '@cparagraph(1, 3)',
    },
  ],
})


const shuffle = function (input) {
  for (let i = input.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const itemAtIndex = input[randomIndex]
    input[randomIndex] = input[i]
    input[i] = itemAtIndex
  }
  return input
}


let database = usersListData.data


module.exports = {
  userList: shuffle(database),
  'GET /sys/user/page' : function (req, res) {
    const { query } = req
    let { pageSize, page } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = shuffle(database)

    res.status(200).json({
      records: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },
  'POST /login': function (req, res) {
    let newData = shuffle(database)[0]
    res.status(200).json({
      user:newData,sid:newData.id
    })
  },
  'GET /sys/user/get' : function (req, res) {
    const { query } = req
    let { id } = query
    let newData = database.filter(p=>p.id===id)[0]
    res.status(200).json(newData)
  },
}
