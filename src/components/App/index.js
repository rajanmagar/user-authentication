import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { withAuthentication } from '../Session';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import AccountPage from '../Account';
import PasswordForgotPage from '../PasswordForgot';

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <Navigation />
    <hr />
    <Route exact path={ROUTES.LANDING} component={LandingPage} />
    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgotPage} />
    <Route path={ROUTES.HOME} component={HomePage} />
    <Route path={ROUTES.ACCOUNT} component={AccountPage} />
  </Router>
);

export default withAuthentication(App);
