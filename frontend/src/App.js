import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { history } from './helpers/history';
import LoginPage from './containers/login/login'
import HomePage from './containers/home/home'

function App() {
  return (
  <Router history={history}>
    <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={HomePage} />
        <Redirect from="*" to="/" />
    </Switch>
  </Router>
  );
}

export default App;
