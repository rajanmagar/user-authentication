import React from 'react';

import { withFirebase } from '../Firebase';

const AuthUserContext = React.createContext();

export const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')),
      };
    }
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        (authUser) => {
          // lets avoid ui glitch by using browser's local storage
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.setState({ authUser });
        },
        () => {
          localStorage.removeItem('authUser');
          this.setState({ authUser: null });
        }
      );
    }
    componentWillUnmount() {
      this.listener();
    }
    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};

export default AuthUserContext;
