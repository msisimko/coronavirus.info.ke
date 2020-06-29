import React, { Component } from 'react';

import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import { withFirebase } from '../../firebase';

const INITIAL_STATE = {
  email: '',
  success: null,
  error: null,
};

class PasswordForgetForm extends Component {
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
    const { email } = this.state;
  
    this.props.firebase
      .doSendPasswordResetEmail(email)
      .then(() => {
        let success = { code: 200, message: "Please check your inbox for a password reset email." };
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
    const { email, success, error } = this.state;

    const isInvalid = email === '';

    const isSuccess = success !== null;

    const isError = error !== null;

    const isDisabled = isInvalid || isSuccess || isError;
  
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
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
 
export default withFirebase(PasswordForgetForm);
