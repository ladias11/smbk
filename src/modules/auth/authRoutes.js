const express = require('express')
const Route = express.Router()

const controller = require('./authController')

Route.post('/login', controller.login)
Route.post('/register', controller.register)
Route.post('/verify/:id', controller.verify)

module.exports = Route
