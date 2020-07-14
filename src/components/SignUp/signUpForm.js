import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

import { withFirebase } from '../../firebase';

import * as ROUTES from '../../constants/routes';

const styles = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const INITIAL_STATE = {
  displayName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
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
    const { displayName, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        return this.props.firebase.auth.currentUser
                .updateProfile({
                  displayName,
                });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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

    const { displayName, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid = displayName === '' ||
                      email === '' ||
                      passwordOne !== passwordTwo ||
                      passwordOne === '';

    const isError = error !== null;

    const isDisabled = isInvalid || isError;

    return (
      <React.Fragment>
        <form className={classes.form} onSubmit={this.onSubmit}>
          <TextField
            error={isError}
            fullWidth
            id="displayName"
            label="Display Name"
            margin="normal"
            name="displayName"
            onChange={this.onChange}
            required
            value={displayName}
            variant="filled"
          />
          <TextField
            error={isError}
            fullWidth
            id="email"
            helperText="You'll need to confirm that this email belongs to you."
            label="Email Address"
            margin="normal"
            name="email"
            onChange={this.onChange}
            required
            value={email}
            variant="filled"
          />
          <TextField
            error={isError}
            fullWidth
            id="passwordOne"
            helperText="Use 6 or more characters with a mix of letters, numbers &amp; symbols."
            label="Password"
            margin="normal"
            name="passwordOne"
            onChange={this.onChange}
            required
            type="password"
            value={passwordOne}
            variant="filled"
          />
          <TextField
            error={isError}
            fullWidth
            id="passwordTwo"
            label="Confirm Password"
            margin="normal"
            name="passwordTwo"
            onChange={this.onChange}
            required
            type="password"
            value={passwordTwo}
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
            Sign Up
          </Button>
        </form>

        {error &&
          <Snackbar autoHideDuration={3000} onClose={this.handleClose} open={isError}>
            <Alert elevation={6} onClose={this.handleClose} severity="error" variant="filled">
              {error.message}
            </Alert>
          </Snackbar>
        }
      </React.Fragment>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  withFirebase,
)(SignUpFormBase);

export default SignUpForm;
