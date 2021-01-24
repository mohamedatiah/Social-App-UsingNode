const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {Schema} = mongoose;
const userSchema = new Schema(
    {
        username: {
          type:String,
          require:true,
          minlength:5,  
          unique:true,
        },
        password: {
            type:String,
            require:true,
        },
       
        firstName: {
          type: String,
          maxLength: 15,
          minlength:3,
          required: true,
        },
        age : Number, 
        
        following: [{ 
          type: Schema.ObjectId,
           ref: 'User'
         }],
        followers: [{ 
          type: Schema.ObjectId,
           ref: 'User' 
        }],
    },
    {toJSON:{
      transform:(doc,ret,options)=>{
        delete ret.password;
         return ret;
      }
    }
  }
);

userSchema.pre('save',function(next){
    var hash = bcrypt.hashSync(this.password, 8);
    this.password=hash;
    next();
});

userSchema.pre('findOneAndUpdate',function(next){
  this._update.password=bcrypt.hashSync(this._update.password, 8);
  next();
});



userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
const User = mongoose.model('User',userSchema);
module.exports = User;