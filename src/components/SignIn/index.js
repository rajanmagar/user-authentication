import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForgot';
import { withFirebase } from '../Firebase';
import * as Routes from '../../constants/routes';

const SignInPage = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <SignInForm />
      <SignInGoogle />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  );
};

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.firebase
      .signIn(email, password)
      .then(() => {
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
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type='email'
          name='email'
          value={email}
          onChange={this.onChange}
          placeholder='Email Address'
        />
        <input
          type='password'
          name='password'
          value={password}
          onChange={this.onChange}
          placeholder='Email Address'
        />
        <button disabled={isInvalid} type='submit'>
          Sign In
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.props.firebase
      .signInWithGoogle()
      .then((socialAuthUser) => {
        // create google user in your firebase db too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(Routes.HOME);
      })
      .catch((error) => this.setState({ error }));
  };
  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <button type='submit'>Sign In With Google</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

const SignInGoogle = compose(withRouter, withFirebase)(SignInGoogleBase);

export default SignInPage;

export { SignInForm, SignInGoogle };
