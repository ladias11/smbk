const model = require('./siswaModel')
const helper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

module.exports = {
  getAll: async (req, res) => {
    try {
      const result = await model.getAll()

      if (result.length > 0) {
        return helper.response(res, 200, 'Success', result)
      } else {
        return helper.response(res, 404, 'Not found')
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  createSiswa: async (req, res) => {
    try {
      const {
        nisn, nama, alamat, namaOrtu, telepon, tempatLahir, tanggalLahir, gender, idKelas
      } = req.body
      const setData = {
        NISN: nisn,
        nama_siswa: nama,
        password_siswa: bcrypt.hashSync('12345', salt),
        alamat_siswa: alamat,
        nama_orang_tua: namaOrtu,
        telepon: telepon,
        tempat_lahir: tempatLahir,
        tanggal_lahir: tanggalLahir,
        gender: gender,
        id_kelas: idKelas
      }

      const result = await model.createSiswa(setData)
      return helper.response(res, 200, 'Success registered', result)
    } catch (err) {
      console.log(err)
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  updateSiswa: async (req, res) => {
    try {
      let { nisn } = req.params
      nisn = +nisn
      const isExist = await model.getByNISN(nisn)
      const { nama, alamat, namaOrtu, telepon, tempatLahir, tanggalLahir } = req.body
      if (isExist.length > 0) {
        const setData = {
          nama_siswa: nama,
          alamat_siswa: alamat,
          nama_orang_tua: namaOrtu,
          telepon: telepon,
          tempat_lahir: tempatLahir,
          tanggal_lahir: tanggalLahir,
          photo_siswa: req.file ? req.file.filename : '',
          siswa_updated_at: new Date(Date.now())
        }

        console.log(req.body, setData)

        // const result = await model.updateSiswa(nisn, setData)
        // return helper.response(res, 200, 'Success updating data', result)
      } else {
        return helper.response(res, 404, 'Cannot update empty data')
      }
    } catch (err) {
      console.log(err)
      return helper.response(res, 400, 'Bad request', err)
    }
  }

}
