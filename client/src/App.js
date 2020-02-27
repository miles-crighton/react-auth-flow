import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

import LoginView from './components/LoginView'



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom'

const authenticate = async (username, password) => {
  try {
    const res = await axios.get('/authenticate', { auth: { username, password } });
    console.log(res.data);
    return true
  } catch(e) {
    console.log(e);
    return false
  }
};

const checkCookie = async () => {
  try {
    const res = await axios.get('/read_cookie')
    console.log(res.data)
    if (res.data.screen === 'auth') {
      console.log('need to auth first!')
    }
  } catch(e) {
    console.log(e)
  }
}

const clearCookie = async () => {
  try {
    const res = await axios.get('/clear_cookie');
    if (res.status === 200) {
      console.log('Successfully cleared cookie')
    }
  } catch(e) {
    console.log(e);
  }
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    clearCookie()
  }, []);

  const submitLogin = (username, password) => {
    const status = authenticate(username, password);
    setLoginStatus(status);
  }

  return (
    <Router>
      <div className="App">
        <nav className="App-nav">
          <Link to="/dash">Dash</Link>
          <Link to="/pics">Pics</Link>
        </nav>

        <Switch>
          <Route path="/login">
            <LoginView
              status={loginStatus}
              submitLogin={submitLogin}
            />
          </Route>
          <Route path="/pics">
            <p>You're at pics!</p>
          </Route>
          <Route path="/">
            <Redirect exact from="/" to="login" />
          </Route>
          <Route path="*">
            <p>404</p>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
