const helper = require('../../helpers/wrapper')
const model = require('./kelasModel')

module.exports = {
  postKelas: async (req, res) => {
    try {
      const { namaKelas, namaWali } = req.body
      const setData = {
        nama_kelas: namaKelas,
        nama_wali_kelas: namaWali
      }
      const result = await model.postKelas(setData)
      return helper.response(
        res,
        200,
        'Success',
        result
      )
    } catch (err) {
      return helper.response(
        res,
        400,
        'Bad request',
        err
      )
    }
  }
}
