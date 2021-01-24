const express = require('express');
const postControllers = require('../controllers/post');
const router = express.Router();
const authMiddleware=require('../middlewares/auth')
const user = require('../models/user');

router.get('/homepage',(req , res ,next)=>{
  if(authMiddleware){

    postControllers.getAll().then(r=>res.json(r)).catch(e=>e.json('msg:eror'));
    postControllers.getfollwing().then(r=>res.json(r)).catch(e=>e.json('msg:eror'));
  }
  else{
    postControllers.getAll().then(r=>res.json(r)).catch(e=>e.json('msg:eror'));
  }
   

});
//for specific profile by Author name
router.get('/page/:firstname',authMiddleware,(req , res ,next)=>{ 
  let name=req.params.firstName;
  postControllers.getuser(name).then(r=>res.json(r)).catch(e=>e.json('msg:eror'));
});
router.post('/addPost',authMiddleware, async(req , res ,next)=>{
  debugger;
    const {id}= req.user;
    const newPost = req.body;
    try{
    const post = await postControllers.create({...newPost,userId : id});
    
    res.json({data:post});
    }
    catch(e){
      next(e);
    }
});
router.get('/searchByTag/:searchkey',authMiddleware, async(req , res ,next)=>{
  debugger;
    const {id}= req.user;
    const key = req.params.searchkey;
    try{
    const post = await postControllers.searchBytag(key);
    
    
    res.json({data:post});
    }
    catch(e){
      next(e);
    }
});
router.get('/searchByName/:searchkey',authMiddleware, async(req , res ,next)=>{
   Author=req.params.searchkey;
   console.log(Author)
   id= user.find({firstName:Author},{_id:1})._id;
    try{
      const AuthorData = await postControllers.searchByName(id);
      res.json({data:AuthorData});
      }
      catch(e){
        next(e);
      }
});

router.delete('/delete/:id',authMiddleware, async (req , res ,next)=>{
  const {id} =req.params; 
  try{
    const deletedpost = await postControllers.deletePost(id);
    res.json({data:deletedpost});
    }
    catch(e){
      next(e);
    }
});

router.patch('/edit/:id',authMiddleware,async(req , res ,next)=>{
  const {body}=req;
  const {id} =req.params; 
   try{
    const editedpost = await postControllers.editPost(id,body);
    res.json({data:editedpost});
    }
    catch(e){
      next(e);
    }
});

module.exports = router;