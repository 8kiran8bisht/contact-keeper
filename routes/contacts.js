const express= require('express');
const router= express.Router();
const auth= require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact=require('../models/Contact');

//@route get api/contacts
//@desc get contacts
//@access public

router.get('/',auth,async(req,res)=>{
  try{
    const contacts= await Contact.find({user: req.user.id}).sort({date:-1});
    res.json(contacts);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error!')
  }
  
})

//@route post api/contacts
//@desc Add new contact
//@access Private

router.post('/',[auth,[
body("name","Please Enter name!").not().isEmpty()
]],async(req,res)=>{
  const errors= validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json(
      {
        errors: errors.array()
      }
    );
  }

  const{name,email,phone,type}=req.body;
  try{
    const newContact= new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id
    });

    const contact= await newContact.save();
    res.json(contact);

  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error!')
  }
})


//@route put api/contacts/:id
//@desc Update a  contact
//@access Private

router.put('/:id',auth,async(req,res)=>{
  const{name,email,phone,type}=req.body;
  
  const contactField={};
  if(name) contactField.name=name;
  if(email) contactField.email=email;
  if(phone) contactField.phone=phone;
  if(type) contactField.type=type;

  try{
    let contact=await Contact.findById(req.params.id);
    if(!contact){
      return res.status(404).json({msg:"Contact not found !"});
    }
    if(contact.user.toString()!=req.user.id){
      return res.status(404).json({msg:"Not Autorized !"});
    }

    contact= await Contact.findByIdAndUpdate(req.params.id,{$set : contactField},{new:true});
    res.json(contact)

  }catch(err){
  console.error(err.message);
  res.status(500).send("Server error");
  }
})

//@route delete api/contacts/:id
//@desc Delete a  contact
//@access Private

router.delete('/:id',auth,async(req,res)=>{
  try{
    let contact= await Contact.findById(req.params.id);
    if(!contact){
      return res.status(404).json({msg:"Contact not found"});
    }
    if(contact.user.toString()!=req.user.id){
      return res.status(404).json({msg:"Not Autorized !"});
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json({msg:"Contact Removed !"})
  }catch(err){
    console.error(err.message);
    res.status(500).send("Server error");
  }
})

module.exports =router;