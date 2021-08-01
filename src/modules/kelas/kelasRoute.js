const express = require('express')
const Router = express.Router
const Controller = require('./kelasController')

// Router.get('/', Controller.getAll)
Router.post('/', Controller.postKelas)

module.exports = Router
