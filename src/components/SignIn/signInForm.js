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
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
 
  onSubmit = event => {
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
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

    this.setState({  ...INITIAL_STATE  });
  }
 
  render() {
    const { classes } = this.props;

    const { email, password, error } = this.state;
    
    const isInvalid = email === '' ||
                      password === '';

    const isError = error !== null;

    const isDisabled = isInvalid || isError;
 
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
          <TextField
            error={isError}
            fullWidth
            id="password"
            label="Password"
            margin="normal"
            name="password"
            onChange={this.onChange}
            required
            type="password"
            value={password}
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
            Sign In
          </Button>
        </form>

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

const SignInForm = compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  withFirebase,
)(SignInFormBase);
 
export default SignInForm;
