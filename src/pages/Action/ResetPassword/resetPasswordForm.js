import React, { Component } from 'react';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import { compose } from 'recompose';

import Separator from '../../../components/Separator';

import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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
  success: null,
  error: null,
  successful: true,
};

class ResetPasswordFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  
  componentDidMount () {
    this.setState({ successful: false });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    const { actionCode } = this.props;

    const { passwordOne } = this.state;

    this.props.firebase
      .doConfirmPasswordReset(actionCode, passwordOne)
      .then(() => {
        const success = { code: 200, message: "Your password has been reset." };
        this.setState({ success });
      })
      .catch(error => {
        this.setState({ error });
      });
    
    event.preventDefault();
  }

  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    const { error } = this.state;
    // IF error, only clear error, ELSE, reset to initial state
    error ? this.setState({ error: null }) : this.setState({ ...INITIAL_STATE });
  }
  
  render() {
    const { classes } = this.props;

    const { passwordOne, passwordTwo, success, error, successful } = this.state;

    const isInvalid = passwordOne !== passwordTwo || 
                      passwordOne === '';

    const isSuccess = success !== null;

    const isError = error !== null;

    const isDisabled = isInvalid || isSuccess || isError;

    return(
      <React.Fragment>
        <Paper elevation={0} square>
          <Box p={3}>
            <Typography align="center" variant="h4" gutterBottom>    
              <strong>Password Reset</strong>
            </Typography>

            <form className={classes.form} onSubmit={(e) => this.onSubmit(e)}>
              <TextField
                error={isError}
                fullWidth
                id="passwordOne"
                label="Password"
                margin="normal"
                name="passwordOne"
                onChange={(e) => this.onChange(e)}
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
          </Box>
        </Paper>
        
        <Separator show={successful} />

        {/* Show continue button if password update is successful */}
        {successful &&
          <Paper elevation={0} square>
            <Box p={3}>
              <Button fullWidth size="large" color="primary" component={RouterLink} to={ROUTES.LANDING}>
                Continue
              </Button>
            </Box>
          </Paper>
        }

        {success &&
          <Snackbar open={isSuccess} autoHideDuration={2500} onClose={(e,r) => this.handleClose(e,r)}>
            <Alert elevation={6} variant="filled" onClose={(e,r) => this.handleClose(e,r)} severity="success">
              {success.message}
            </Alert>
          </Snackbar>
        }

        {error &&
          <Snackbar open={isError} autoHideDuration={2500} onClose={(e,r) => this.handleClose(e,r)}>
            <Alert elevation={6} variant="filled" onClose={(e,r) => this.handleClose(e,r)} severity="error">
              {error.message}
            </Alert>
          </Snackbar>
        }
      </React.Fragment>
    );
  }
}

const ResetPasswordForm = compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  withFirebase,
)(ResetPasswordFormBase);

export default ResetPasswordForm;
