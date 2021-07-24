const helper = require('../../helpers/wrapper')
const showtimeModel = require('./showtimeModel')

module.exports = {
  getShowById: async (req, res) => {
    try {
      const { id } = req.params
      const isexist = await showtimeModel.getDataById(id)
      if (isexist.length > 0) {
        return helper.response(res, 200, 'Success get data by id', isexist)
      } else {
        return helper.response(res, 404, 'Data by id not found', null)
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },
  postShow: async (req, res) => {
    try {
      const { premiereId, showtimeDate, showtimeClock } = req.body
      const setData = {
        premiere_id: premiereId,
        show_time_date: showtimeDate,
        show_time_clock: showtimeClock
      }

      const result = await showtimeModel.postData(setData)
      return helper.response(res, 200, 'Success post showtime', result)
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },
  updateShow: async (req, res) => {
    try {
      const { id } = req.params
      const isexist = await showtimeModel.getDataById(id)
      const { premiereId, showtimeDate, showtimeClock } = req.body
      const setData = {
        premiere_id: premiereId,
        show_time_date: showtimeDate,
        show_time_clock: showtimeClock,
        show_time_updated_at: new Date(Date.now())
      }

      if (isexist.length > 0) {
        const result = await showtimeModel.updateData(setData, id)
        return helper.response(res, 200, 'Success update showtime', result)
      } else {
        return helper.response(res, 404, 'Cannot update empty data')
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },
  deleteShow: async (req, res) => {
    try {
      const { id } = req.params
      const isexist = await showtimeModel.getDataById(id)

      if (isexist.length > 0) {
        const result = await showtimeModel.deleteData(id)
        return helper.response(res, 200, 'Success delete data', result)
      } else {
        return helper.response(res, 404, 'Cannot delete empty data')
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  }
}
