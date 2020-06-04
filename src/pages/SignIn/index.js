import React from 'react';

import SignInForm from './signInForm';
import SignInLink from './signInLink';
import { SignUpLink } from '../SignUp';

class SignIn extends React.Component {
  render() {
    return(
      <React.Fragment>
        <h1>Sign In</h1>
        <SignInForm />
        <SignUpLink />
      </React.Fragment>
    )
  }
}
 
export default SignIn;

export { SignInForm, SignInLink };
