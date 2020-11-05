import React, { Component } from 'react';
import { compose } from 'recompose';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

import { withSnackbar } from 'notistack';
 
import { withFirebase } from '../../../firebase';

import { AuthUserContext } from '../../../session';

const styles = theme => ({
  form: {
    width: '100%', // Fix IE 11 issue
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const INITIAL_STATE = {
  sourceName: '',
  disabled: false,
}

class AddSourceBase extends Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleError = this.handleError.bind(this);
  }
 
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    const { enqueueSnackbar } = this.props;

    const { sourceName } = this.state;

    const authUser = this.context;

    this.setState({ disabled: true });
 
    this.props.firebase
      .sources()
      .add({
        sourceName,
        createdOn: this.props.firebase.getServerTimestamp(),
        createdBy: authUser.uid,
        createdByName: authUser.displayName,
      })
      .then(() => {
        enqueueSnackbar(`${sourceName} has been successfully added as a source.`, { variant: 'success', onClose: this.handleSuccess });
      })
      .catch(error => {
        enqueueSnackbar(error.message, { variant: 'error', onClose: this.handleError });
      });
    
    event.preventDefault();
  }

  handleSuccess(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ ...INITIAL_STATE });
  }

  handleError(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ disabled: false });
  }

  render() {
    const { classes } = this.props;

    const { sourceName, disabled } = this.state;

    const disableButton = sourceName === '';

    return(
      <form className={classes.form} onSubmit={(e) => this.onSubmit(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="sourceName"
              helperText="Make sure you confirm existing sources before adding a source that may already exist."
              label="Source Name"
              margin="normal"
              name="sourceName"
              onChange={(e) => this.onChange(e)}
              required
              value={sourceName}
              variant="filled"
              disabled={disabled}
            />
            </Grid>
          </Grid>
          
          <Button
            className={classes.submit}
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={disabled || disableButton}
          >
            Add Source
          </Button>
      </form>
    );
  }
}

const AddSource = compose(
  withStyles(styles, { withTheme: true }),
  withSnackbar,
  withFirebase,
)(AddSourceBase);

export default AddSource;
