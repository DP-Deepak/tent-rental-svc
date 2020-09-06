import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { removeToken } from '../../utils/tokenHandling';
import { useHistory } from "react-router-dom";

const Navbar = ({ isAuthenticated, setAuthStatus }) => {
  const history = useHistory()
  const authLinks = (
    <ul>
      <li><a href="/customer">Customer</a></li>
      <li>
        <Link to='/product'>Inventory Report</Link>
      </li>
      <li>
        <Link to='/transaction'>Transactions</Link>
      </li>
      <li className="hide-sm" >
        <button className="fas fa-sign-out-alt" onClick={() => { removeToken(); setAuthStatus(false); history.push('/login') }}  >
          {`   `}
          Logout
         </button>
      </li>
    </ul>

  )
  const guestLinks = (
    <ul>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  )
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/' >
          <i className="fas fa-code" />
           Tent House
          </Link>
      </h1>
      {isAuthenticated ? authLinks : guestLinks}
    </nav >
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

export default Navbar