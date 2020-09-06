import axios from 'axios'

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token']
  }
}

const setToken = token => {
  localStorage.setItem('token', token);
}

const getToken = () => {
  return localStorage.getItem('token');
}

const removeToken = () => {
  localStorage.removeItem('token');
}

export { setAuthToken, setToken, getToken, removeToken };
