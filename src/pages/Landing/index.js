import React, { Component } from 'react';

import { withFirebase } from '../../firebase';

import * as ROUTES from '../../constants/routes';

class Landing extends Component {
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
        <h1>Landing</h1>
      </React.Fragment>
    );
  }
}

export default withFirebase(Landing);
