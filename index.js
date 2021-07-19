//create and set up the express server.
const express = require("express");
const bodyParser = require("body-parser");
const seq = require("./config/dbconnection");
var routess = require("./routes/userroutes");
const db = require('./models/register.model');


const app =express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', routess);


//default welcome page route
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  seq.sync();

  //test DB
seq.authenticate().then(() => {
  console.log('Database connected successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});






app.listen(4500,()=>{
    console.log('app listening at http://localhost:4500')
} )