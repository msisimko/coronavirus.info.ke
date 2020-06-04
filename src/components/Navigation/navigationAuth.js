import React, { Component } from 'react';
import { 
  Link // renders <a> tag with href
} from 'react-router-dom';

import SignOut from '../SignOut';

import * as ROUTES from '../../constants/routes';

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

export default NavigationAuth;
