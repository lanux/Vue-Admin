const Mock = require('mockjs')

let usersListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      name: '@name',
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
  'GET /users': function (req, res) {
    const { query } = req
    let { pageSize, page } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = shuffle(database)

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },
}
