import React, { Component } from 'react';

import PasswordChange from '../../components/PasswordChange';

class Account extends Component {
  render() {
    return(
      <React.Fragment>
        <h1>Account</h1>
        <PasswordChange />
      </React.Fragment>
    );
  }
}

export default Account;
