import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';

import LinkButton from './components/LinkButton'

import LoginView from './components/LoginView';
import DashView from './components/DashView';
import HomeView from './components/HomeView';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory,
} from 'react-router-dom'
import CreateAccountView from './components/CreateAccountView';

const auth = {
  isAuthenticated: false,
  authenticate: async (username, password, cb) => {
    try {
      const res = await axios.post('/api/user/login', { username, password });
      console.log(res.data);
      if (res.status === 200) {
        auth.isAuthenticated = true
        cb(); //Change react router history
        return ''
      } else {
        return 'Incorrect login, please try again.'
      }
    } catch (e) {
      console.log(e);
      return 'Error logging in'
    }
  },
  createAccount: async (username, password, cb) => {
    try {
      const res = await axios.post('/api/user/signup', { username, password });
      console.log(res.data);
      if (res.status === 200) {
        auth.isAuthenticated = true
        cb(); //Change react router history
        return ''
      } else {
        return 'Error'
      }
    } catch (e) {
      console.log(e);
      return 'Error creating account'
    }
  },
  checkCookie: async () => {
    try {
      const res = await axios.get('/read_cookie')
      console.log(res.data)
      if (res.data.screen === 'auth') {
        console.log('need to auth first!')
      } else {
        auth.isAuthenticated = true
        return true
      }
      return false
    } catch (e) {
      console.log(e)
    }
  },
  clearCookie: async (cb) => {
    try {
      const res = await axios.get('/clear_cookie');
      if (res.status === 200) {
        console.log('Successfully cleared cookie')
        auth.isAuthenticated = false
        cb()
      }
    } catch (e) {
      console.log(e);
    }
  }
};

function App() {
  const [loginStatus, setLoginStatus] = useState('');

  useEffect(() => {
    auth.clearCookie()
  }, []);

  const submitLogin = async (username, password, cb) => {
    const status = await auth.authenticate(username, password, cb);
    setLoginStatus(status);
  }
  const handleLogout = async (cb) => {
    await auth.clearCookie(cb);
    setLoginStatus('');
  }
  const createAccount = async (username, password, cb) => {
    const status = await auth.createAccount(username, password, cb);
  }

  return (
    <Router>
      <div className="App">
        <nav className="App-nav">
          <AppBar position="static" color="primary2">
            <Toolbar>
              <LinkButton to="/">Home</LinkButton>
              <LinkButton to="/dashboard">Dashboard</LinkButton>
            </Toolbar>
          </AppBar>
        </nav>
        <Switch>
          <Route exact path="/">
            <HomeView />
          </Route>
          <Route path="/login">
            <LoginView
              status={loginStatus}
              submitLogin={submitLogin}
            />
          </Route>
          <Route path="/create-account">
            <CreateAccountView
              status={false}
              createAccount={createAccount}
            />
          </Route>
          <PrivateRoute path="/dashboard">
            <DashView logout={handleLogout} /> 
          </PrivateRoute>
          <Route path="*">
            <p>404</p>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAuthenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}