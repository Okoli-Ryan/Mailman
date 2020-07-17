import React, { useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import ChatPage from "./pages/ChatPage";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { Auth } from "./services/firebase";
import { logout } from "./actions/loginAction";
import Loading from "./components/loading";
import ModalError from "./components/modalError";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    Auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: "set-user", payload: user });
      } else dispatch(logout());
    });
  }, []);

  return (
    <>
      <Loading />
      <ModalError />
      <Router>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={SignUp} exact />
        <PrivateRoute
          path="/chatpage"
          isLogged={useSelector((state) => state.loginReducer)}
          component={ChatPage}
          exact
        />
      </Router>
    </>
  );
}
//TODO uncomment these files before production

export default App;
