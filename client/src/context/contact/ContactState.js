import React,{useReducer} from 'react';
import {v4 as uuid} from "uuid"; 
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import{
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';
const ContactState = props =>{
 const initialState={
  contacts:[
    {
      id:1,
      name:'Jill Johnson',
      email:'jill@gmail.com',
      phone:'111-111-1111',
      type:'personal'
    },
    {
      id:2,
      name:'Tom Johnson',
      email:'tom@gmail.com',
      phone:'111-111-2222',
      type:'personal'
    },
    {
      id:3,
      name:'Nile Toto',
      email:'jnile@gmail.com',
      phone:'333-333-1111',
      type:'personal'
    }
    
  ],
  current: null,
  filtered: null
 };
 const[state, dispatch]=useReducer(contactReducer,initialState);

 //All Actions will be here

 //Add contact

 const  addContact = contact =>{
   contact.id=uuid();
   dispatch({type:ADD_CONTACT,payload: contact})
 };

 // Delete Contact
 const  deleteContact = id =>{
  dispatch({type:DELETE_CONTACT,payload: id})
};
 //Set Current Contact
const setCurrent = contact=>{
  dispatch({type: SET_CURRENT,payload:contact});
}
 //Clear current Contact
 const clearCurrent = ()=>{
  dispatch({type: CLEAR_CURRENT});
}
 //update the contact
 const updateContact = contact=>{
  dispatch({type: UPDATE_CONTACT,payload:contact});
}
 //filter contact
 const filterContacts= text=>{
   dispatch({type: FILTER_CONTACTS,payload:text})
 }

 //clear filter
 const clearFilter = ()=>{
  dispatch({type: CLEAR_FILTER});
}
 return(
   <ContactContext.Provider
   value={{contacts: state.contacts,
          current: state.current,
          filtered:state.filtered,
          setCurrent,
          clearCurrent,
          addContact,
          deleteContact,
          updateContact,
          filterContacts,
          clearFilter}}
   >{props.children}
   </ContactContext.Provider>
 )
};

export default ContactState;