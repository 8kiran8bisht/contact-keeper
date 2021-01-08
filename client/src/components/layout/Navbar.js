import React from 'react';
import {Link} from 'react-router-dom';
import ProtoTypes from 'prop-types';
const Navbar=({title,icon})=>{
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon}>{title}</i>
      </h1>
      <ul>
        <li>
         <Link to="/">Home</Link>
        </li>
        <li>
         <Link to="/about">About</Link>
        </li>
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