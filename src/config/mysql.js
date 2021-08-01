require('dotenv').config()
const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smbk'
})

connection.connect((err) => {
  if (err) throw err
  console.log('database connected')
})

module.exports = connection
