const mongoose = require('mongoose');
const config= require('config');
const db=config.get('mongoURI');

const connectDb=()=>{
  mongoose.connect(db,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true 
  }).then(()=>{console.log("mongoose connected")})
  .catch(err=>{
    console.error("Error here");
    process.exit(1);
  });
}

module.exports=connectDb;