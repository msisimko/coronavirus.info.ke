import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../firebase';

import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  isLoading: true,
  error: null,
};

class VerifyEmail extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const { actionCode } = this.props;

    this.props.firebase
      .doApplyActionCode(actionCode)
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
        <h1>Verify Email</h1>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <React.Fragment>
            {error ? (
              <p>{error.message}</p>
            ) : (
              <p>Your email has been verified.</p>
            )}
          </React.Fragment>
        )}

        <Link to={ROUTES.LANDING}>Continue</Link>
      </React.Fragment>
    );
  }
}

export default withFirebase(VerifyEmail);
