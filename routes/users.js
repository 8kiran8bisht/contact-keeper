const express= require('express');
const router= express.Router();
const bcrypt=require("bcryptjs");
const jwt = require('jsonwebtoken');
const config=require("config");
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
//@route POST api/users
//@desc Register a user
//@access Public

router.post('/',[
  body('name','Please Enter Your Name.')
  .not()
  .isEmpty(),
  body('email','Please enter your email').isEmail(),
  body('password','Please enter a password with minimum 6 charcters long').isLength({min:6})
], async (req,res)=>{
  const errors= validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json(
      {
        errors: errors.array()
      }
    );
  }
  const {name,email,password}=req.body;
  try{
    let user= await User.findOne({email:email});
    if(user){
      return res.status(400).json({msg:"User already exist!"})
    }
    user=new User({
      name,
      email,
      password
    })
    const salt= await bcrypt.genSalt(10);
    user.password= await bcrypt.hash(password,salt);

    await user.save();
   // res.send('User Saved!');
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
  }catch(err){
    console.error(err.message);
    res.status(500).send("Server error");
  }
  
})

module.exports =router;