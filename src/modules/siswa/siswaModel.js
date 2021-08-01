const connection = require('../../config/mysql')

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM siswa',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        })
    })
  },

  createSiswa: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO siswa SET ?',
        setData,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getByNISN: (nisn) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM siswa WHERE NISN = ?',
        nisn,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  updateSiswa: (setData, nisn) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE siswa SET ? WHERE nisn = ?',
        [setData, nisn],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
