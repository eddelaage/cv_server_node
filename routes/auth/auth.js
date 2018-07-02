
const express  =  require('express')
const Router = express.Router()
const connection = require('../../helpers/db.js')
const nodemailer = require('nodemailer')
const config = require('../../config.json')



Router.post('/send-email', function(req, res) {

  const firts_name = req.body.firts_name
  const last_name = req.body.last_name
  const email = req.body.email
  const messages = req.body.messages

  const smtpTransport = nodemailer.createTestAccount((err, account) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: config.gmail.user, // generated ethereal user
          pass: config.gmail.password // generated ethereal password
      }
    })
    const mailOptions = {
      from: '"Edouard" <edouarddelaage@gmail.com>', // sender address
      to: "edouarddelaage@gmail.com", // list of receivers
      subject: 'Mesaage ', // Subject line
      text: `Prenom : ${firts_name}
      Nom : ${last_name}
      email : ${email}
      Message : ${messages}` // plaintext body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      })
    })
});

const insertUserQuery = `
  INSERT INTO messages (firts_name, last_name, email, messages)
  VALUES (?, ?, ?, ?)`

Router.post('/messages', function(req, res, next) {
  // res.send('I am in POST signup');
  const firts_name = req.body.firts_name
  const last_name = req.body.last_name
  const email = req.body.email
  const messages = req.body.messages
  const values = [firts_name, last_name, email, messages]

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