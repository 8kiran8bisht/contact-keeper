import { PromiseProvider } from 'mongoose';
import React,{useState,useContext,useEffect} from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register=(props)=>{
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const{setAlert}= alertContext;
  const{register,error,clearErrors,isAuthenticated}= authContext;
  
  useEffect(()=>{
    if(isAuthenticated){
     props.history.push('/')
    }
    if(error === "User already exist!"){
      console.log("1");
      setAlert(error,'danger');
      clearErrors(); 
    }
    //eslint-disabled-next-line
  },[error,isAuthenticated,props.history]);
  const[user,setUser]= useState({
    name:'',
    email:'',
    password:'',
    password2:''
  });

 

  const{name,email,password,password2} =user;

  const onChange = e =>setUser({...user,[e.target.name]: e.target.value});

  const onSubmit= e =>{
    e.preventDefault();
    if(name==='' || email ==='' || password==='')
    {
      setAlert('Please Enter all fields!','danger');               
    } 
    else if(password!==password2){
      setAlert("Password dont match!",'danger');
    }
    else{
      register({
        name,
        email,
        password
      })
    }
   
  }
  return(
    <div className="form-container">
      <h1> Account <span className="text-primary">Register</span></h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={email} onChange={onChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="name">Password</label>
          <input type="text" name="password" value={password} onChange={onChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="name">Password2</label>
          <input type="text" name="password2" value={password2} onChange={onChange}/>
        </div>

        <input type="submit" value="Register" className="btn btn-primary btn-block"/>

      </form>
    </div>
  );
}

export default Register;