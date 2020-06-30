import React, { Component } from 'react';
import { compose } from 'recompose';

import EmailChange from '../../components/EmailChange';
import PasswordChange from '../../components/PasswordChange';
import ProfileUpdate from '../../components/ProfileUpdate';

import { withAuthorization, withEmailVerification } from '../../session';

class AccountBase extends Component {
  render() {
    return(
      <React.Fragment>
        <h1>Account</h1>
        <ProfileUpdate />
        <EmailChange />
        <PasswordChange />
        <p>This page is only accessible to logged in users.</p>
      </React.Fragment>
    );
  }
}

const condition = authUser => !!authUser;

const Account = compose(
  withAuthorization(condition),
  withEmailVerification,
)(AccountBase);

export default Account;
