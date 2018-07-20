
const express  =  require('express')
const Router = express.Router()
const connection = require('../../helpers/db.js')
const nodemailer = require('nodemailer')

Router.post('/send-email', function(req, res) {

  const firts_name = req.body.firts_name
  const last_name = req.body.last_name
  const email = req.body.email
  const messages = req.body.messages
  const tel = req.body.tel

  const smtpTransport = nodemailer.createTestAccount((err, account) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD
      }
    })
    const mailOptions = {
      from: '"Edouard" <edouarddelaage@gmail.com>',
      to: "edouarddelaage@gmail.com",
      subject: 'Mesaage ',
      text: `Prenom : ${firts_name}
      Nom : ${last_name}
      email : ${email}
      Message : ${messages}
      Tel : ${tel}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);

      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      })
    })
});

const insertUserQuery = `
  INSERT INTO messages (firts_name, last_name, email, messages, tel)
  VALUES (?, ?, ?, ?, ?)`

Router.post('/messages', function(req, res, next) {
  const firts_name = req.body.firts_name
  const last_name = req.body.last_name
  const email = req.body.email
  const messages = req.body.messages
  const tel = req.body.tel
  const values = [firts_name, last_name, email, messages, tel]

  connection.query(insertUserQuery, values)
    .then(result => {
      console.log(result)
      res.status(200).json({ flash:  'Merci pour votre méssage. Je reviens très vitre vers vous' });
    })
    .catch(err => {
      res.status(500).json({ flash:  err.message });
    })
})

module.exports = Router