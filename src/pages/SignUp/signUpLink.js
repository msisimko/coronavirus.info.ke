import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

class SignUpLink extends React.Component {
  render() {
    return(
      <p>Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link></p>
    );
  }
}

export default SignUpLink;
