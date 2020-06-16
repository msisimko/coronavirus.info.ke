import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../../session';

import * as ROLES from '../../constants/roles';

class AdministratorBase extends Component {
  render() {
    return(
      <React.Fragment>
        <h1>Administrator</h1>
        <p>This page is only accessible to logged in administrators.</p>
      </React.Fragment>
    );
  }
}

const condition = authUser => 
  authUser && !!authUser.roles[ROLES.ADMINISTRATOR];

const Administrator = compose(
  withAuthorization(condition),
  withEmailVerification,
)(AdministratorBase);

export default Administrator;
