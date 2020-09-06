import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, ...rest }) => {
  if (localStorage.getItem('token')) {
    return (
      <Route
        {...rest}
        render={matchProps => {


          return (
              <Component {...matchProps} />
          )
        }}
      />
    );
  }
  else {
    return (<Route>
      <Redirect to="/login" />
    </Route>)
  }
};
export { AuthRoute };
