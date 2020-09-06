import React, { useState } from 'react';
import './App.css'
import { Navbar } from './components/layout';
import Landing from './components/layout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth';
import { setAuthToken, getToken } from './utils/tokenHandling';
import { SharedSnackbarProvider } from './context/SharedSnackbar.context';
import { Customer } from './components/customer';
import { Product } from './components/product';
import { Transaction } from './components/transaction';
import { AuthRoute } from './AuthRoute';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [isAuthenticated, setAuthStatus] = useState(!!getToken())
  return (
    <SharedSnackbarProvider>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} setAuthStatus={setAuthStatus} />
        <Route exact path='/' component={Landing} />
        <section className="container">
          <Switch>
            <Route exact path='/login' component={() => <Login setAuthStatus={setAuthStatus} />} />
            <AuthRoute exact path='/customer' component={Customer} />
            <AuthRoute exact path='/product' component={Product} />
            <AuthRoute exact path='/transaction' component={Transaction} />
          </Switch>
        </section>
      </Router>
    </SharedSnackbarProvider>
  )
}

export default App;
