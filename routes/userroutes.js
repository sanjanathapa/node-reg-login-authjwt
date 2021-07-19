var express = require("express");
var myctrl = require("../controllers/usercontroller");

var approute = express.Router();

//var jwt = require("../Config/jwthelper");

approute.post("/signUp", myctrl.signUp);
approute.post("/authenticate", myctrl.authenticate);

module.exports=approute;