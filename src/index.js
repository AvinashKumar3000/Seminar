import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import { Route, Switch } from 'react-router-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserDashBoard from './pages/UserDashBoard';
import AdminAuth from './pages/AdminAuth';
import Welcome from './pages/Welcome';

ReactDOM.render(
  <BrowserRouter>
      <Switch>
          <Route path="/" component={App} exact />
          <Route path="/user" component={UserDashBoard} />
          <Route path="/Admin" component={AdminAuth} />
          <Route path="/Welcome/:id" component={Welcome} />
          <Route component={Error} />
      </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
