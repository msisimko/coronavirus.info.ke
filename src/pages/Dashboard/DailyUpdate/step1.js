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
  // Samples tested
  sampleTestedNew: '',
  sampleTestedTotal: '',
  // Positive cases
  positiveCasesNew: '',
  positiveCasesTotal: '',
  // Positive cases nationality
  positiveCasesNationalityKenyans: '',
  positiveCasesNationalityForeigners: '',
  // Positive cases gender
  positiveCasesGenderMale: '',
  positiveCasesGenderFemale: '',
  // Positive cases agee
  positiveCasesAgeYoungest: '',
  positiveCasesAgeOldest: '',
  // Form control
  disabled: true,
}

class StepOneBase extends Component {
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
        let draft = doc.data().step1;

        this.setState({ 
          sampleTestedNew: draft.sampleTestedNew ? draft.sampleTestedNew : '',
          sampleTestedTotal: draft.sampleTestedTotal ? draft.sampleTestedTotal : '',
          positiveCasesNew: draft.positiveCasesNew ? draft.positiveCasesNew : '',
          positiveCasesTotal: draft.positiveCasesTotal ? draft.positiveCasesTotal : '',
          positiveCasesNationalityKenyans: draft.positiveCasesNationalityKenyans ? draft.positiveCasesNationalityKenyans : '',
          positiveCasesNationalityForeigners: draft.positiveCasesNationalityForeigners ? draft.positiveCasesNationalityForeigners : '',
          positiveCasesGenderMale: draft.positiveCasesGenderMale ? draft.positiveCasesGenderMale : '',
          positiveCasesGenderFemale: draft.positiveCasesGenderFemale ? draft.positiveCasesGenderFemale : '',
          positiveCasesAgeYoungest: draft.positiveCasesAgeYoungest ? draft.positiveCasesAgeYoungest : '',
          positiveCasesAgeOldest: draft.positiveCasesAgeOldest ? draft.positiveCasesAgeOldest : '',
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

    const { sampleTestedNew, sampleTestedTotal, positiveCasesNew, positiveCasesTotal, positiveCasesNationalityKenyans, positiveCasesNationalityForeigners, positiveCasesGenderMale, positiveCasesGenderFemale, positiveCasesAgeYoungest, positiveCasesAgeOldest } = this.state;
    
    this.props.firebase
      .draft(id)
      .set({
        step1: {
          sampleTestedNew: parseFloat(sampleTestedNew),
          sampleTestedTotal: parseFloat(sampleTestedTotal),
          positiveCasesNew: parseFloat(positiveCasesNew),
          positiveCasesTotal: parseFloat(positiveCasesTotal),
          positiveCasesNationalityKenyans: parseFloat(positiveCasesNationalityKenyans),
          positiveCasesNationalityForeigners: parseFloat(positiveCasesNationalityForeigners),
          positiveCasesGenderMale: parseFloat(positiveCasesGenderMale),
          positiveCasesGenderFemale: parseFloat(positiveCasesGenderFemale),
          positiveCasesAgeYoungest: parseFloat(positiveCasesAgeYoungest),
          positiveCasesAgeOldest: parseFloat(positiveCasesAgeOldest),
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

    const { sampleTestedNew, sampleTestedTotal, positiveCasesNew, positiveCasesTotal, positiveCasesNationalityKenyans, positiveCasesNationalityForeigners, positiveCasesGenderMale, positiveCasesGenderFemale, positiveCasesAgeYoungest, positiveCasesAgeOldest, disabled } = this.state;
    
    return(
      <Grid item xs={12}>
        <form className={classes.form} onSubmit={(e) => this.onSubmit(e)}>

          <Box color="primary.main">
            <Typography variant="h6" align="center" gutterBottom>
              <strong>Positive Cases &amp; Samples Tested</strong>
            </Typography>
          </Box>

          <Separator />

          <Typography variant="body2" gutterBottom>
            <strong>Last 24 Hours</strong>
          </Typography>

          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <NumberFormat
                fullWidth
                id="positiveCasesNew"
                label="New Positive Cases"
                margin="normal"
                name="positiveCasesNew"
                required
                value={positiveCasesNew}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'positiveCasesNew',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumberFormat 
                fullWidth
                id="sampleTestedNew"
                label="New Samples Tested"
                margin="normal"
                name="sampleTestedNew"
                required
                value={sampleTestedNew}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'sampleTestedNew',
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
            <Grid item md={6} xs={12}>
              <NumberFormat
                fullWidth
                id="positiveCasesTotal"
                label="Total Positive Cases"
                margin="normal"
                name="positiveCasesTotal"
                required
                value={positiveCasesTotal}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'positiveCasesTotal',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumberFormat
                fullWidth
                id="sampleTestedTotal"
                label="Total Samples Tested"
                margin="normal"
                name="sampleTestedTotal"
                required
                value={sampleTestedTotal}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'sampleTestedTotal',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
          </Grid>

          <Separator />

          <Box color="primary.main">
            <Typography variant="h6" align="center" gutterBottom>
              <strong>Distribution of New Cases</strong>
            </Typography>
          </Box>

          <Separator />

          <Typography variant="body2" gutterBottom>
            <strong>Nationality</strong>
          </Typography>

          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <NumberFormat
                fullWidth
                id="positiveCasesNationalityKenyans"
                label="Kenyans"
                margin="normal"
                name="positiveCasesNationalityKenyans"
                value={positiveCasesNationalityKenyans}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'positiveCasesNationalityKenyans',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumberFormat
                fullWidth
                id="positiveCasesNationalityForeigners"
                label="Foreigners"
                margin="normal"
                name="positiveCasesNationalityForeigners"
                value={positiveCasesNationalityForeigners}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'positiveCasesNationalityForeigners',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
          </Grid>

          <Separator />

          <Typography variant="body2" gutterBottom>
            <strong>Gender</strong>
          </Typography>

          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <NumberFormat
                fullWidth
                id="positiveCasesGenderMale"
                label="Males"
                margin="normal"
                name="positiveCasesGenderMale"
                value={positiveCasesGenderMale}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'positiveCasesGenderMale',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumberFormat
                fullWidth
                id="positiveCasesGenderFemale"
                label="Females"
                margin="normal"
                name="positiveCasesGenderFemale"
                value={positiveCasesGenderFemale}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'positiveCasesGenderFemale',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
          </Grid>

          <Separator />

          <Typography variant="body2" gutterBottom>
            <strong>Age</strong>
          </Typography>

          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <NumberFormat
                fullWidth
                id="positiveCasesAgeYoungest"
                helperText="Enter age in months."
                label="Youngest"
                margin="normal"
                name="positiveCasesAgeYoungest"
                value={positiveCasesAgeYoungest}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'positiveCasesAgeYoungest',
                      value: values.value,
                    },
                  });
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumberFormat
                fullWidth
                id="positiveCasesAgeOldest"
                helperText="Enter age in months."
                label="Oldest"
                margin="normal"
                name="positiveCasesAgeOldest"
                value={positiveCasesAgeOldest}
                variant="filled"
                disabled={disabled}
                customInput={TextField}
                thousandSeparator
                isNumericString
                onValueChange={(values) => {
                  this.onChange({
                    target: {
                      name: 'positiveCasesAgeOldest',
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
          <Typography variant="body2" gutterBottom>Step 1</Typography>
        </Box>

        <Box p={1} textAlign="center" color="text.disabled" fontWeight="fontWeightBold">
          <Typography variant="body2" gutterBottom><strong>{id}</strong></Typography>
        </Box>
      </Grid>
    );
  }
}

const StepOne = compose(
  withStyles(styles, { withTheme: true }),
  withSnackbar,
  withFirebase,
)(StepOneBase);

export default StepOne;