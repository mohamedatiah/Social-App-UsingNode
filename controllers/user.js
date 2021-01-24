const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { ObjectId } = require('mongodb');
const asyncSign = promisify(jwt.sign)

const login = async ({username,password})=>{
     user =await User.findOne({username}).exec()
     const isVaildPass = user.validatePassword(password);
     if (!user) {
      throw Error('UN_AUTHENTICATED');
    }
   
    if (!isVaildPass) {
      throw Error('UN_AUTHENTICATED');
    }
   
    const token = await asyncSign({
      username: user.username,
      id: user.id,
    }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '1d' });
    return {...user.toJSON(), token };
    
   
}

const create = newUser =>User.create(newUser);


const deleteUser = async (id) => {
  
  s= await  User.findByIdAndDelete(id).exec();
}

const get = newUser =>User.find({ "firstName": { $exists:true} },{'firstName':1,_id:0}).exec();

const edit = async (id,body) =>{
  return await  User.findByIdAndUpdate(id,body,{new:true});
 }
 const follow = (id, following) => {
   
    User.updateOne({"_id":id},
     {$push:{"following":ObjectId(following)}},function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
       }
     })
      User.updateOne({"_id":ObjectId(following)},
      {$push:{"followers":id}},function(err, result) {
       if (err) {
         res.send(err);
       } else {
         res.send(result);
       }

    });
 }

 const unfollow = (id, following) => {
   
  User.updateOne({"_id":id},
   {$pull:{"following":ObjectId(following)} })
   
    User.updateOne({"_id":ObjectId(following)},
    {$pull:{"followers":id}});
}

module.exports={
  login,
  create,
  edit,
  get,
  deleteUser,
  follow,
  unfollow
}