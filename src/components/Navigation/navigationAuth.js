import React, { Component } from 'react';
import { 
  Link // renders <a> tag with href
} from 'react-router-dom';

import SignOut from '../SignOut';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

class NavigationAuth extends Component {
  render() {
    const { authUser } = this.props;

    return(
      <ul>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        {!!authUser.roles[ROLES.ADMINISTRATOR] && (
          <li>
            <Link to={ROUTES.ADMINISTRATOR}>Administrator</Link>
          </li>
        )}
        <li>
          <SignOut />
        </li>
      </ul>
    );
  }
}

export default NavigationAuth;
