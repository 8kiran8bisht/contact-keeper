import React,{useReducer} from 'react';
import uuid from 'uuid';
import ContactContext from './contactContaxt';
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
import contactContext from './contactContaxt';

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
    
  ]
 };
 const[state, dispatch]=useReducer(contactContext,initialState);

 //All Actions will be here

 //Add contact

 // Delete Contact

 //Set Current Contact

 //Clear current Contact

 //update the contact

 //filter contact

 //clear filter

 return(
   <ContactContext.Provider
   value={{contacts: state.contacts}}
   >{props.children}
   </ContactContext.Provider>
 )
};

export default ContactState;