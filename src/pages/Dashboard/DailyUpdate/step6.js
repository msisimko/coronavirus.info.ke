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
  admissionsHealthFacilities: '', 
  admissionsHomeBasedCare: '', 
  icuTotal: '', 
  icuVentilatorySupport: '', 
  icuSupplementalOxygen: '', 
  supplementalOxygenTotal: '', 
  supplementalOxygenGeneralWards: '', 
  supplementalOxygenHdu: '',
  disabled: true,
}

class StepSixBase extends Component {
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
        let draft = doc.data().step6;

        this.setState({ 
          admissionsHealthFacilities: draft.admissionsHealthFacilities ? draft.admissionsHealthFacilities : '',
          admissionsHomeBasedCare: draft.admissionsHomeBasedCare ? draft.admissionsHomeBasedCare : '',
          icuTotal: draft.icuTotal ? draft.icuTotal : '',
          icuVentilatorySupport: draft.icuVentilatorySupport ? draft.icuVentilatorySupport : '',
          icuSupplementalOxygen: draft.icuSupplementalOxygen ? draft.icuSupplementalOxygen : '',
          supplementalOxygenTotal: draft.supplementalOxygenTotal ? draft.supplementalOxygenTotal : '',
          supplementalOxygenGeneralWards: draft.supplementalOxygenGeneralWards ? draft.supplementalOxygenGeneralWards : '',
          supplementalOxygenHdu: draft.supplementalOxygenHdu ? draft.supplementalOxygenHdu : '',
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

    const { admissionsHealthFacilities, admissionsHomeBasedCare, icuTotal, icuVentilatorySupport, icuSupplementalOxygen, supplementalOxygenTotal, supplementalOxygenGeneralWards, supplementalOxygenHdu } = this.state;
    
    this.props.firebase
      .draft(id)
      .set({
        step6: {
          admissionsHealthFacilities: parseFloat(admissionsHealthFacilities),
          admissionsHomeBasedCare: parseFloat(admissionsHomeBasedCare),
          icuTotal: parseFloat(icuTotal),
          icuVentilatorySupport: parseFloat(icuVentilatorySupport),
          icuSupplementalOxygen: parseFloat(icuSupplementalOxygen),
          supplementalOxygenTotal: parseFloat(supplementalOxygenTotal,),
          supplementalOxygenGeneralWards: parseFloat(supplementalOxygenGeneralWards),
          supplementalOxygenHdu: parseFloat(supplementalOxygenHdu),
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

    const { admissionsHealthFacilities, admissionsHomeBasedCare, icuTotal, icuVentilatorySupport, icuSupplementalOxygen, supplementalOxygenTotal, supplementalOxygenGeneralWards, supplementalOxygenHdu, disabled } = this.state;

    return(
      <Grid item xs={12}>
        <form className={classes.form} onSubmit={(e) => this.onSubmit(e)}>

          <Box color="primary.main">
            <Typography variant="h6" align="center" gutterBottom>
              <strong>Admissions</strong>
            </Typography>
          </Box>

          <Separator />

          <Typography variant="body2" gutterBottom>
            <strong>Cummulative</strong>
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <NumberFormat
                fullWidth
                id="admissionsHealthFacilities"
                helperText="All patients admitted in Health Facilities."
                label="Health Facilities"
                margin="normal"
                name="admissionsHealthFacilities"
                value={admissionsHealthFacilities}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'admissionsHealthFacilities',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumberFormat
                fullWidth
                id="admissionsHomeBasedCare"
                helperText="All patients admitted in the Home-Based Care program."
                label="Home-Based Care"
                margin="normal"
                name="admissionsHomeBasedCare"
                value={admissionsHomeBasedCare}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'admissionsHomeBasedCare',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
          </Grid>

          <Separator />

          <Typography variant="body2" gutterBottom>
            <strong>Intensive Care Unit</strong>
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <NumberFormat
                fullWidth
                id="icuTotal"
                helperText="Total patients admitted in ICU."
                label="Total"
                margin="normal"
                name="icuTotal"
                value={icuTotal}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'icuTotal',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumberFormat
                fullWidth
                id="icuVentilatorySupport"
                helperText="ICU patients on ventilatory support."
                label="Ventilatory Support"
                margin="normal"
                name="icuVentilatorySupport"
                value={icuVentilatorySupport}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'icuVentilatorySupport',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumberFormat
                fullWidth
                id="icuSupplementalOxygen"
                helperText="ICU patients on supplemental oxygen."
                label="Supplemental Oxygen"
                margin="normal"
                name="icuSupplementalOxygen"
                value={icuSupplementalOxygen}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'icuSupplementalOxygen',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
          </Grid>

          <Separator />

          <Typography variant="body2" gutterBottom>
            <strong>Supplemental Oxygen</strong>
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <NumberFormat
                fullWidth
                id="supplementalOxygenTotal"
                helperText="Total non-ICU patients who are on Supplemental Oxygen."
                label="Total"
                margin="normal"
                name="supplementalOxygenTotal"
                value={supplementalOxygenTotal}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'supplementalOxygenTotal',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumberFormat
                fullWidth
                id="supplementalOxygenGeneralWards"
                helperText="Supplemental Oxygen patients in General Wards."
                label="General Wards"
                margin="normal"
                name="supplementalOxygenGeneralWards"
                value={supplementalOxygenGeneralWards}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'supplementalOxygenGeneralWards',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumberFormat
                fullWidth
                id="supplementalOxygenHdu"
                helperText="Supplemental Oxygen patients in HDUs."
                label="High Dependency Unit"
                margin="normal"
                name="supplementalOxygenHdu"
                value={supplementalOxygenHdu}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'supplementalOxygenHdu',
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
          <Typography variant="body2" gutterBottom>Step 6</Typography>
        </Box>

        <Box p={1} textAlign="center" color="text.disabled" fontWeight="fontWeightBold">
          <Typography variant="body2" gutterBottom><strong>{id}</strong></Typography>
        </Box>
      </Grid>
    );
  }
}

const StepSix = compose(
  withStyles(styles, { withTheme: true }),
  withSnackbar,
  withFirebase,
)(StepSixBase);

export default StepSix;