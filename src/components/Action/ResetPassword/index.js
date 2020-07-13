import React, { Component } from 'react';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import { compose } from 'recompose';

import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import { withFirebase } from '../../../firebase';

import * as ROUTES from '../../../constants/routes';

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
  loadingError: null,
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
      .catch(loadingError => {
        this.setState({ loadingError });
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
        let success = { code: 200, message: "Your password has been reset." };
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

    const { isLoading, passwordOne, passwordTwo, success, loadingError, error } = this.state;

    const isLoaded = !isLoading && !loadingError;

    const isInvalid = passwordOne !== passwordTwo || 
                      passwordOne === '';

    const isSuccess = success !== null;

    const isError = error !== null;

    const isDisabled = isInvalid || isSuccess || isError;

    return(
      <Container maxWidth="sm">
        <Box pt={2}>
          <Paper elevation={0}>
            <Box p={3}>
              <Typography align="center" variant="h4" gutterBottom>    
                <strong>Password Reset</strong>
              </Typography>
            
              {isLoading &&
                <LinearProgress color="primary" />
              }

              {loadingError &&
                <Typography align="center" variant="body2" gutterBottom>
                  {loadingError.message}
                </Typography>
              }

              {isLoaded &&
                <form className={classes.form} onSubmit={this.onSubmit}>
                  <TextField
                    error={isError}
                    fullWidth
                    id="passwordOne"
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
                    Change Password
                  </Button>
                </form>
              }
            </Box>
          </Paper>
        </Box>

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
            
        {isSuccess &&
          <Box pt={2}>
            <Paper elevation={0}>
              <Box p={3}>
                <Button fullWidth size="large" color="primary" component={RouterLink} to={ROUTES.LANDING}>
                  Continue
                </Button>
              </Box>
            </Paper>
          </Box>
        }
      </Container>
    );
  }
}

const ResetPassword = compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  withFirebase,
)(ResetPasswordBase);

export default ResetPassword;
