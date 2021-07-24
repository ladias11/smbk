const multer = require('multer')
const helper = require('../helpers/wrapper')
const path = require('path')

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'))
  },

  filename: function (req, file, cb) {
    console.log(`file >>> ${file}`)
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }

})

const fileFilter = (req, file, cb) => {
  const listExt = ['.jpg', '.png']
  const ext = path.extname(file.originalname).toLowerCase()

  if (listExt.includes(ext)) {
    cb(null, true)
  } else {
    cb(new Error('File not supported'), false)
  }
}

const upload = multer({ storage, fileFilter }).single('image')

const uploadFilter = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log('Multer error')
      return helper.response(res, 401, err.message, null)
    } else if (err) {
      console.log(err)
      return helper.response(res, 401, err.message, null)
    }
    next()
  })
}

module.exports = uploadFilter
