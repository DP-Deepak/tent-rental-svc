import axios from 'axios'

const login = async ({ email, password }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = { email, password }
  try {

    const res = await axios.post('/api/auth', body, config);
    return res
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      return errors
    }
  }
}


const postData = async (body, endpoint) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {

    const res = await axios.post(`/api/${endpoint}`, body, config);
    return res
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      return errors
    }
  }
}

const updateData = async (body, endpoint) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {

    const res = await axios.put(`/api/${endpoint}`, body, config);
    return res
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      return errors
    }
  }
}

const getQuery = async (endpoint) => {
  try {
    const res = await axios.get(`/api/${endpoint}`);
    return res
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      return errors
    }
  }
}

export { updateData, postData, login, getQuery }