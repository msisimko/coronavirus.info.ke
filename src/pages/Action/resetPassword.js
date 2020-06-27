import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../firebase';

import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  isLoading: true,
  passwordOne: '',
  passwordTwo: '',
  success: null,
  error: null,
};

class ResetPasswordBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { actionCode } = this.props;

    this.props.firebase
      .doVerifyPasswordResetCode(actionCode)
      .catch(error => {
        this.setState({ error });
      })
      .then(() => {
        this.setState({ isLoading: false });
      });
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = event => {
    const { actionCode } = this.props;

    const { passwordOne } = this.state;

    this.props.firebase
      .doConfirmPasswordReset(actionCode, passwordOne)
      .then(() => {
        let success = { code: 200, message: "Your password has successfully been changed." };
        this.setState({ success });
      })
      .catch(error => {
        this.setState({ error });
      });
    
    event.preventDefault();
  }

  render() {
    const { isLoading, passwordOne, passwordTwo, success, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || 
                      passwordOne === '';

    return(
      <React.Fragment>
        <h1>Reset Password</h1>

        {isLoading ? (
          <p>Loading  ...</p>
        ) : (
          <React.Fragment>
            <form onSubmit={this.onSubmit}>
              <input name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="Password" />
              <input name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" placeholder="Confirm Password" />
              <button disabled={isInvalid} type="submit">Change Password</button>
            </form>
            
            {success && (
              <React.Fragment>
                <p>{success.message}</p>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
              </React.Fragment>
            )}
            
            {error && error.message}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const ResetPassword = compose(
  withRouter,
  withFirebase,
)(ResetPasswordBase);

export default ResetPassword;
