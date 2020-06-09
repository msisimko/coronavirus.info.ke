import React, { Component } from 'react';

import PasswordChange from '../../components/PasswordChange';

import { withAuthorization } from '../../session';

class Account extends Component {
  render() {
    return(
      <React.Fragment>
        <h1>Account</h1>
        <PasswordChange />
        <p>This page is only accessible to logged in users.</p>
      </React.Fragment>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);
