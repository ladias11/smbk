const helper = require('../helpers/wrapper')
const jwt = require('jsonwebtoken')

module.exports = {

  authentication: (req, res, next) => {
    let token = req.headers.authorization

    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, 'SECRET', (error, result) => {
        if (
          (error && error.name === 'JSONWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return helper.response(res, 403, error.message)
        } else {
          req.decodeToken = result
          next()
        }
      })
    }
  },

  isAdmin: (req, res, next) => {
    if (req.decodeToken.user_role !== 'admin') {
      return helper.response(res, 401, 'Unauthorized')
    } else {
      console.log('Authorized')
      next()
    }
  },

  isVerified: (req, res, next) => {
    if (req.decodeToken.user_verification !== '0') {
      console.log('masuk')
      next()
    } else {
      return helper.response(res, 400, 'Please verify your email first')
    }
  }

}
