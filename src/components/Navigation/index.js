import React, { Component } from 'react';

import NavigationAuth from './navigationAuth';
import NavigationNonAuth from './navigationNonAuth';

import { AuthUserContext } from '../../session';

class Navigation extends Component {
  render() {
    return(
      <AuthUserContext.Consumer>
        {authUser => 
          authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
        }
      </AuthUserContext.Consumer>
    );
  }
}

export default Navigation;

export { NavigationAuth, NavigationNonAuth };
