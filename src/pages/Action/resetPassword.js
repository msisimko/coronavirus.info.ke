import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';

import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import { withFirebase } from '../../firebase';

import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  success: null,
  error: null,
};

class ResetPasswordBase extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: true, ...INITIAL_STATE };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { actionCode } = this.props;

    this.props.firebase
      .doVerifyPasswordResetCode(actionCode)
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ error });
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

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ ...INITIAL_STATE });
  }

  render() {
    const { isLoading, passwordOne, passwordTwo, success, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || 
                      passwordOne === '';

    const isSuccess = success !== null;

    const isError = error !== null;

    const isDisabled = isInvalid || isSuccess || isError;

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
              <button disabled={isDisabled} type="submit">Change Password</button>
            </form>
            
            {success &&
              <Snackbar open={isSuccess} autoHideDuration={6000} onClose={this.handleClose}>
                <Alert elevation={6} variant="filled" onClose={this.handleClose} severity="success">
                  {success.message} <Link to={ROUTES.SIGN_IN}>Sign In</Link>
                </Alert>
              </Snackbar>
            }
    
            {error &&
              <Snackbar open={isError} autoHideDuration={6000} onClose={this.handleClose}>
                <Alert elevation={6} variant="filled" onClose={this.handleClose} severity="error">
                  {error.message}
                </Alert>
              </Snackbar>
            }
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
