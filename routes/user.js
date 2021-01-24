const express = require('express');
const { ObjectId } = require('mongodb');
const userControllers = require('../controllers/user');
const postControllers = require('../controllers/post');

const authMiddleware = require('../middlewares/auth');
const router = express.Router();
const User = require('../models/user');
const usr = require('../models/user');



router.get('/',authMiddleware,async(req , res ,next)=>{
  const {user:{firstName}}= req
  res.json({"registerd firstname ":firstName});
});

router.post('/register', async(req , res ,next)=>{
 const newUser = req.body;
 const user = await userControllers.create(newUser).catch(e=>{
   res.status(422).json(e.errors);
 });
 res.json(user);
  
});

router.post('/login', async(req , res ,next)=>{
  const userData = req.body;
try{
   user = await userControllers.login(userData);
      
  res.json(user);
}catch(e){
 next(e)
 }
  
 });


 router.patch('/edit/:id',authMiddleware,async(req , res ,next)=>{
  debugger;
  const {body}=req;
  const {id} =req.params; 
   
   try{
    const edited = await userControllers.edit(id,body);
    res.json({data:edited});
    }
    catch(e){
      next(e);
    }
});

router.delete('/delete/:id',authMiddleware,async(req , res ,next)=>{
  const {id} = req.params;
  try{
  
  await  userControllers.deleteUser(id);
  await  postControllers.deleteUserposts(id);
  res.json("user is deleted ");
  }
  catch(e){
    next(e);
  }

  
});
//follow

router.post('/follow/:following',authMiddleware, async (req, res, next) => {
  names= req.body.username;
  id=User.find({"firstName":names},{_id:1})._id;
  following=req.params.following;

  try {

       await userControllers.follow(id,following);
   
    } catch (e) {
        next(e);
    }
});
//unFollow
router.post('/unfollow/:following', authMiddleware,async (req, res, next) => {
  names= req.body.username;
  id=User.find({"firstName":names},{_id:1})._id;
  following=req.params.following;

  try {

       await userControllers.unfollow(id,following);
   
    } catch (e) {
        next(e);
    }
});

module.exports = router;