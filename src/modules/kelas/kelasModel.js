const connection = require('../../config/mysql')

module.exports = {
  postKelas: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO kelas SET ?',
        setData,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  }
}
