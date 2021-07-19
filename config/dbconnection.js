//Connection setup

const { Sequelize } = require('sequelize');
const dbconnection = new Sequelize('nodeauthapi', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
})


module.exports = dbconnection;



//with mysql
// const mysql = require("mysql2");

// const dbconnection = mysql
//   .createConnection({
//     host: "localhost", // HOST NAME
//     user: "root", // USER NAME
//     database: "nodeauthapi", // DATABASE NAME
//     password: "", // DATABASE PASSWORD
//   })
//   .on("error", (err) => {
//     console.log("Failed to connect to Database - ", err);
//   });

// module.exports = dbconnection;
