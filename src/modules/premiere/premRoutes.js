const express = require('express')
const Route = express.Router()
const premiereController = require('./premController')
const authMiddleware = require('../../middlewares/auth')
const uploadFile = require('../../middlewares/uploads')

Route.get(
  '/name',
  premiereController.getPremiere
)

Route.get(
  '/location',
  premiereController.getAllLocation
)

Route.get(
  '/location:id',
  premiereController.getLocationById
)

Route.get(
  '/premiere',
  premiereController.getAllPremiere
)

Route.get(
  '/premiere/:id',
  premiereController.getPremiereById
)

Route.post(
  '/location',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  premiereController.postLocation
)

Route.patch(
  '/location/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  premiereController.updateLocation
)

Route.post(
  '/premiere',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploadFile,
  premiereController.postPremiere
)

Route.patch(
  '/premiere/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploadFile,
  premiereController.updatePremiere
)

Route.delete(
  '/premiere/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  premiereController.deletePremiere
)

Route.delete(
  '/location/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  premiereController.deleteLocation
)

Route.get(
  '/premiere-movie',
  premiereController.getPremiereInfoByMovieId
)

module.exports = Route
