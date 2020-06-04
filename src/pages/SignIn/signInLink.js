import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

class SignInLink extends Component {
  render() {
    return(
      <p>Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link></p>
    );
  }
}

export default SignInLink;
