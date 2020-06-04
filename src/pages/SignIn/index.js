import React, { Component } from 'react';

import SignInForm from './signInForm';
import SignInLink from './signInLink';
import { SignUpLink } from '../SignUp';

import { PasswordForgetLink } from '../PasswordForget';

class SignIn extends Component {
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
