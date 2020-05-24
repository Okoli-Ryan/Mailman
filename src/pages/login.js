import React from "react";
import Header from "../components/header";
import { Link, useHistory } from "react-router-dom";

function Login() {

  const history = useHistory();
  return (
    <>
      <div className="form-page">
        <Header />
        <div className="form-container">
          <form className="form">
            <div className="form-title">{/* user icon */}Login</div>
            <div className="username">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" className="login-username" />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" />
            </div>
            <div className="form-submit">
              <input type="button" className="submit" onClick={() => history.push('chatpage')} value="submit" />
            </div>
            <div className="form-switch">
              switch to <Link to="/signup">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
