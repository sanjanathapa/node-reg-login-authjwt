// const Sequelize = require("sequelize");
// const jwt = require("jsonwebtoken");
// const model = require("../models/register.model");
// //const bcrypt = require("bcryptjs");
// const register= model.register;

// //creating function or api for signup
// exports.register = (req,res)=>{
//     const Register={     //create Reg object which we are going to save in the table
//         id:req.body.id,
//         Name:req.body.Name,
//         email:req.body.email,
//         password:req.body.password
//     };
//     register.register.create(Register).then((documents)=>{
//         return res.status(200).json({
//             success:true,
//             message:'Register successfully',
//             data:documents
//         })
//     })
//     .catch((err)=>{
//         return res.status(401).json({
//             success:false,
//             message:'Error in registering',
//             error:err.message
//         })
//     })
// }

// 


const registerModel = require('../models/register.model')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require("../config/passport");
const Joi = require("joi");

function signUp(req, res){
    
    //Sign up
    console.log("API function running");
    registerModel.findOne({where:{email:req.body.email}}).then(result => {
        console.log("findOne is running", result);
        if(result!==null){
            console.log("Email Already Exists");
            res.status(409).json({
                message: "Email already exists!",
            });
        }else{
            console.log("Registering User");
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.password, salt, function(err, hash){
                    const user = {
                        id: req.body.id,
                        name: req.body.name,
                        email:req.body.email,
                        password: hash
                    }
                
                    registerModel.create(user,{isNewRecord: true}).then(result => {
                        console.log("User created successfully")
                        res.status(201).json({
                            message: "User created successfully",
                        });
                    }).catch(error => {
                        console.log("user registration failed",error)
                        res.status(500).json({
                            message: "Something went wrong!",
                        });
                    });
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
        });
    });
}
module.exports={
    signUp:signUp
}
//to check authentication while login and will generate a token

//  exports.authenticate=(req,res,next)=>{
//      passport.authenticate('local',(err,user,info)=>{
//          if(err) return res.status(404).json(err);
//          if(user) return res.status(200).json({
//              "token":jwt.sign({_id:user._id},"SecretToken",{expiresIn:'20m'}),
//              "user":user
//          });
//          if(info) return res.status(401).json(info);
//      })(req,res,next)
//  }

 function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}