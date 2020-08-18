import React, { Component } from 'react';
import { compose } from 'recompose';

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
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
  passwordOne: '',
  passwordTwo: '',
  success: null,
  error: null,
};

class UpdatePasswordBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
 
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
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

    const { passwordOne, passwordTwo, success, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo ||
                      passwordOne === '';

    const isSuccess = success !== null;

    const isError = error !== null;

    const isDisabled = isInvalid || isSuccess || isError;
 
    return (
      <React.Fragment>
        <Typography align="center" variant="h4" gutterBottom>    
          <strong>Password</strong>
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
            onChange={(e) => this.onChange(e)}
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
            Update My Password
          </Button>
        </form>

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

const UpdatePassword = compose(
  withStyles(styles, { withTheme: true }),
  withFirebase,
)(UpdatePasswordBase);
 
export default withFirebase(UpdatePassword);
