import React,{useState,useContext,useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';
const ContactForm =()=>{
  const contactContext= useContext(ContactContext);
  const {addContact,current,clearCurrent,updateContact}=contactContext;

  const[contact,setContact] = useState({
    name:'',
    email:'',
    phone:'',
    type:'personal'
  });


  useEffect(()=>{
    if(current!=null){
      setContact(current);
    }else{
      setContact({
        name:'',
        email:'',
        phone:'',
        type:'personal' 
      })
    }
  },[contactContext,current]);
 
  const onChange=(e)=>{
    setContact({...contact,[e.target.name]: e.target.value});
  }

  const onSubmit= e=>{
    e.preventDefault();

    if(current == null){
      addContact(contact);
    }
    else{
     updateContact(contact); 
    }
    claerAll();
    
  }
  const claerAll=()=>{
    clearCurrent();
    setContact({
      name:'',
      email:'',
      phone:'',
      type:'personal'
    }); 
  }
  return(
    <form  onSubmit={onSubmit}>
      <h2 className="text-primary">{current? 'Edit Contact': 'Add Contact'}</h2>
      <input type="text" placeholder="Name" name="name" value={contact.name} onChange={onChange}/>
      <input type="text" placeholder="Email" name="email" value={contact.email} onChange={onChange}/>
      <input type="text" placeholder="Phone" name="phone" value={contact.phone}onChange={onChange}/>
      <h3>Contact Type</h3>
      <input type="radio" name="type" value="personal" onChange={onChange} checked={contact.type==='personal'}/>Personal{' '}
      <input type="radio" name="type" value="professional" onChange={onChange} checked={contact.type==='professional'}/>Professional{' '}
      <div>
        <input type="submit" value={current? 'Edit Contact': 'Add Contact'} className="btn btn-primary btn-block"/>
        {current && (
          <button className="btn btn-light btn-block" onClick={claerAll}>Clear</button>
        )}
      </div>
    </form>
  )
}

export default ContactForm;