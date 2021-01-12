import React,{Fragment,useContext} from 'react';
import AuthContext from '../../context/auth/authContext';
import {Link} from 'react-router-dom';
import ProtoTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
const Navbar=({title,icon})=>{
  const authContext=useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const{clearContext}=contactContext;
  const{isAuthenticated,logout,user}=authContext;
  const onLogout=()=>{
    logout();
    clearContext();
  }
  const authlink =(
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li><a href="#!" onClick={onLogout}>
        <li className="fas fa-sign-out-alt">
          <span className="hide-sm">
            logout
          </span>
        </li>
      </a></li>
    </Fragment>
  );
  const guestlink =(
    <Fragment>
        <li>
         <Link to="/register">Register</Link>
        </li>
        <li>
         <Link to="/login">Login</Link>
        </li>
    </Fragment>
  )
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon}>{title}</i>
      </h1>
      <ul>
      {isAuthenticated?authlink:guestlink}
      </ul>
    </div>
  )
}

Navbar.protoTypes={
  title: ProtoTypes.string.isRequired,
  icon: ProtoTypes.string
}

Navbar.defaultProps={
  title: 'Conrcat Keeper',
  icon: "fas fa-id-card-alt"
}

export default Navbar;