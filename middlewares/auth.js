const { JsonWebTokenError } = require("jsonwebtoken");
const jwt =require('jsonwebtoken');
const { promisify } = require('util');
const User = require("../models/user");
const asyncVerify = promisify(jwt.verify)

const checkaAuth =async(req,res,next)=>{
  const  {authorization}=req.headers;
 if(!authorization){
     next(new Error('UN authorized'))
 }
 try{
  const token=  await asyncVerify(authorization,'SECRET_MUST_BE_COMPLEX');
  const {id} = token;
  req.user = await User.findById(id).exec();
  next();
 }
 catch(e){
    next(new Error('UN authorized'))
 }
}

module.exports = checkaAuth;