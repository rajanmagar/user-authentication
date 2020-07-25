import React, { Component } from 'react';
import { Link, withRouter, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as Routes from '../../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <h1>Password Forget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    this.props.firebase
      .passwordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(Routes.SIGN_IN);
      })
      .catch((error) => {
        this.setState({ error });
      });
  };
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, error } = this.state;
    const isInvalid = email === '';
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type='email'
          name='email'
          value={email}
          onChange={this.onChange}
          placeholder='Email Address'
        />
        <button type='submit' disabled={isInvalid}>
          Reset My Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={Routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = compose(
  withRouter,
  withFirebase
)(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };
