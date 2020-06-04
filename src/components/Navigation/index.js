import React, { Component } from 'react';
import { 
  Link // renders <a> tag with href
} from 'react-router-dom';

import SignOut from '../SignOut';

import * as ROUTES from '../../constants/routes';

class Navigation extends Component {
  render() {
    const { authUser } = this.props;

    return(
      <div>
        {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
      </div>
    );
  }
}

class NavigationAuth extends Component {
  render() {
    return(
      <ul>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
          <SignOut />
        </li>
      </ul>
    );
  }
}

class NavigationNonAuth extends Component {
  render() {
    return(
      <ul>
        <li>
          <Link to={ROUTES.LANDING}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
      </ul>
    );
  }
}

export default Navigation;
