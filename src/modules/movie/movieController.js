const helper = require('../../helpers/wrapper')
const movieModel = require('./movieModel')
const fs = require('fs')

module.exports = {

  getAllMovies: async (req, res) => {
    try {
      let { page, limit, orderby, keyword } = req.query
      page = +page || 1
      limit = +limit || 5
      orderby = orderby || 'movie_release_date ASC'
      keyword = keyword || '%'
      const offset = page * limit - limit
      const totalData = await movieModel.countData(keyword)
      const totalPage = Math.ceil(totalData / limit)

      const pageInfo = { page, totalPage, limit, totalData }

      const result = await movieModel.getAllMovies(limit, offset, keyword, orderby)
      // client.setex(`getmovie:${JSON.stringify(req.query)}`, 3600, JSON.stringify({ result, pageInfo }))

      return helper.response(res, 200, 'Success get data', result, pageInfo)
    } catch (err) {
      console.log(err)
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  getMovieById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await movieModel.getMovieById(id)

      if (result.length === 0) {
        return helper.response(res, 404, 'Data by id not found', null)
      } else {
        // client.setex(`getmovie:${JSON.string}`, 3600, JSON.stringify(result))
        return helper.response(res, 200, 'Success get data by id', result)
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  postMovie: async (req, res) => {
    try {
      const {
        movieName, movieCategory, movieReleaseDate, movieDuration, movieDirectedBy, movieCasts, movieSynopsis
      } = req.body

      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate,
        movie_duration: movieDuration,
        movie_directed_by: movieDirectedBy,
        movie_casts: movieCasts,
        movie_synopsis: movieSynopsis,
        movie_image: req.file ? req.file.filename : ''
      }

      const result = await movieModel.postMovie(setData)
      return helper.response(res, 200, 'Success post movie', result)
    } catch (err) {
      console.log(err)
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  patchMovie: async (req, res) => {
    try {
      console.log('page movie works')
      const { id } = req.params
      const isexist = await movieModel.getMovieById(id)
      const {
        movieName, movieCategory, movieReleaseDate, movieDuration, movieDirectedBy, movieCasts, movieSynopsis
      } = req.body

      if (isexist.length > 0) {
        const setData = {
          movie_name: movieName,
          movie_category: movieCategory,
          movie_release_date: movieReleaseDate,
          movie_duration: movieDuration,
          movie_directed_by: movieDirectedBy,
          movie_casts: movieCasts,
          movie_synopsis: movieSynopsis,
          movie_image: req.file ? req.file.filename : isexist[0].movie_image,
          movie_updated_at: new Date(Date.now())
        }

        if (req.file) {
          if (isexist[0].movie_image.length > 0) {
            const imgPath = `src/uploads/${isexist[0].movie_image}`
            const isImageExist = fs.existsSync(imgPath)
            if (isImageExist) {
              console.log(isImageExist)
              fs.unlink(imgPath, (err) => {
                if (err) throw err
              })
            } else {
              console.log(isImageExist)
              console.log('no old image stored')
            }
            console.log('old image deleted')
          } else {
            console.log('no old image')
          }
        }

        const result = await movieModel.patchMovie(setData, id)
        console.log(result)
        return helper.response(res, 200, 'Success update movie', result)
      } else {
        return helper.response(res, 404, 'Data not found')
      }
    } catch (err) {
      console.log(err)
      console.log(err.response)
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  deleteMovie: async (req, res) => {
    try {
      const { id } = req.params
      const isexist = await movieModel.getMovieById(id)

      if (isexist.length > 0) {
        if (isexist[0].movie_image.length > 0) {
          const imgPath = `src/uploads/${isexist[0].movie_image}`
          fs.unlinkSync(imgPath)
          console.log('image deleted')
        } else {
          console.log('no image')
        }

        const result = await movieModel.deleteMovie(id)
        return helper.response(res, 200, 'Success delete movie', result)
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  getMovieName: async (req, res) => {
    try {
      const result = await movieModel.getMovieName()
      return helper.response(res, 200, 'Success get movie', result)
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  }

}
