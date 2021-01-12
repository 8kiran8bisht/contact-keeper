import React,{useReducer} from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import{
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';
const ContactState = props =>{
 const initialState={
  contacts:[],
  current: null,
  filtered: null,
  error:null
 };
 const[state, dispatch]=useReducer(contactReducer,initialState);

 //All Actions will be here

 //Add contact

 const  addContact = async contact =>{
  const config ={
    headers:{
      'Contact-Type':'application/json'
    }
  }
  try{
    const res= await axios.post('/api/contacts',contact,config);
    dispatch({type:ADD_CONTACT,payload:res.data})

  }catch(err){
    dispatch({
      type: CONTACT_ERROR,
      payload:err.response.msg
  })
  }
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
          error:state.error,
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