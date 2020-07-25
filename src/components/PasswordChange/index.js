import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = (event) => {
    event.preventDefault();
    const { passwordOne } = this.state;
    this.props.firebase
      .passwordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne === '' || passwordOne !== passwordTwo;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type='password'
          name='passwordOne'
          value={passwordOne}
          onChange={this.onChange}
          placeholder='New Password'
        />
        <input
          type='password'
          name='passwordTwo'
          value={passwordTwo}
          onChange={this.onChange}
          placeholder='Confirm New Password'
        />
        <button type='submit' disabled={isInvalid}>
          Reset My Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
