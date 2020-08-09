import React, { Component } from 'react';
import { compose } from 'recompose';

import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
 
import { withFirebase } from '../../../firebase';

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
  success: null,
  error: null,
};

class UpdateProfileBase extends Component {
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
    const { displayName } = this.state;
 
    this.props.firebase
      .doUpdateProfile(displayName)
      .then(() => {
        let success = { code: 200, message: "Your profile has been updated." };
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

    const { error } = this.state;
    // IF error, only clear error, ELSE, reset to initial state
    error ? this.setState({ error: null }) : this.setState({ ...INITIAL_STATE });
  }

  render() {
    const { classes } = this.props;

    const { displayName, success, error } = this.state;
 
    const isInvalid = displayName === '';

    const isSuccess = success !== null;

    const isError = error !== null;

    const isDisabled = isInvalid || isSuccess || isError;
 
    return (
      <React.Fragment>
        <Paper elevation={0}>
          <Box p={3}>
            <Typography align="center" variant="h4" gutterBottom>    
              <strong>Profile</strong>
            </Typography>

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
              <Button
                className={classes.submit}
                color="primary"
                disabled={isDisabled}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Update My Profile
              </Button>
            </form>
          </Box>
        </Paper>

        {success &&
          <Snackbar open={isSuccess} autoHideDuration={2500} onClose={this.handleClose}>
            <Alert elevation={6} variant="filled" onClose={this.handleClose} severity="success">
              {success.message}
            </Alert>
          </Snackbar>
        }

        {error &&
          <Snackbar open={isError} autoHideDuration={2500} onClose={this.handleClose}>
            <Alert elevation={6} variant="filled" onClose={this.handleClose} severity="error">
              {error.message}
            </Alert>
          </Snackbar>
        }
      </React.Fragment>
    );
  }
}

const UpdateProfile = compose(
  withStyles(styles, { withTheme: true }),
  withFirebase,
)(UpdateProfileBase);
 
export default UpdateProfile;
