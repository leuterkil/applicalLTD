import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../Actions/session';
import { Helmet } from 'react-helmet';

const mapStateToProps = ({ errors }) => ({
  errors,
});
const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
});
const Login = ({ errors, login }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };
    console.log(user);
    login(user);
  };
  return (
    <>
      <Helmet>
        <title>Login - Applical LTD</title>
      </Helmet>
      <div className="container text-center">
        <h1>Login</h1>
        <p>{errors}</p>
        <form onSubmit={handleSubmit}>
          <label className="form-label">
            Username:
            <input type="text" name="username" className="form-control" />
          </label>
          <br />
          <label className="form-label">
            Email:
            <input type="email" name="email" className="form-control" />
          </label>
          <br />
          <label className="form-label">
            Password:
            <input type="password" name="password" className="form-control" />
          </label>
          <br />
          <input type="submit" value="Σύνδεση" className="btn btn-primary" />
        </form>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
