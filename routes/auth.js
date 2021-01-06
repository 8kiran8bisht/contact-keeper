const express= require('express');
const router= express.Router();
const bcrypt=require("bcryptjs");
const jwt = require('jsonwebtoken');
const config=require("config");
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

//@route Get api/auth
//@desc Get logged in user
//@access private

router.get('/',(req,res)=>{
  res.send("Get logged in user");
})

//@route post api/auth
//@desc authenticate user and get tocken
//@access public

router.post('/',[
  body('email',"Please Enter valid email").isEmail(),
  body('password',"Password is required!").exists()
],
async (req,res)=>{
  const errors= validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json(
      {
        errors: errors.array()
      }
    );
  }
  const {email,password}=req.body;
 try{
   let user= await User.findOne({email:email});
   
   if(!user){
     return res.status(400).json({msg:"Invalid credentials"});
   }

   const isMatch = await bcrypt.compare(password,user.password);
   if(!isMatch){
     return res.status(400).json({msg:"Invalid credentials 1"});
   }

   const payload={
    user:{
      id: user.id
    }
  }

  jwt.sign(payload,config.get('jwtSecret'),{
    expiresIn:360000
  },(err,token)=>{
    if(err) throw err;
    console.log(token)
    res.json({token});
  });

 }
 catch(err){
  console.error(err.message);
  res.status(500).send("Server error");
 }
})

module.exports =router;