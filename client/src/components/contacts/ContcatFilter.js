import React,{useContext,useEffect,useRef} from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter=()=>{
  
  const contactContext=useContext(ContactContext);
  const text=useRef('');
  const {filterContacts,clearFilter,filtred}=contactContext;

  const onChange=(e)=>{
    if(text.current.value!=='')
      filterContacts(e.target.value);
    else
      clearFilter();
  }

  useEffect(()=>{
    if(filtred===null){
      text.current.value='';
    }
  })
  return(
    <form>
      <input ref={text} type="text" placeholder="Filter Contact....." onChange={onChange}/>
    </form>
  )

}

export default ContactFilter;