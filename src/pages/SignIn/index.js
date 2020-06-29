import React, { Component } from 'react';

import SignInForm from './signInForm';
import SignInLink from './signInLink';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';

import { AuthUserContext } from '../../session';

import * as ROUTES from '../../constants/routes';

class SignIn extends Component {
  static contextType = AuthUserContext;
  
  componentDidMount() {
    // If signed in, redirect to Home
    let authUser = this.context;
    authUser && this.props.history.push(ROUTES.HOME);
  }

  render() {
    return(
      <React.Fragment>
        <h1>Sign In</h1>
        <SignInForm />
        <SignUpLink />
        <PasswordForgetLink />
      </React.Fragment>
    )
  }
}
 
export default SignIn;

export { SignInForm, SignInLink };
