import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

import Button from '@material-ui/core/Button'

import LoginView from './components/LoginView'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory,
} from 'react-router-dom'

const auth = {
  isAuthenticated: false,
  authenticate: async (username, password, cb) => {
    try {
      const res = await axios.get('/authenticate', { auth: { username, password } });
      console.log(res.data);
      if (res.status === 200) {
        auth.isAuthenticated = true
      }
      //Need to change react-router history
      cb();
      return true
    } catch (e) {
      console.log(e);
      return false
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
      }
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
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    auth.clearCookie()
  }, []);

  const submitLogin = (username, password, cb) => {
    const status = auth.authenticate(username, password, cb);
    setLoginStatus(status);
  }
  const handleLogout = (cb) => {
    auth.clearCookie(cb);
    setLoginStatus(false);
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
          <PrivateRoute path="/">
            <h1>Welcome!</h1>
            <LogoutButton
              logout={handleLogout}
            />
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


const LogoutButton = (props) => {
  let history = useHistory()

  const handleLogout = () => {
    props.logout(() => { history.push("/") })
  }

  return (
    <Button onClick={handleLogout}>Logout</Button>
  )
}
