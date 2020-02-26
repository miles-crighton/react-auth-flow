import React, { useEffect } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

const authenticate = async () => {
  try {
    const res = await axios.get('/authenticate', { auth: { username: 'admin', password: '123' } });
    console.log(res.data);
  } catch(e) {
    console.log(e);
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
  useEffect(() => {
    clearCookie()
  });
  return (
    <Router>
      <div className="App">
        <nav className="App-nav">
          <Link to="/dash">Dash</Link>
          <Link to="/pics">Pics</Link>
        </nav>
        <button onClick={authenticate}>Authorize</button>
        <button onClick={checkCookie}>Check cookie</button>
        <Switch>
          <Route path="/dash">
            <p>You're at dash</p>
          </Route>
          <Route path="/pics">
            <p>You're at pics!</p>
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
