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
  healthWorkersTotal: '', 
  healthWorkersMale: '',
  healthWorkersFemale: '',
  healthWorkersDead: '',
  disabled: true,
}

class StepFiveBase extends Component {
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
        let draft = doc.data().step5;

        this.setState({ 
          healthWorkersTotal: draft.healthWorkersTotal ? draft.healthWorkersTotal : '',
          healthWorkersMale: draft.healthWorkersMale ? draft.healthWorkersMale : '',
          healthWorkersFemale: draft.healthWorkersFemale ? draft.healthWorkersFemale : '',
          healthWorkersDead: draft.healthWorkersDead ? draft.healthWorkersDead : '',
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

    const { healthWorkersTotal, healthWorkersMale, healthWorkersFemale, healthWorkersDead } = this.state;
    
    this.props.firebase
      .draft(id)
      .set({
        step5: {
          healthWorkersTotal: parseFloat(healthWorkersTotal),
          healthWorkersMale: parseFloat(healthWorkersMale),
          healthWorkersFemale: parseFloat(healthWorkersFemale),
          healthWorkersDead: parseFloat(healthWorkersDead),
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

    const { healthWorkersTotal, healthWorkersMale, healthWorkersFemale, healthWorkersDead, disabled } = this.state;

    return(
      <Grid item xs={12}>
        <form className={classes.form} onSubmit={(e) => this.onSubmit(e)}>

          <Box color="primary.main">
            <Typography variant="h6" align="center" gutterBottom>
              <strong>Health Workers</strong>
            </Typography>
          </Box>

          <Separator />

          <Typography variant="body2" gutterBottom>
            <strong>Total Infected</strong>
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <NumberFormat
                fullWidth
                id="healthWorkersTotal"
                label="Total Health Workers Infected"
                margin="normal"
                name="healthWorkersTotal"
                value={healthWorkersTotal}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'healthWorkersTotal',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumberFormat
                fullWidth
                id="healthWorkersMale"
                label="Male"
                margin="normal"
                name="healthWorkersMale"
                value={healthWorkersMale}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'healthWorkersMale',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumberFormat
                fullWidth
                id="healthWorkersFemale"
                label="Female"
                margin="normal"
                name="healthWorkersFemale"
                value={healthWorkersFemale}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'healthWorkersFemale',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
          </Grid>

          <Separator />

          <Typography variant="body2" gutterBottom>
            <strong>Total Deaths</strong>
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <NumberFormat
                fullWidth
                id="healthWorkersDead"
                label="Total Health Workers Dead"
                margin="normal"
                name="healthWorkersDead"
                value={healthWorkersDead}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'healthWorkersDead',
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
          <Typography variant="body2" gutterBottom>Step 5</Typography>
        </Box>

        <Box p={1} textAlign="center" color="text.disabled" fontWeight="fontWeightBold">
          <Typography variant="body2" gutterBottom><strong>{id}</strong></Typography>
        </Box>
      </Grid>
    );
  }
}

const StepFive = compose(
  withStyles(styles, { withTheme: true }),
  withSnackbar,
  withFirebase,
)(StepFiveBase);

export default StepFive;
