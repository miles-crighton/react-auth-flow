import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="App-nav">
          <Link to="/dash">Dash</Link>
          <Link to="/pics">Pics</Link>
        </nav>
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
