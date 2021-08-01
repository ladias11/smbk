const express = require('express')
const Route = express.Router()
const controller = require('../pelanggaran/pelanggaranControlller')

Route.post(
  '/:nisn',
  controller.postPelanggaran
)

module.exports = Route
