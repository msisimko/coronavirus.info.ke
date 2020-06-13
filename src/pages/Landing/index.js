import React, { Component } from 'react';

import { AuthUserContext } from '../../session';

import * as ROUTES from '../../constants/routes';

class Landing extends Component {
  static contextType = AuthUserContext;
  
  componentDidMount() {
    let authUser = this.context;
    // if signed in, redirect to HOME page
    authUser && this.props.history.push(ROUTES.HOME);
  }

  render() {
    return(
      <React.Fragment>
        <h1>Landing</h1>
      </React.Fragment>
    );
  }
}

export default Landing;
