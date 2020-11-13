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
  recoveriesNew: '',
  recoveriesFromHomeBasedCare: '',
  recoveriesFromHealthFacilities: '',
  recoveriesTotal: '',
  disabled: true,
}

class StepThreeBase extends Component {
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
        let draft = doc.data().step3;

        this.setState({ 
          recoveriesNew: draft.recoveriesNew ? draft.recoveriesNew : '',
          recoveriesFromHomeBasedCare: draft.recoveriesFromHomeBasedCare ? draft.recoveriesFromHomeBasedCare : '',
          recoveriesFromHealthFacilities: draft.recoveriesFromHealthFacilities ? draft.recoveriesFromHealthFacilities : '',
          recoveriesTotal: draft.recoveriesTotal ? draft.recoveriesTotal : '',
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

    const { recoveriesNew, recoveriesFromHomeBasedCare, recoveriesFromHealthFacilities, recoveriesTotal } = this.state;
    
    this.props.firebase
      .draft(id)
      .set({
        step3: {
          recoveriesNew: parseFloat(recoveriesNew),
          recoveriesFromHomeBasedCare: parseFloat(recoveriesFromHomeBasedCare),
          recoveriesFromHealthFacilities: parseFloat(recoveriesFromHealthFacilities),
          recoveriesTotal: parseFloat(recoveriesTotal),
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

    const { recoveriesNew, recoveriesFromHomeBasedCare, recoveriesFromHealthFacilities, recoveriesTotal, disabled } = this.state;

    return(
      <Grid item xs={12}>
        <form className={classes.form} onSubmit={(e) => this.onSubmit(e)}>

          <Box color="primary.main">
            <Typography variant="h6" align="center" gutterBottom>
              <strong>Recoveries</strong>
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
                id="recoveriesNew"
                label="New Recoveries"
                margin="normal"
                name="recoveriesNew"
                required
                value={recoveriesNew}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'recoveriesNew',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumberFormat
                fullWidth
                id="recoveriesFromHomeBasedCare"
                label="Home-Based Care"
                margin="normal"
                name="recoveriesFromHomeBasedCare"
                value={recoveriesFromHomeBasedCare}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'recoveriesFromHomeBasedCare',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumberFormat
                fullWidth
                id="recoveriesFromHealthFacilities"
                label="Health Facilities"
                margin="normal"
                name="recoveriesFromHealthFacilities"
                value={recoveriesFromHealthFacilities}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'recoveriesFromHealthFacilities',
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
                id="recoveriesTotal"
                label="Total Recoveries"
                margin="normal"
                name="recoveriesTotal"
                required
                value={recoveriesTotal}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'recoveriesTotal',
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
          <Typography variant="body2" gutterBottom>Step 3</Typography>
        </Box>

        <Box p={1} textAlign="center" color="text.disabled" fontWeight="fontWeightBold">
          <Typography variant="body2" gutterBottom><strong>{id}</strong></Typography>
        </Box>
      </Grid>
    );
  }
}

const StepThree = compose(
  withStyles(styles, { withTheme: true }),
  withSnackbar,
  withFirebase,
)(StepThreeBase);

export default StepThree;