const axios = require('axios');

export const signup = (user) =>
  axios.post('/register', {
    email: user.email,
    username: user.username,
    password: user.password,
  });
export const login = (user) =>
  axios.post('/login', {
    email: user.email,
    username: user.username,
    password: user.password,
  });

export const checkLoggedIn = async () => {
  const response = await axios.get('/api/session');
  const { user } = await response;
  let preloadedState = {};
  if (user) {
    preloadedState = {
      session: user,
    };
  }
  return preloadedState;
};
