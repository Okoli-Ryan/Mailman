import React from "react";
import Header from '../components/header'
import { useHistory, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux'

function Home() {

    const history = useHistory();
    const isLogged = useSelector(state => state)

  return (
    isLogged ? <Redirect to="/chatpage"/> :
    <div className="home">
        <Header></Header>
      <div className="home-container">
        <div className="login-signup-container">
          <div className="login-option">
            <input type="button" value="Login" onClick={() => history.push('/login')} />
          </div>
          <div className="signup-option">
            <input type="button" value="Sign Up" onClick={() => history.push('/signup')}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
