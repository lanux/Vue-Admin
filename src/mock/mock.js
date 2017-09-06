const mock = {}
require('fs').readdirSync(require('path').join(`${__dirname}`)).filter(p=>`${p}`!=='mock.js').forEach((file) => {
  Object.assign(mock, require(`./${file}`))
})

module.exports = mock
