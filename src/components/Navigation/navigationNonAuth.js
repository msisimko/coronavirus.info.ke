import React, { Component } from 'react';
import { 
  Link // renders <a> tag with href
} from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

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

export default NavigationNonAuth;
