const connection = require('../../config/mysql')

module.exports = {

  getAllLocations: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM location', (err, result) => {
        !err ? resolve(result) : reject(new Error(err))
      })
    })
  },

  getLocationById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM location WHERE location_id = ?',
        id,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        })
    })
  },

  postLocation: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO location SET ?', data, (err, result) => {
        !err ? resolve({ id: result.insertId, ...data }) : reject(new Error(err))
      })
    })
  },

  updateLocation: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE location SET id = ? WHERE location_id = ?',
        [data, id],
        (err, result) => {
          !err ? resolve({ id: id, ...data }) : reject(new Error(err))
        })
    })
  },

  deleteLocation: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM location WHERE location_id = ?', id, (err, result) => {
        !err ? resolve(result) : reject(new Error(err))
      })
    })
  },

  getPremiereById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM premiere WHERE premiere_id = ?', id, (err, result) => {
        !err ? resolve(result) : reject(new Error(err))
      })
    })
  },

  postPremiere: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO premiere SET ?', data, (err, result) => {
        !err ? resolve({ id: result.insertId, ...data }) : reject(new Error(err))
      })
    })
  },

  updatePremiere: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE premiere SET ? WHERE premiere_id = ?',
        [data, id],
        (err, result) => {
          !err ? resolve({ id: result.insertId }) : reject(new Error(err))
        })
    })
  },

  deletePremiere: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM premiere WHERE premiere_id = ?', id, (err, result) => {
        !err ? resolve(result) : reject(new Error(err))
      })
    })
  },

  countPremiere: (id, location, orderby) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT COUNT(*) AS total FROM premiere p JOIN location l 
      ON p.location_id = l.location_id WHERE p.movie_id = ? AND l.location_city
      LIKE ? ORDER BY ${orderby}`,
      [id, location],
      (err, result) => {
        !err
          ? resolve(result[0].total)
          : reject(new Error(err))
      })
    })
  },

  showTimeInfoByPremiere: (id, date) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT premiere_id, show_time_id, show_time_clock, show_time_date
      FROM show_time WHERE premiere_id = ? AND show_time_date LIKE ?`,
      [id, date],
      (err, result) => {
        !err ? resolve(result) : reject(new Error(err))
      })
    })
  },

  premiereInfoByMovie: (id, location, orderby, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT p.premiere_id, l.location_id, p.premiere_name, p.premiere_price, l.location_city,
        l.location_addres FROM premiere p JOIN location l ON p.location_id = l.location_id 
        WHERE p.movie_id = ? AND l.location_city LIKE ? ORDER BY ${orderby} LIMIT ? OFFSET ?`,
        [id, location, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getPremiere: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT premiere_name, premiere_price, premiere_logo FROM premiere GROUP BY premiere_name',
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  }

}
