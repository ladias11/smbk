const express = require('express')
const Route = express.Router()
const controller = require('./movieController')
// const authentication = require('../../middlewares/auth')
const redis = require('../../middlewares/redis')
const uploadFile = require('../../middlewares/uploads')

Route.get(
  '/',
  redis.getMovie,
  controller.getAllMovies
)

Route.get(
  '/:id',
  controller.getMovieById
)

Route.get(
  '/name',
  controller.getMovieName
)

Route.post(
  '/',
  // authentication.authentication,
  // authentication.isAdmin,
  uploadFile,
  controller.postMovie
)

Route.patch(
  '/:id',
  // authentication.authentication,
  // authentication.isAdmin,
  uploadFile,
  controller.patchMovie
)

Route.delete(
  '/:id',
  controller.deleteMovie
)

module.exports = Route
