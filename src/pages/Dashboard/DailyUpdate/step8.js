import React, { Component } from 'react';
import { compose } from 'recompose';

import Separator from '../../../components/Separator';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import { withSnackbar } from 'notistack';
 
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
  confirmation: false,
  disabled: true,
}

class StepEightBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      ...INITIAL_STATE,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  
  componentDidMount() {
    const { id } = this.props;

    // Get data to prefill form, if exists
    this.props.firebase
      .draft(id)
      .get()
      .then((doc) => {
        let draft = doc.data().step8;

        this.setState({
          confirmation: draft.confirmation ? draft.confirmation : false,
          disabled: draft.confirmation ? true : false,
          });
      });
  }

  onSubmit(event) {
    const { id, enqueueSnackbar } = this.props;

    this.setState({ disabled: true });
    
    this.props.firebase
      .draft(id)
      .set({
        step8: {
          confirmation: true,
      },
      }, { merge: true })
      .then(() => {
        enqueueSnackbar("Confirmation successfully submitted.", { variant: 'success', onClose: this.handleSuccess });
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

    this.setState({ disabled: true });
  }

  handleError(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ disabled: false });
  }

  render() {
    const { classes, id } = this.props;

    const { confirmation, disabled } = this.state;

    return(
      <Grid item xs={12}>
        <form className={classes.form} onSubmit={(e) => this.onSubmit(e)}>

          <Box borderRadius={8} bgcolor="warning.main" color="warning.contrastText" textAlign="center" py={8} px={2}>
            <Typography variant="h3" gutterBottom>
              <strong>Confirm &amp; Submit</strong>
            </Typography>

            {confirmation ? (
              <Typography variant="body2" gutterBottom>
                You have confirmed that the data you have provided is accurate, complete &amp; with integrity.
              </Typography>
            ) : (
              <Typography variant="body2" gutterBottom>
                By clicking on <strong>Confirm</strong> below, you are agreeing that the data you have provided is accurate, complete &amp; with integrity.
              </Typography>
            )}
            
          </Box>

          <Button
            className={classes.submit}
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={disabled}
          >
            Confirm
          </Button>

        </form>

        <Separator />

        <Box p={1} textAlign="center" color="text.disabled">
          <Typography variant="body2" gutterBottom>Step 8</Typography>
        </Box>

        <Box p={1} textAlign="center" color="text.disabled" fontWeight="fontWeightBold">
          <Typography variant="body2" gutterBottom><strong>{id}</strong></Typography>
        </Box>
      </Grid>
    );
  }
}

const StepEight = compose(
  withStyles(styles, { withTheme: true }),
  withSnackbar,
  withFirebase,
)(StepEightBase);

export default StepEight;