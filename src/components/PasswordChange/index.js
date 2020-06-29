import React, { Component } from 'react';

import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
 
import { withFirebase } from '../../firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  success: null,
  error: null,
};

class PasswordChange extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = event => {
    const { passwordOne } = this.state;
 
    this.props.firebase
      .doUpdatePassword(passwordOne)
      .then(() => {
        let success = { code: 200, message: "Your password has been updated." };
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
    const { passwordOne, passwordTwo, success, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo ||
                      passwordOne === '';

    const isSuccess = success !== null;

    const isError = error !== null;

    const isDisabled = isInvalid || isSuccess || isError;
 
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <input name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="New Password" />
          <input name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" placeholder="Confirm New Password" />
          <button disabled={isDisabled} type="submit">Reset My Password</button>
        </form>

        {success &&
          <Snackbar open={isSuccess} autoHideDuration={6000} onClose={this.handleClose}>
            <Alert elevation={6} variant="filled" onClose={this.handleClose} severity="success">
              {success.message}
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
    );
  }
}
 
export default withFirebase(PasswordChange);
