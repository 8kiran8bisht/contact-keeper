const express= require('express');
const router= express.Router();


//@route get api/contacts
//@desc get contacts
//@access public

router.get('/',(req,res)=>{
  res.send("Get all contacts");
})

//@route post api/contacts
//@desc Add new contact
//@access Private

router.post('/',(req,res)=>{
  res.send("Add a Contact");
})


//@route put api/contacts/:id
//@desc Update a  contact
//@access Private

router.put('/:id',(req,res)=>{
  res.send("update contact");
})

//@route delete api/contacts/:id
//@desc Delete a  contact
//@access Private

router.delete('/:id',(req,res)=>{
  res.send("delete contact");
})

module.exports =router;