import React, { Component } from 'react';

import SignInForm from './signInForm';
import SignInLink from './signInLink';
import { SignUpLink } from '../SignUp';

import { PasswordForgetLink } from '../PasswordForget';

import { withFirebase } from '../../firebase';

import * as ROUTES from '../../constants/routes';

class SignIn extends Component {
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        // if signed in, redirect to HOME page
        authUser && this.props.history.push(ROUTES.HOME);
      },
    );
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
 
export default withFirebase(SignIn);

export { SignInForm, SignInLink };
