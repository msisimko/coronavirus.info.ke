import React, { Component } from 'react';
import { compose } from 'recompose';

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

import { withFirebase } from '../../firebase';

const styles = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const INITIAL_STATE = {
  email: '',
  success: null,
  error: null,
};

class PasswordForgetFormBase extends Component {
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
    const { classes } = this.props;
    
    const { email, success, error } = this.state;

    const isInvalid = email === '';

    const isSuccess = success !== null;

    const isError = error !== null;

    const isDisabled = isInvalid || isSuccess || isError;
  
    return (
      <React.Fragment>
        <form className={classes.form} onSubmit={this.onSubmit}>
          <TextField
            error={isError}
            fullWidth
            id="email"
            label="Email Address"
            margin="normal"
            name="email"
            onChange={this.onChange}
            required
            value={email}
            variant="filled"
          />
          <Button
            className={classes.submit}
            color="primary"
            disabled={isDisabled}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Reset My Password
          </Button>
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

const PasswordForgetForm = compose(
  withStyles(styles, { withTheme: true }),
  withFirebase,
)(PasswordForgetFormBase);
 
export default PasswordForgetForm;
