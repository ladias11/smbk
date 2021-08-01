const express = require('express')
const Route = express.Router()

const authRouter = require('../modules/auth/authRoutes')
const userRouter = require('../modules/user/userRoutes')
const siswaRouter = require('../modules/siswa/siswaRoutes')
const pelanggaranRouter = require('../modules/pelanggaran/pelanggaranRoutes')
const kelasRouter = require('../modules/kelas/kelasController')

Route.use('/auth', authRouter)
Route.use('/user', userRouter)
Route.use('/siswa', siswaRouter)
Route.use('/pelanggaran', pelanggaranRouter)
Route.use('/kelas', kelasRouter)

module.exports = Route
