
const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema(
    {
        title: {
          type:String,
          require:true,
          minlength:5, 
          maxlength:20 
        },
      
        tags: {
       type:[String],
        maxlength:10,
        },
        body:String,
        createdAt: {
          type: Date,
          default: Date.now(),
        },
        updatedAt: Date,
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
    }
);

const Post = mongoose.model('Post',postSchema);
module.exports = Post;