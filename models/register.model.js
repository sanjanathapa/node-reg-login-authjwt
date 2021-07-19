const Sequelize = require("sequelize");
//const bcrypt = require("bcryptjs");
const seq = require("../config/dbconnection");

const register = seq.define('register', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true
    },

    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },

    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },

    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
module.exports=register