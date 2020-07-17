import React from "react";
import Header from "../components/header";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "../customHooks/useForm";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions/loginAction";

function Login() {
  const { handleChange, userDetails } = useForm();
  const isLoggedIn = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

  return isLoggedIn ? (
    <Redirect to="/chatpage" />
  ) : (
    <>
      <div className="form-page">
        <Header />
        <div className="form-container">
          <form className="form">
            <div className="form-title">{/* user icon */}Login</div>
            <div className="username">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                required
                name="email"
                className="login-username"
                onChange={handleChange}
                 autocomplete="off"
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                required
                name="password"
                onChange={handleChange}
                autocomplete="off"
              />
            </div>
            <div className="form-submit">
              <input
                type="button"
                className="submit"
                onClick={() => dispatch(login(userDetails))}
                value="submit"
              />
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
