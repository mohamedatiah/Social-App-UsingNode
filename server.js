const express = require('express');
const mongoose = require('mongoose');
const postRoute = require('./routes/post');
const userRoute = require('./routes/user');
const authMiddleware = require('./middlewares/auth');
const app = express();
const { MONGODB_URI } = process.env
mongoose.connect(MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());

app.use('/posts',postRoute);
app.use('/users',userRoute);


app.use((req, res, next) => {
    res.status(404).json({ err: 'page not found' });
  });
  
  app.use((err, req, res, next) => {
   
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(422).json(err.errors);
    }
    if (err.code === 11000) {
      res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
    }
    if (err.message === 'UN_AUTHENTICATED') {
      res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
    }
    res.status(503).json({"error":err.message});
  });


app.listen(process.env.PORT || 8080,()=>{
    console.log('App is run onnnn: ' , 8080);
})
