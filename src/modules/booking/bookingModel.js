const connection = require('../../config/mysql')

module.exports = {
  getData: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT b.booking_id, b.premiere_id, b.booking_ticket,
        b.booking_total_price, b.booking_payment_method, b.booking_status,
        bs.booking_seat_location FROM booking b INNER JOIN booking_seat bs
        ON b.booking_id = bs.booking_id`,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },
  getBookingTotalPrice: (movieId, premiereName, locationAddress) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT MONTH(b.booking_created_at) AS month, SUM(b.booking_total_price) AS total FROM booking b JOIN premiere p ON b.premiere_id = p.premiere_id JOIN movie m ON p.movie_id = m.movie_id JOIN location l ON p.location_id = l.location_id WHERE m.movie_id = ? AND p.premiere_name = ? AND l.location_addres = ? GROUP BY MONTH(b.booking_created_at)',
        [movieId, premiereName, locationAddress],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getUserData: (userId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT s.show_time_date, s.show_time_clock, b.booking_ticket, b.booking_total_price, b.booking_payment_method, p.premiere_logo, p.premiere_name, m.movie_name, m.movie_category, m.movie_duration FROM booking b JOIN premiere p ON b.premiere_id = p.premiere_id JOIN movie m ON p.movie_id = m.movie_id JOIN show_time s ON b.show_time_id = s.show_time_id WHERE b.user_id = ?',
        userId,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataById: (preId, showId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT b.booking_id, b.premiere_id, b.show_time_id, bs.booking_seat_location FROM booking b JOIN booking_seat bs ON b.booking_id = bs.booking_id WHERE b.premiere_id = ? AND b.show_time_id = ? AND b.booking_status = ?',
        [preId, showId, 'succes'],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO booking SET ?',
        setData,
        (error, result) => {
          !error
            ? resolve({ id: result.insertId, ...setData })
            : reject(new Error(error))
        }
      )
    })
  },
  postBookingSeat: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO booking_seat SET ?',
        setData,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getBookingSeatById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM booking_seat WHERE booking_seat_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
