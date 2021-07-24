const connection = require('../../config/mysql')

module.exports = {

  register: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO user SET ?', data, (error, result) => {
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
        'SELECT * FROM user WHERE ?',
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
        'UPDATE user SET ? WHERE user_id = ?',
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
