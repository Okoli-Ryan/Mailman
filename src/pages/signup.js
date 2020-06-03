import React from "react";
import Header from "../components/header";
import {Link, Redirect} from 'react-router-dom'
import {useForm} from '../customHooks/useForm'
import {useSelector, useDispatch} from 'react-redux';


function Signup() {

  const {handleChange, userDetails} = useForm();
  const isLoggedIn = useSelector(state => state) 
  const dispatch = useDispatch();

  return (
    isLoggedIn ? (<Redirect to='/chatpage'/>) :
    (
    <>
      <div className="form-page">
        <Header />
        <div className="form-container">
          <form className="form">
            <div className="form-title">{/* user icon */}Signup</div>
            <div className="username">
              <label htmlFor="username">Username</label>
              <input type="email" name="email" className="login-username" onChange={handleChange}/>
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" onChange={handleChange}/>
            </div>
            <div className="form-submit">
              <input type="button" className="submit" onClick={() => dispatch({type: 'sign-up', payload: userDetails})} value="submit"/>
            </div>
            <div className="form-switch">switch to <Link to="/login">Log in</Link></div>
          </form>
        </div>
      </div>
    </>
  )
  );
}

export default Signup;
