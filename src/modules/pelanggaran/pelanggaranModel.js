const connection = require('../../config/mysql')

module.exports = {

  postPelanggaran: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO pelanggaran SET ?',
        setData,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  }

}
