const { ObjectId } = require('mongodb');
const Post = require('../models/post');
const User=require('../models/user')
const getAll = async _=>{
return await Post.find().sort({createdAt:-1});

}

const getfollwing=async(id)=>{
  s= User.db.getCollection('users').find({"_id":ObjectId("600d73b384c0d6243018a7bd")},
  {following:1,"_id":0})[0].following
  return await Post.find ({"_id":s[0]});
}

const getuser=async(name)=>{
  return await Post.find({"firstName":name}).sort({createdAt:-1});

}
const create = mypost =>{
 return Post.create(mypost)
}

const deletePost = async (id) =>{
  return await  Post.findByIdAndDelete(id);
 }
 const deleteUserposts = async (id) =>{
  return await  Post.find({userId:id});
 }
 const editPost = async (id,body) =>{
  return await  Post.findByIdAndUpdate(id,body,{new:true});
 }

const searchBytag = async(tag)=>{
  return await Post.find( { tags: { $all: [tag] } } )

}


const searchByName = async(id)=>{
  return await Post.find({userId:id})

}


module.exports={
  getAll,
  create,
  deletePost,
  editPost,
  searchBytag
,searchByName,
getuser,
deleteUserposts,
getfollwing
}