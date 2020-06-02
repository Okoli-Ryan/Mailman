import React, {useEffect} from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom'
import Home from './pages/home'
// import Chat from './pages/chat'
import SignUp from './pages/signup'
import Login from './pages/login'
// import {auth} from './services/firebase'
import ChatPage from './pages/ChatPage'
import PrivateRoute from './components/PrivateRoute'
import {useSelector, useDispatch} from 'react-redux'
import {Auth} from './services/firebase'
import {setUser, logout} from './actions/loginAction'

import './App.css';

function App() {

  const dispatch = useDispatch();

const isLogged = useSelector(state => state)

//publicroute container
useEffect(() => {
  Auth.onAuthStateChanged((user) => {
    if(user){
      dispatch({type: 'set-user', payload: user})
    }
    else
    dispatch(logout())
  })
}, [])

  return (
    <Router>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact/>
      <Route path="/signup" component={SignUp} exact/>
      <PrivateRoute path="/chatpage" isLogged={isLogged} component={ChatPage} exact/>
    </Router>
  );
}

export default App;
