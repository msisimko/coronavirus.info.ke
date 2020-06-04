import React, { Component } from 'react';

import SignUpForm from './signUpForm';
import SignUpLink from './signUpLink';
import { SignInLink } from '../SignIn';

class SignUp extends Component {
  render() {
    return(
      <React.Fragment>
        <h1>Sign Up</h1>
        <SignUpForm />
        <SignInLink />
      </React.Fragment>
    )
  }
}
 
export default SignUp;

export { SignUpForm, SignUpLink };
