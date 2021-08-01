const connection = require('../../config/mysql')

module.exports = {

  register: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO siswa SET ?', data, (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...data
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },

  getDataCondition: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM siswa WHERE ?',
        data,
        (error, result) => {
          !error
            ? resolve(result)
            : reject(new Error(error))
        }
      )
    })
  },

  update: (id, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE siswa SET ? WHERE NISN = ?',
        [data, id],
        (error, result) => {
          !error
            ? resolve(result)
            : reject(new Error(error))
        }
      )
    })
  }

}
