import React from "react";
import Header from "../components/header";
import { Link, Redirect } from "react-router-dom";
import {useForm} from '../customHooks/useForm'
import {useSelector} from 'react-redux';

function Login() {

  const {handleChange, handleSubmit} = useForm();
  const isLoggedIn = useSelector(state => state) 

  return (
    isLoggedIn === true ? (<Redirect to='/chatpage'/>) :
    (<>
      <div className="form-page">
        <Header />
        <div className="form-container">
          <form className="form">
            <div className="form-title">{/* user icon */}Login</div>
            <div className="username">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" className="login-username" onChange={handleChange}/>
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" onChange={handleChange}/>
            </div>
            <div className="form-submit">
              <input type="button" className="submit" onClick={handleSubmit} value="submit" />
            </div>
            <div className="form-switch">
              switch to <Link to="/signup">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </>
    )
  );
}

export default Login;
