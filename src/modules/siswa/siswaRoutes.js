const express = require('express')
const Route = express.Router()
const controller = require('./siswaController')
const uploads = require('../../middlewares/uploads')

Route.get('/', controller.getAll)
Route.post('/', controller.createSiswa)
Route.patch('/:nisn',
  uploads,
  controller.updateSiswa
)

module.exports = Route
