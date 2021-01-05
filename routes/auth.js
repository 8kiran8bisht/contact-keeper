const express= require('express');
const router= express.Router();

//@route Get api/auth
//@desc Get logged in user
//@access private

router.get('/',(req,res)=>{
  res.send("Get logged in user");
})

//@route post api/auth
//@desc authenticate user and get tocken
//@access public

router.get('/',(req,res)=>{
  res.send("log in user");
})

module.exports =router;