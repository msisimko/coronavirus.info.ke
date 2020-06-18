import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../firebase';

import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  isLoading: true,
  error: null,
};

class RecoverEmail extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const { actionCode } = this.props;

    this.props.firebase
      .doCheckActionCode(actionCode)
      .then(() => {
        return this.props.firebase.doApplyActionCode(actionCode);
      })
      .catch(error => {
        this.setState({ error });
      })
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { isLoading, error } = this.state;

    return(
      <React.Fragment>
        <h1>Recover Email</h1>
        
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <React.Fragment>
            {error ? (
              <p>{error.message}</p>
            ) : (
              <React.Fragment>
                <p>The request to change your email address has been successfully revoked.</p>
                <p>Please change your password if you suspect that your account has been compromised.</p>
              </React.Fragment>
            )}
          </React.Fragment>
        )}

        <Link to={ROUTES.LANDING}>Continue</Link>
      </React.Fragment>
    );
  }
}

export default withFirebase(RecoverEmail);
