const express = require('express')
const Route = express.Router()

const authRouter = require('../modules/auth/authRoutes')
const movieRouter = require('../modules/movie/movieRoutes')
const userRouter = require('../modules/user/userRoutes')
const premiereRouter = require('../modules/premiere/premRoutes')
const bookingRouter = require('../modules/booking/bookingRoutes')
const showtimeRouter = require('../modules/showTime/showtimeRoute')

Route.use('/auth', authRouter)
Route.use('/movie', movieRouter)
Route.use('/user', userRouter)
Route.use('/premiere', premiereRouter)
Route.use('/booking', bookingRouter)
Route.use('/showtime', showtimeRouter)

module.exports = Route
