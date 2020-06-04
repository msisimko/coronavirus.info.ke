import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

class PasswordForgetLink extends Component {
  render() {
    return(
      <p><Link to={ROUTES.PASSWORD_FORGET}>Forgot password?</Link></p>
    );
  }
}

export default PasswordForgetLink;
