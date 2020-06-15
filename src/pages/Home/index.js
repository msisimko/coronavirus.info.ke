import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../../session';

class HomeBase extends Component {
  render() {
    return(
      <React.Fragment>
        <h1>Home</h1>
        <p>This page is only accessible to logged in users.</p>
      </React.Fragment>
    );
  }
}

const condition = authUser => !!authUser;

const Home = compose(
  withAuthorization(condition),
  withEmailVerification,
)(HomeBase);

export default Home;
