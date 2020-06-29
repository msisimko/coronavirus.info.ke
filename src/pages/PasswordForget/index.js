import React from 'react';

import PasswordForgetForm from './passwordForgetForm';
import PasswordForgetLink from './passwordForgetLink';

import { AuthUserContext } from '../../session';

import * as ROUTES from '../../constants/routes';

class PasswordForget extends React.Component {
  static contextType = AuthUserContext;
  
  componentDidMount() {
    // If signed in, redirect to Home
    let authUser = this.context;
    authUser && this.props.history.push(ROUTES.HOME);
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
 
export default PasswordForget;

export { PasswordForgetForm, PasswordForgetLink };
