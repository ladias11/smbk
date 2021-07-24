const connection = require('../../config/mysql')

module.exports = {
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM show_time WHERE show_time_id = ?', id, (err, result) => {
        !err ? resolve(result) : reject(new Error(err))
      })
    })
  },
  postData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO show_time SET ?', setData, (err, result) => {
        !err ? resolve({ id: result.insertId, ...setData }) : reject(new Error(err))
      })
    })
  },
  patchData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE show_time SET ? WHERE show_time_id = ?', [setData, id], (err, result) => {
        !err ? resolve({ id: result.insertId, ...setData }) : reject(new Error(err))
      })
    })
  },
  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM show_time WHERE show_time_id = ?', (err, result) => {
        !err ? resolve(result) : reject(new Error(err))
      })
    })
  }
}
