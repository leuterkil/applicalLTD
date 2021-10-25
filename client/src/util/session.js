const axios = require('axios');

export const signup = (user) =>
  axios.post('http://localhost:4000/register', {
    email: user.email,
    username: user.username,
    password: user.password,
  });
export const login = (user) =>
  axios.post('http://localhost:4000/login', {
    email: user.email,
    username: user.username,
    password: user.password,
  });

export const checkLoggedIn = async () => {
  const response = await axios.get('http://localhost:4000/api/session');
  const { user } = await response;
  let preloadedState = {};
  if (user) {
    preloadedState = {
      session: user,
    };
  }
  return preloadedState;
};
