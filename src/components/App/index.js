import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';

import * as ROUTES from '../../constants/routes';

const App = ({ firebase }) => {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((authUser) => {
      authUser ? setAuthUser(authUser) : setAuthUser(null);
    });
    console.log(listener, authUser);
    return () => {
      return listener();
    };
  }, []);
  return (
    <Router>
      <Navigation authUser={authUser} />
      <hr />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
    </Router>
  );
};

export default withFirebase(App);
