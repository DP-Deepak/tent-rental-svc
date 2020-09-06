import React, { useState } from 'react';
import {  Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../../api/api';
import { SharedSnackbarConsumer } from '../../context/SharedSnackbar.context';
import { setToken, getToken } from '../../utils/tokenHandling';
import { useHistory } from "react-router-dom";

const Login = ({setAuthStatus}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const history = useHistory()
  const { email, password } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e, openSnackbar) => {
    e.preventDefault()
    const response = await login({ email, password })
    if (response && response.status === 200) {
      setAuthStatus(true)
      openSnackbar('Welcome Admin', 'success')
      setToken(response.data.token)
      history.push('/')
    } else {
      openSnackbar('Invalid Credentials', 'error')
    }
  }
  return (
    <SharedSnackbarConsumer>
      {({ openSnackbar }) => {
        return (!getToken()) ?
          (<>
            <h1 className="large text-primary">Sign In</h1>
            <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e, openSnackbar)} >
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            </>
      ) : <Redirect to='/' />
      }
      }

    </SharedSnackbarConsumer >
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

export default Login;