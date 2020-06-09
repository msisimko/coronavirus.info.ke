import React, { Component } from 'react';

import { withAuthorization } from '../../session';

class Administrator extends Component {
  render() {
    return(
      <React.Fragment>
        <h1>Administrator</h1>
        <p>This page is only accessible to logged in users.</p>
      </React.Fragment>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Administrator);
