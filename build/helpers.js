const path = require('path')

module.exports = {
  root(filePath) {
    return path.join(__dirname, '../', filePath)
  }
}
