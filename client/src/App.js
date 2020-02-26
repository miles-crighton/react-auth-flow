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

function App() {
  // useEffect(() => {
  //   authenticate()
  // });
  return (
    <Router>
      <div className="App">
        <nav className="App-nav">
          <Link to="/dash">Dash</Link>
          <Link to="/pics">Pics</Link>
        </nav>
        <Switch>
          <button onClick={authenticate}>Click me</button>
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
