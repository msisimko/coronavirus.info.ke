import React from 'react';

import PasswordForgetForm from './passwordForgetForm';
import PasswordForgetLink from './passwordForgetLink';

import { withFirebase } from '../../firebase';

import * as ROUTES from '../../constants/routes';

class PasswordForget extends React.Component {
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
        <h1>Password Forget</h1>
        <PasswordForgetForm />
      </React.Fragment>
    )
  }
}
 
export default withFirebase(PasswordForget);

export { PasswordForgetForm, PasswordForgetLink };
