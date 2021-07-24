const helper = require('../../helpers/wrapper')
const premModel = require('./premModel')
const fs = require('fs')

module.exports = {

  getAllPremiere: async (req, res) => {
    try {
      const result = await premModel.getAllPremiere()

      return helper.response(res, 200, 'Success get all data', result)
    } catch (err) {
      console.log(err)
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  getPremiereById: async (req, res) => {
    try {
      const { id } = req.params

      const result = await premModel.getPremiereById(id)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success get data by id', result)
      } else {
        return helper.response(res, 404, 'Data not found', null)
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  postPremiere: async (req, res) => {
    try {
      const { movieId, locationId, premiereName, premierePrice } = req.body
      const setData = {
        movie_id: movieId,
        location_id: locationId,
        premiere_name: premiereName,
        premiere_price: premierePrice,
        premiere_logo: req.file ? req.file.filename : ''
      }

      const result = await premModel.postPremiere(setData)

      return helper.response(res, 200, 'Success create new premiere', result)
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  updatePremiere: async (req, res) => {
    try {
      const { id } = req.params
      const isExist = await premModel.getPremiereById(id)

      if (isExist.length > 0) {
        const { movieId, locationId, premiereName, premierePrice } = req.body
        const setData = {
          movie_id: movieId,
          location_id: locationId,
          premiere_name: premiereName,
          premiere_price: premierePrice,
          premiere_logo: req.file ? req.file.filename : '',
          premiere_updated_at: new Date(Date.now())
        }

        if (isExist[0].premiere_logo) {
          const imgPath = `src/uploads/${isExist[0].premiere_logo}`
          fs.unlinkSync(imgPath)
        }

        const result = await premModel.updatePremiere(setData, id)
        return helper.response(res, 200, 'Premiere updated', result)
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  deletePremiere: async (req, res) => {
    try {
      const { id } = req.params
      const isExist = await premModel.getPremiereById(id)

      if (isExist.length > 0) {
        if (isExist[0].premiere_logo) {
          const imgPath = `src/uploads/${isExist[0].premiere_logo}`
          fs.unlinkSync(imgPath)

          const result = await premModel.deletePremiere(id)
          return helper.response(res, 200, 'Premiere deleted', result)
        }
      } else {
        return helper.response(res, 404, 'Premiere not found')
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  getAllLocation: async (req, res) => {
    try {
      const result = await premModel.getAllLocation()
      return helper.response(res, 200, 'Success get all locations', result)
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  getLocationById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await premModel.getLocationById(id)

      if (result.length > 0) {
        return helper.response(res, 200, 'Success get location by id', result)
      } else {
        return helper.response(res, 404, 'location not found', null)
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  postLocation: async (req, res) => {
    try {
      const { city, address } = req.body
      const setData = {
        location_city: city,
        location_address: address
      }

      const result = await premModel.postLocation(setData)
      return helper.response(res, 200, 'Success creating new location', result)
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  updateLocation: async (req, res) => {
    try {
      const { id } = req.params
      const isExist = await premModel.getLocationById(id)

      if (isExist.length > 0) {
        const { city, address } = req.body
        const setData = {
          location_city: city,
          location_address: address,
          location_updated_at: new Date(Date.now())
        }

        const result = await premModel.updateLocation(setData, id)
        return helper.response(res, 200, 'Success update location', result)
      } else {
        return helper.response(res, 404, 'Location not found', null)
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  deleteLocation: async (req, res) => {
    try {
      const { id } = req.params
      const isExist = await premModel.getLocationById(id)

      if (isExist.length > 0) {
        const result = await premModel.deleteLocation(id)
        return helper.response(res, 200, 'Success delete location', result)
      } else {
        return helper.response(res, 404, 'Location not found', null)
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  getPremiere: async (req, res) => {
    try {
      const result = await premModel.getPremiere()
      return helper.response(res, 200, 'Success get premieres', result)
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  getPremiereInfo: async (req, res) => {
    try {
      let { id, location, date, orderby, limit, page } = req.query
      limit = +limit || 5
      page = +page || 1
      location = location || '%%'
      date = date || '%%'
      orderby = orderby || 'p.premiere_name ASC'

      const offset = page * limit - limit
      const totalData = await premModel.countPremiere(id, location, date, orderby)
      const totalPage = Math.ceil(totalData / limit)

      const pageInfo = { page, totalPage, limit, totalData }
      const result = await premModel.premiereInfoByMovie(id, location, orderby, limit, offset)

      for (const i of result) {
        i.showTime = await premModel.showTimeInfoByPremiere(
          i.premiere_id, date
        )
      }

      return helper.response(res, 200, 'Success get premiere info', result, pageInfo)
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  getPremiereInfoByMovieId: async (req, res) => {
    try {
      let { movieId, location, date, orderBy, limit, page } = req.query
      limit = +limit || 5
      page = +page || 1
      location = location || '%%'
      date = date || '%%'
      orderBy = orderBy || 'p.premiere_name ASC'

      const offset = page * limit - limit
      const totalData = await premModel.countPremiere(movieId, location, orderBy)
      const totalPage = Math.ceil(totalData / limit)
      const pageInfo = { page, totalPage, limit, totalData }

      const result = await premModel.premiereInfoByMovie(
        movieId, location, orderBy, limit, offset
      )

      for (const i of result) {
        i.showTime = await premModel.showTimeInfoByPremiere(
          i.premiere_id, date
        )
      }

      return helper.response(res, 200, 'Success', result, pageInfo)
    } catch (err) {
      console.log(err)
    }
  }

}
