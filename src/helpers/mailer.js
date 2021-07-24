require('dotenv').config()
const nodemailer = require('nodemailer')

module.exports = {

  sendMail: (id, purpose, destination, otp) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAILER,
        pass: process.env.MAILER_PASS
      }
    })

    const verificationMail = `
      <h1>Welcome to tixscape</h1>
      <hr/>
      <p>click button below to verify, hurry!</p>
      <form 
        action="http://localhost:3001/backend1/api/v1/auth/verify/${id}"
        method="post">
        <button type="submit">verify</button>
      </form>
    `

    const reqOtpMail = `
      <h1>Your unique code</h1>
      <hr>
      <p>Use this unique code to reset your password</p>
      <br>
      <tt>${otp}</tt>
      <br>
      <p>Please don't share the code to anyone including your mum</p>
      <br>
      <p>Regards,</p>
      <br>
      <p>tixscape team</p>
    `

    const mailOptions = {
      from: 'juliant@tixcape',
      to: destination,
      subject: purpose === 'verification'
        ? 'Verify your tixscape account'
        : 'Your tixscape otp',
      html: purpose === 'verification'
        ? verificationMail
        : reqOtpMail
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw err
      console.log('Email sent: ' + info.response)
    })
  }

}
