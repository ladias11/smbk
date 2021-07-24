require('dotenv').config()
const bcrypt = require('bcrypt')
const helper = require('../../helpers/wrapper')
const mailer = require('../../helpers/mailer')
const jwt = require('jsonwebtoken')
const model = require('./authModel')

module.exports = {

  register: async (req, res) => {
    try {
      const { email, password, name } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encrypted = bcrypt.hashSync(password, salt)

      const isExist = await model.getDataCondition({
        user_email: email
      })

      if (isExist.length === 0) {
        const setData = {
          user_email: email,
          user_password: encrypted,
          user_name: name,
          user_role: 'user',
          user_verification: 0,
          user_created_at: new Date(Date.now())
        }

        const result = await model.register(setData)
        delete result.user_password

        await mailer.sendMail(result.id, 'verification', email)

        return helper.response(res, 200, 'Registration success, check your email to verify')
      } else {
        return helper.response(res, 300, 'Email already registered')
      }
    } catch (err) {
      console.log(err)
      return helper.response(res, 400, 'Bad request')
    }
  },

  verify: async (req, res) => {
    try {
      const { id } = req.params
      const isExist = await model.getDataCondition({
        user_id: id
      })

      const setData = {
        user_verification: 1
      }

      const result = await model.update(id, setData)
      return res.render('index.ejs', {
        data: result,
        user: isExist[0]
      })
    } catch (err) {
      console.log(err)
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const isExist = await model.getDataCondition({
        user_email: email
      })

      if (isExist.length > 0) {
        console.log(isExist)
        const isMatch = bcrypt.compareSync(password, isExist[0].user_password)

        if (isMatch) {
          const payLoad = isExist[0]
          delete payLoad.user_password
          const token = jwt.sign({ ...payLoad }, 'SECRET', { expiresIn: '24h' })
          const result = {
            ...payLoad,
            token
          }

          return helper.response(res, 200, 'Success login', result)
        } else {
          return helper.response(res, 400, 'Password mismatch')
        }
      } else {
        console.log(req.body)
        console.log(isExist)
        return helper.response(res, 404, 'Email not registered')
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  }

}
