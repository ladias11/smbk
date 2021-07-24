const express = require('express')
const Route = express.Router()
const showtimeController = require('./showtimeController')
const authMiddleware = require('../../middlewares/auth')

Route.get(
  '/:id',
  showtimeController.getShowById
)

Route.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  showtimeController.postShow
)

Route.patch(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  showtimeController.updateShow
)

Route.delete(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  showtimeController.deleteShow
)

module.exports = Route
