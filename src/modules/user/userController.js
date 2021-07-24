const helper = require('../../helpers/wrapper')
const userModel = require('./userModel')
// const fs = require('fs')

module.exports = {

  updateProfile: async (req, res) => {
    try {
      const id = req.decodeToken.user_id
      // const currentImage = req.decodeToken.user_image
      console.log(req.decodeToken.user_id)
      console.log(req.body)

      const { firstName, lastName, phoneNumber } = req.body
      console.log(req.body)
      const setData = {
        user_name: firstName + ' ' + lastName,
        user_phone_number: phoneNumber,
        user_profile_image: req.file ? req.file.filename : ''
      }

      // const imgPath = `src/uploads/${currentImage}`
      // if (currentImage !== null || currentImage > 0) {
      //   fs.unlink(imgPath, (err, result) => {
      //     !err
      //       ? console.log('deleted')
      //       : console.log(err)
      //   })
      // }

      const result = await userModel.updateProfile(setData, id)
      return helper.response(res, 200, 'Success update profile', result)
    } catch (err) {
      console.log(err)

      return helper.response(res, 400, 'Bad request', err)
    }
  },

  getUser: async (req, res) => {
    try {
      const id = req.decodeToken.user_id
      const result = await userModel.getUser(id)

      return helper.response(res, 200, 'Success', result)
    } catch (err) {
      console.log(err)
      return helper.response(res, 400, 'Bad request', err)
    }
  }
}
