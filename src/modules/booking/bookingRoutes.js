const express = require('express')
const Route = express.Router()
const bookingController = require('./bookingController')
const authMiddleware = require('../../middlewares/auth')

Route.get('/hello', bookingController.sayHello)
Route.get('/book', bookingController.getAllBooking)
Route.get(
  '/book-seat',
  authMiddleware.authentication,
  bookingController.getBookingById
)

Route.get(
  '/user-book',
  authMiddleware.authentication,
  bookingController.getUserHistory
)

Route.get(
  '/book-sale',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  bookingController.getBookingIncome
)

Route.post(
  '/book',
  authMiddleware.authentication,
  bookingController.postBooking
)

module.exports = Route
