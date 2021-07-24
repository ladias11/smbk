const express = require('express')
const Route = express.Router()
const controller = require('./userController')
const authMiddleware = require('../../middlewares/auth')
const uploadFile = require('../../middlewares/uploads')

Route.patch(
  '/',
  authMiddleware.authentication,
  uploadFile,
  controller.updateProfile
)

Route.get(
  '/',
  authMiddleware.authentication,
  controller.getUser
)

module.exports = Route
