const helper = require('../../helpers/wrapper')
const model = require('./pelanggaranModel')
const siswa = require('../siswa/siswaModel')

module.exports = {
  postPelanggaran: async (req, res) => {
    try {
      const { nisn } = req.params
      const { pelanggaran, sanksi, poin, tanggalKejadian, namaWali } = req.body
      const dataSiswa = await siswa.getByNISN(nisn)
      if (dataSiswa.length > 0) {
        const setData = {
          nama_siswa: dataSiswa[0].nama_siswa,
          pelanggaran: pelanggaran,
          sanksi: sanksi,
          poin: poin,
          tanggal_kejadian: tanggalKejadian,
          nama_walikelas: namaWali
        }
        const postToDb = await model.postPelanggaran(setData)

        return helper.response(
          res,
          200,
          'Success',
          postToDb
        )
      } else {
        return helper.response(
          res,
          404,
          'Cannot update empty data'
        )
      }
    } catch (err) {
      console.log(err)
      return helper.response(
        res,
        400,
        'Bad Request',
        err
      )
    }
  }
}
