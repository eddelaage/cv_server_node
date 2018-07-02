
const express  =  require('express')
const Router = express.Router()
const connection = require('../../helpers/db.js')


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
      res.status(200).json({ flash:  "User has been signed up !" });
    })
    .catch(err => {
      res.status(500).json({ flash:  err.message });
    })
})


module.exports = Router