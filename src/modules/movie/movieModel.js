const connection = require('../../config/mysql')

module.exports = {

  getAllMovies: (limit, offset, keyword, orderby) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM movie
        WHERE movie_name LIKE ?
        ORDER BY ${orderby}
        LIMIT ? OFFSET ?`,
        [keyword, limit, offset],
        (error, result) => {
          !error
            ? resolve(result)
            : reject(new Error(error))
        }
      )
    })
  },

  getMovieById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM movie WHERE movie_id = ?',
        id,
        (error, result) => {
          !error
            ? resolve(result)
            : reject(new Error(error))
        }
      )
    })
  },

  countData: (keyword) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total FROM movie WHERE movie_name LIKE ?',
        keyword,
        (error, result) => {
          !error
            ? resolve(result[0].total)
            : reject(new Error(error))
        }
      )
    })
  },

  postMovie: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO movie SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },

  patchMovie: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE movie SET ? WHERE movie_id = ?',
        [setData, id],
        (error, result) => {
          !error
            ? resolve(result)
            : reject(new Error(error))
        }
      )
    })
  },

  deleteMovie: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM movie WHERE movie_id = ?',
        id,
        (error, result) => {
          !error
            ? resolve(result)
            : reject(new Error(error))
        }
      )
    })
  },

  getMovieName: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT movie_id, movie_name FROM movie', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }

}
