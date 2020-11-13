import React, { Component } from 'react';
import { compose } from 'recompose';

import Separator from '../../../components/Separator';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import SaveIcon from '@material-ui/icons/Save';

import { withSnackbar } from 'notistack';

import NumberFormat from 'react-number-format';
 
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
  deathsNew: '', 
  deathsTotal: '',
  disabled: true,
}

class StepFourBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };

    this.onChange = this.onChange.bind(this);
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
        let draft = doc.data().step4;

        this.setState({ 
          deathsNew: draft.deathsNew ? draft.deathsNew : '',
          deathsTotal: draft.deathsTotal ? draft.deathsTotal : '',
          disabled: false,
          });
      });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    const { id, enqueueSnackbar } = this.props;

    this.setState({ disabled: true });

    const { deathsNew, deathsTotal } = this.state;
    
    this.props.firebase
      .draft(id)
      .set({
        step4: {
          deathsNew: parseFloat(deathsNew),
          deathsTotal: parseFloat(deathsTotal),
        },
      }, { merge: true })
      .then(() => {
        enqueueSnackbar("Form data has been successfully saved.", { variant: 'success', onClose: this.handleSuccess });
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

    this.setState({ disabled: false });
  }

  handleError(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ disabled: false });
  }

  render() {
    const { classes, id } = this.props;

    const { deathsNew, deathsTotal, disabled } = this.state;

    return(
      <Grid item xs={12}>
        <form className={classes.form} onSubmit={(e) => this.onSubmit(e)}>

          <Box color="primary.main">
            <Typography variant="h6" align="center" gutterBottom>
              <strong>Deaths</strong>
            </Typography>
          </Box>

          <Separator />

          <Typography variant="body2" gutterBottom>
            <strong>Last 24 Hours</strong>
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <NumberFormat
                fullWidth
                id="deathsNew"
                label="New Deaths"
                margin="normal"
                name="deathsNew"
                required
                value={deathsNew}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'deathsNew',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
          </Grid>

          <Separator />

          <Typography variant="body2" gutterBottom>
            <strong>Cummulative</strong>
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <NumberFormat
                fullWidth
                id="deathsTotal"
                label="Total Deaths"
                margin="normal"
                name="deathsTotal"
                required
                value={deathsTotal}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'deathsTotal',
                      value: values.value,
                    },
                  });
                }}
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
            disabled={disabled}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>

        </form>

        <Separator />

        <Box p={1} textAlign="center" color="text.disabled">
          <Typography variant="body2" gutterBottom>Step 4</Typography>
        </Box>

        <Box p={1} textAlign="center" color="text.disabled" fontWeight="fontWeightBold">
          <Typography variant="body2" gutterBottom><strong>{id}</strong></Typography>
        </Box>
      </Grid>
    );
  }
}

const StepFour = compose(
  withStyles(styles, { withTheme: true }),
  withSnackbar,
  withFirebase,
)(StepFourBase);

export default StepFour;