import React, { Component } from 'react';

import SignUpForm from './signUpForm';
import SignUpLink from './signUpLink';
import { SignInLink } from '../SignIn';

import { withFirebase } from '../../firebase';

import * as ROUTES from '../../constants/routes';

class SignUp extends Component {
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
        <h1>Sign Up</h1>
        <SignUpForm />
        <SignInLink />
      </React.Fragment>
    )
  }
}
 
export default withFirebase(SignUp);

export { SignUpForm, SignUpLink };
