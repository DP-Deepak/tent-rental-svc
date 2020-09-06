import React, { useState } from 'react';
import './App.css'
import Navbar from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import { setAuthToken, getToken } from './utils/tokenHandling';
import { SharedSnackbarProvider } from './context/SharedSnackbar.context';
import Customer from './components/customer/Customer';
import Product from './components/product/Product';
import Transaction from './components/transaction/Transaction';
import { AuthRoute } from './AuthRoute';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [isAuthenticated, setAuthStatus] = useState(!!getToken())
  // console.log('=isAuthenticated==', isAuthenticated);
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
