import React, { Component } from 'react';

import SignUpForm from './signUpForm';
import SignUpLink from './signUpLink';
import { SignInLink } from '../SignIn';

import { AuthUserContext } from '../../session';

import * as ROUTES from '../../constants/routes';

class SignUp extends Component {
  static contextType = AuthUserContext;
  
  componentDidMount() {
    let authUser = this.context;
    // if signed in, redirect to HOME page
    authUser && this.props.history.push(ROUTES.HOME);
  }

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
