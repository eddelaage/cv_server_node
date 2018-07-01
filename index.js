const  http  =  require('http');
const  path  =  require('path');
const  express  =  require('express');
const  bodyParser  =  require('body-parser');
const mysql = require('mysql2');
// const connection = require('./helpers/db.js');
// const authRouter = require('./routes/auth/auth.js');

const  app  =  express();

app.use(bodyParser.urlencoded({ extended:  false }));
app.use(bodyParser.json());

//j'implémentation la partie API
app.get("/", (req,res)=>{
    res.send("youhou");
})
/// dans le cas d'une route non trouvée, je retourne le code 404 'Not Found'
app.use(function(req, res, next) {
    var  err  =  new  Error('Not Found');
    err.status  =  404;
    next(err);
});

let  server  =  app.listen( process.env.PORT  ||  5000, function(){
    console.log('Listening on port '  +  server.address().port);
});