import React, { Component } from 'react';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import { compose } from 'recompose';

import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import { withFirebase } from '../../firebase';

import { AuthUserContext } from '../../session';

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
  passwordOne: '',
  passwordTwo: '',
  success: null,
  error: null,
};

class ResetPasswordBase extends Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);

    this.state = { isLoading: true, ...INITIAL_STATE };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    let authUser = this.context;
    
    if (authUser) {
      // If signed in, redirect to Home
      this.props.history.push(ROUTES.HOME);
    } else {
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
    const { classes } = this.props;

    const { isLoading, passwordOne, passwordTwo, success, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || 
                      passwordOne === '';

    const isSuccess = success !== null;

    const isError = error !== null;

    const isDisabled = isInvalid || isSuccess || isError;

    return(
      <React.Fragment>
        <Container maxWidth="sm">
          <Box py={3}>
            <Paper elevation={0}>
              <Box px={3} pt={3}>
                <Typography align="center" variant="h4">    
                  <strong>Password Reset</strong>
                </Typography>
              </Box>

              {isLoading ? (
                <Box p={3}>
                  <LinearProgress color="primary" />
                </Box>
              ) : (
                <Box p={3}>
                  <form className={classes.form} onSubmit={this.onSubmit}>
                    <TextField
                      error={isError}
                      fullWidth
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
                      Change Password
                    </Button>
                  </form>
                </Box>
              )}
            </Paper>
          </Box>
        </Container>

        {success &&
          <Snackbar open={isSuccess} autoHideDuration={6000} onClose={this.handleClose}>
            <Alert elevation={6} variant="filled" onClose={this.handleClose} severity="success">
              {success.message} <Link component={RouterLink} to={ROUTES.SIGN_IN}>Sign In</Link>
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

const ResetPassword = compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  withFirebase,
)(ResetPasswordBase);

export default ResetPassword;
