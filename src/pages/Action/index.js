import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import mode specific components
import RecoverEmail from './recoverEmail';
import ResetPassword from './resetPassword';
import VerifyEmail from './verifyEmail';

import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  mode: null,
  oobCode: null,
};

class Action extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);

    this.setState({
      mode: query.get('mode'),
      oobCode: query.get('oobCode'),
    });
  }

  render() {
    const { mode, oobCode } = this.state;

    switch (mode) {
      case 'recoverEmail':
        return <RecoverEmail actionCode={oobCode} />;
      case 'resetPassword':
        return <ResetPassword actionCode={oobCode} />;
      case 'verifyEmail':
        return <VerifyEmail actionCode={oobCode} />;
      default:
        return(
          <React.Fragment>
            <h1>Action</h1>
            <p>Invalid action.</p>
            <Link to={ROUTES.LANDING}>Continue</Link>
          </React.Fragment>
        );
    }
  }
}

export default Action;
