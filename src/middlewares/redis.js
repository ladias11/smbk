const redis = require('redis')
const client = redis.createClient()
const helper = require('../helpers/wrapper')

module.exports = {

  getMovie: (req, res, next) => {
    client.get(`getmovie:${JSON.stringify(req.query)}`,
      (error, result) => {
        if (!error && result != null) {
          console.log('rendering from redis')
          return helper.response(
            res,
            200,
            'Success get data (redis)',
            JSON.parse(result)
          )
        } else {
          console.log('not from redis')
          next()
        }
      })
  },

  getMovieByIdRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getmovie:${id}`, (error, result) => {
      if (!error && result !== null) {
        console.log('rendering from redis')
        return helper.response(
          res,
          200,
          'Success get data by id',
          JSON.parse(result))
      } else {
        console.log('not from redis')
        next()
      }
    })
  }

}
