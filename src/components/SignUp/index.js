import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as Routes from '../../constants/routes';

const SignUpPage = () => {
  return (
    <div>
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  );
};

// initialize the state of the signupform component
const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = (event) => {
    event.preventDefault();
    const { email, passwordOne } = this.state;
    this.props.firebase
      .createUser(email, passwordOne)
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(Routes.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });
  };
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    console.log(this.props.firebase);
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    // isInvalid boolean to enable or disable the submit button
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type='text'
          name='username'
          value={username}
          onChange={this.onChange}
          placeholder='Full Name'
        />
        <input
          type='email'
          name='email'
          value={email}
          onChange={this.onChange}
          placeholder='Email Address'
        />
        <input
          type='password'
          name='passwordOne'
          value={passwordOne}
          onChange={this.onChange}
          placeholder='Password'
        />
        <input
          type='password'
          name='passwordTwo'
          value={passwordTwo}
          onChange={this.onChange}
          placeholder='Confirm Password'
        />
        <button disabled={isInvalid} type='submit'>
          Sign Up
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={Routes.SIGN_UP}>Sign Up</Link>
  </p>
);

// withRouter() higher-order component gains access to all the properties of the router e.g. history
const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
