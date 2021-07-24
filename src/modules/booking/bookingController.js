const helper = require('../../helpers/wrapper')
const bookingModel = require('./bookingModel')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello Booking')
  },
  getAllBooking: async (req, res) => {
    try {
      const result = await bookingModel.getData()
      return helper.response(res, 200, 'Succes Get Booking Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getBookingIncome: async (req, res) => {
    try {
      // console.log(req.query)
      const { movieId, premiereName, locationAddress } = req.query
      const result = await bookingModel.getBookingTotalPrice(
        movieId,
        premiereName,
        locationAddress
      )
      client.setex(
        `getbook:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify({ result })
      )
      return helper.response(res, 200, 'Succes Get Booking Income Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getUserHistory: async (req, res) => {
    try {
      const { userId } = req.query
      // console.log(userId)
      const result = await bookingModel.getUserData(userId)
      client.setex(
        `getbook:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify({ result })
      )
      return helper.response(
        res,
        200,
        'Succes get User Booking history !',
        result
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getBookingById: async (req, res) => {
    try {
      console.log(req.query)
      const { premiereId, showTimeId } = req.query
      const result = await bookingModel.getDataById(premiereId, showTimeId)
      client.setex(
        `getbook:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify({ result })
      )
      return helper.response(res, 200, 'Succes Get Booking Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postBooking: async (req, res) => {
    try {
      const { bookingSeat, ...setData } = req.body
      const result = await bookingModel.createData(setData)

      console.log(result.insertId)
      for (const e of bookingSeat) {
        const setData2 = {
          booking_id: result.id,
          booking_seat_location: e
        }
        const result2 = await bookingModel.postBooking(setData2)
        console.log(result2.insertId)
      }
      return helper.response(res, 200, 'Succes Create Booking Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
