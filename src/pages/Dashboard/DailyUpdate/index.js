import 'luxon';

import React, { Component } from 'react';
import { compose } from 'recompose';

import Separator from '../../../components/Separator';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { KeyboardDatePicker } from '@material-ui/pickers';

import { withSnackbar } from 'notistack';

import NumberFormat from 'react-number-format';
 
import { withFirebase } from '../../../firebase';

const styles = theme => ({
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
  },
  form: {
    width: '100%', // Fix IE 11 issue
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  table: {
    minWidth: 650,
  },
});

const INITIAL_STATE = {
  // samples tested
  sampleTestedNew: '', sampleTestedTotal: '',
  // positive cases
  positiveCasesNew: '', positiveCasesTotal: '', positiveCasesNationalityKenyans: '', positiveCasesNationalityForeigners: '', positiveCasesGenderMale: '', positiveCasesGenderFemale: '', positiveCasesAgeYoungest: '', positiveCasesAgeOldest: '', positiveCasesAgeDistribution0To19: '', positiveCasesAgeDistribution20To39: '', positiveCasesAgeDistribution40To60: '', positiveCasesAgeDistributionOver60: '', positiveCasesSourceSurveillanceTeam: '', positiveCasesSourceQuarantineFacilities: '', positiveCasesHistoryOfTravelYes: '', positiveCasesHistoryOfTravelNo: '',
  // recoveries
  recoveriesNew: '', recoveriesTotal: '', recoveriesFromHealthFacilities: '', recoveriesFromHomeBasedCare: '',
  // deaths
  deathsNew: '', deathsTotal: '',
  // misc
  quarantinedTotal: '', quarantinedDischarged: '', quarantinedMonitoring: '', admissionsHealthFacilities: '', admissionsHomeBasedCare: '', icuTotal: '', icuVentilatorySupport: '', icuSupplementalOxygen: '', supplementalOxygenTotal: '', supplementalOxygenGeneralWards: '', supplementalOxygenHdu: '', supplementalOxygenIcu: '',
  // text post
  brief: '', attachment: '', briefSource: '', dateFor: new Date(),
  // metadata
  postedDate: '', postedAuthorId: '', postedAuthorName: '', updatedDate: '', updatedAuthorId: '', updatedAuthorName: '',
  // other
  disabled: false,
};

class DailyUpdateBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE, allSources: [] };

    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    this.listener = this.props.firebase
                      .sources()
                      .onSnapshot((querySnapshot) => {
                        let allSources = [];
                        querySnapshot.forEach((doc) => {
                          allSources.push({ id: doc.id, name: doc.data().sourceName });
                        });
                        this.setState({ allSources });
                      });
  }

  componentWillUnmount() {
    this.listener();
  }
 
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onDateChange(date) {
    this.setState({ dateFor: date });
  }

  onSubmit(event) {
    // const { enqueueSnackbar } = this.props;

    // const { sampleTestedNew, sampleTestedTotal, positiveCasesNew, positiveCasesTotal, positiveCasesNationalityKenyans, positiveCasesNationalityForeigners, positiveCasesGenderMale, positiveCasesGenderFemale, positiveCasesAgeYoungest, positiveCasesAgeOldest, positiveCasesAgeDistribution0To19, positiveCasesAgeDistribution20To39, positiveCasesAgeDistribution40To60, positiveCasesAgeDistributionOver60, positiveCasesSourceSurveillanceTeam, positiveCasesSourceQuarantineFacilities, positiveCasesHistoryOfTravelYes, positiveCasesHistoryOfTravelNo, recoveriesNew, recoveriesTotal, recoveriesFromHealthFacilities, recoveriesFromHomeBasedCare, deathsNew, deathsTotal, quarantinedTotal, quarantinedDischarged, quarantinedMonitoring, admissionsHealthFacilities, admissionsHomeBasedCare, icuTotal, icuVentilatorySupport, icuSupplementalOxygen, supplementalOxygenTotal, supplementalOxygenGeneralWards, supplementalOxygenHdu, supplementalOxygenIcu, brief, attachment, briefSource, dateFor, postedDate, postedAuthorId, postedAuthorName, updatedDate, updatedAuthorId, updatedAuthorName } = this.state;

    this.setState({ disabled: true });
 
    // this.props.firebase
    //   // .doUpdateProfile(displayName)
    //   .then(() => {
    //     enqueueSnackbar("Your profile has been updated.", { variant: 'success', onClose: this.handleSuccess });
    //   })
    //   .catch(error => {
    //     enqueueSnackbar(error.message, { variant: 'error', onClose: this.handleError });
    //   });
    
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

    const { sampleTestedNew, sampleTestedTotal, positiveCasesNew, positiveCasesTotal, positiveCasesNationalityKenyans, positiveCasesNationalityForeigners, positiveCasesGenderMale, positiveCasesGenderFemale, positiveCasesAgeYoungest, positiveCasesAgeOldest, positiveCasesAgeDistribution0To19, positiveCasesAgeDistribution20To39, positiveCasesAgeDistribution40To60, positiveCasesAgeDistributionOver60, positiveCasesSourceSurveillanceTeam, positiveCasesSourceQuarantineFacilities, positiveCasesHistoryOfTravelYes, positiveCasesHistoryOfTravelNo, recoveriesNew, recoveriesTotal, recoveriesFromHealthFacilities, recoveriesFromHomeBasedCare, deathsNew, deathsTotal, quarantinedTotal, quarantinedDischarged, quarantinedMonitoring, admissionsHealthFacilities, admissionsHomeBasedCare, icuTotal, icuVentilatorySupport, icuSupplementalOxygen, supplementalOxygenTotal, supplementalOxygenGeneralWards, supplementalOxygenHdu, supplementalOxygenIcu, brief, attachment, briefSource, dateFor, postedDate, postedAuthorId, postedAuthorName, updatedDate, updatedAuthorId, updatedAuthorName, disabled, allSources } = this.state;
 
    const disableButton = sampleTestedNew === '' || sampleTestedTotal === '' || positiveCasesNew === '' || positiveCasesTotal === '' || positiveCasesNationalityKenyans === '' || positiveCasesNationalityForeigners === '' || positiveCasesGenderMale === '' || positiveCasesGenderFemale === '' || positiveCasesAgeYoungest === '' || positiveCasesAgeOldest === '' || positiveCasesAgeDistribution0To19 === '' || positiveCasesAgeDistribution20To39 === '' || positiveCasesAgeDistribution40To60 === '' || positiveCasesAgeDistributionOver60 === '' || positiveCasesSourceSurveillanceTeam === '' || positiveCasesSourceQuarantineFacilities === '' || positiveCasesHistoryOfTravelYes === '' || positiveCasesHistoryOfTravelNo === '' || recoveriesNew === '' || recoveriesTotal === '' || recoveriesFromHealthFacilities === '' || recoveriesFromHomeBasedCare === '' || deathsNew === '' || deathsTotal === '' || quarantinedTotal === '' || quarantinedDischarged === '' || quarantinedMonitoring === '' || admissionsHealthFacilities === '' || admissionsHomeBasedCare === '' || icuTotal === '' || icuVentilatorySupport === '' || icuSupplementalOxygen === '' || supplementalOxygenTotal === '' || supplementalOxygenGeneralWards === '' || supplementalOxygenHdu === '' || supplementalOxygenIcu === '' || brief === '' || attachment === '' || briefSource === '' || dateFor === '' || postedDate === '' || postedAuthorId === '' || postedAuthorName === '' || updatedDate === '' || updatedAuthorId === '' || updatedAuthorName === '';

    return(
      <Accordion elevation={0} square>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Box p={1}>
            <Typography className={classes.heading} variant="h6">Daily Update</Typography>
            <Typography className={classes.secondaryHeading} variant="subtitle1">What's the latest within the last 24 hours?</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12}>

              <form className={classes.form} onSubmit={(e) => this.onSubmit(e)}>
                <Box color="primary.main">
                  <Typography variant="overline" gutterBottom>
                    <strong>Samples Tested</strong>
                  </Typography>
                </Box>

                <Separator />

                <Grid container spacing={2}>
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
                  <Typography variant="overline" gutterBottom>
                    <strong>Positive Cases</strong>
                  </Typography>
                </Box>

                <Separator />

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
                </Grid>

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
                  <strong>Gender Distribution</strong>
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
                  <strong>Age Distribution</strong>
                </Typography>

                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <NumberFormat
                      fullWidth
                      id="positiveCasesAgeYoungest"
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

                <Separator />

                <Typography variant="body2" gutterBottom>
                  <strong>Age Distribution Breakdown</strong>
                </Typography>

                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <NumberFormat
                      fullWidth
                      id="positiveCasesAgeDistribution0To19"
                      label="0 to 19"
                      margin="normal"
                      name="positiveCasesAgeDistribution0To19"
                      value={positiveCasesAgeDistribution0To19}
                      variant="filled"
                      disabled={disabled}
                      customInput={TextField}
                      thousandSeparator
                      isNumericString
                      onValueChange={(values) => {
                        this.onChange({
                          target: {
                            name: 'ositiveCasesAgeDistribution0To19',
                            value: values.value,
                          },
                        });
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <NumberFormat
                      fullWidth
                      id="positiveCasesAgeDistribution20To39"
                      label="20 to 39"
                      margin="normal"
                      name="positiveCasesAgeDistribution20To39"
                      value={positiveCasesAgeDistribution20To39}
                      variant="filled"
                      disabled={disabled}
                      customInput={TextField}
                      thousandSeparator
                      isNumericString
                      onValueChange={(values) => {
                        this.onChange({
                          target: {
                            name: 'positiveCasesAgeDistribution20To39',
                            value: values.value,
                          },
                        });
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <NumberFormat
                      fullWidth
                      id="positiveCasesAgeDistribution40To60"
                      label="40 to 60"
                      margin="normal"
                      name="positiveCasesAgeDistribution40To60"
                      value={positiveCasesAgeDistribution40To60}
                      variant="filled"
                      disabled={disabled}
                      customInput={TextField}
                      thousandSeparator
                      isNumericString
                      onValueChange={(values) => {
                        this.onChange({
                          target: {
                            name: 'positiveCasesAgeDistribution40To60',
                            value: values.value,
                          },
                        });
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <NumberFormat
                      fullWidth
                      id="positiveCasesAgeDistributionOver60"
                      label="Over 60"
                      margin="normal"
                      name="positiveCasesAgeDistributionOver60"
                      value={positiveCasesAgeDistributionOver60}
                      variant="filled"
                      disabled={disabled}
                      customInput={TextField}
                      thousandSeparator
                      isNumericString
                      onValueChange={(values) => {
                        this.onChange({
                          target: {
                            name: 'positiveCasesAgeDistributionOver60',
                            value: values.value,
                          },
                        });
                      }}
                    />
                  </Grid>
                </Grid>

                <Separator />

                <Typography variant="body2" gutterBottom>
                  <strong>Sources</strong>
                </Typography>

                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <NumberFormat
                      fullWidth
                      id="positiveCasesSourceSurveillanceTeam"
                      label="Surveillance Team"
                      margin="normal"
                      name="positiveCasesSourceSurveillanceTeam"
                      value={positiveCasesSourceSurveillanceTeam}
                      variant="filled"
                      disabled={disabled}
                      customInput={TextField}
                      thousandSeparator
                      isNumericString
                      onValueChange={(values) => {
                        this.onChange({
                          target: {
                            name: 'positiveCasesSourceSurveillanceTeam',
                            value: values.value,
                          },
                        });
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <NumberFormat
                      fullWidth
                      id="positiveCasesSourceQuarantineFacilities"
                      label="Quarantine Facilities"
                      margin="normal"
                      name="positiveCasesSourceQuarantineFacilities"
                      value={positiveCasesSourceQuarantineFacilities}
                      variant="filled"
                      disabled={disabled}
                      customInput={TextField}
                      thousandSeparator
                      isNumericString
                      onValueChange={(values) => {
                        this.onChange({
                          target: {
                            name: 'positiveCasesSourceQuarantineFacilities',
                            value: values.value,
                          },
                        });
                      }}
                    />
                  </Grid>
                </Grid>

                <Separator />

                <Typography variant="body2" gutterBottom>
                  <strong>History of Travel</strong>
                </Typography>

                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <NumberFormat
                      fullWidth
                      id="positiveCasesHistoryOfTravelYes"
                      label="Yes"
                      margin="normal"
                      name="positiveCasesHistoryOfTravelYes"
                      value={positiveCasesHistoryOfTravelYes}
                      variant="filled"
                      disabled={disabled}
                      customInput={TextField}
                      thousandSeparator
                      isNumericString
                      onValueChange={(values) => {
                        this.onChange({
                          target: {
                            name: 'positiveCasesHistoryOfTravelYes',
                            value: values.value,
                          },
                        });
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <NumberFormat
                      fullWidth
                      id="positiveCasesHistoryOfTravelNo"
                      label="No"
                      margin="normal"
                      name="positiveCasesHistoryOfTravelNo"
                      value={positiveCasesHistoryOfTravelNo}
                      variant="filled"
                      disabled={disabled}
                      customInput={TextField}
                      thousandSeparator
                      isNumericString
                      onValueChange={(values) => {
                        this.onChange({
                          target: {
                            name: 'positiveCasesHistoryOfTravelNo',
                            value: values.value,
                          },
                        });
                      }}
                    />
                  </Grid>
                </Grid>

                <Separator />

                <Typography variant="body2" gutterBottom>
                  <strong>Quarantined</strong>
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <NumberFormat
                      fullWidth
                      id="quarantinedTotal"
                      label="Total Quarantined"
                      margin="normal"
                      name="quarantinedTotal"
                      value={quarantinedTotal}
                      variant="filled"
                      disabled={disabled}
                      customInput={TextField}
                      thousandSeparator
                      isNumericString
                      onValueChange={(values) => {
                        this.onChange({
                          target: {
                            name: 'quarantinedTotal',
                            value: values.value,
                          },
                        });
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <NumberFormat
                      fullWidth
                      id="quarantinedDischarged"
                      label="Discharged"
                      margin="normal"
                      name="quarantinedDischarged"
                      value={quarantinedDischarged}
                      variant="filled"
                      disabled={disabled}
                      customInput={TextField}
                      thousandSeparator
                      isNumericString
                      onValueChange={(values) => {
                        this.onChange({
                          target: {
                            name: 'quarantinedDischarged',
                            value: values.value,
                          },
                        });
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <NumberFormat
                      fullWidth
                      id="quarantinedMonitoring"
                      label="Monitoring"
                      margin="normal"
                      name="quarantinedMonitoring"
                      value={quarantinedMonitoring}
                      variant="filled"
                      disabled={disabled}
                      customInput={TextField}
                      thousandSeparator
                      isNumericString
                      onValueChange={(values) => {
                        this.onChange({
                          target: {
                            name: 'quarantinedMonitoring',
                            value: values.value,
                          },
                        });
                      }}
                    />
                  </Grid>
                </Grid>

                <Separator />

                <Typography variant="body2" gutterBottom>
                  <strong>Admissions</strong>
                </Typography>

                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <NumberFormat
                      fullWidth
                      id="admissionsHealthFacilities"
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
                  <strong>ICU Patients</strong>
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <NumberFormat
                      fullWidth
                      id="icuTotal"
                      label="ICU Total"
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
                  <strong>Supplemental Oxygen Patients</strong>
                </Typography>

                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <NumberFormat
                      fullWidth
                      id="supplementalOxygenTotal"
                      label="Supplemental Oxygen Total"
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
                      label="High Dependency Units"
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
                  <Grid item md={6} xs={12}>
                    <NumberFormat
                      fullWidth
                      id="supplementalOxygenIcu"
                      label="Intensive Care Units"
                      margin="normal"
                      name="supplementalOxygenIcu"
                      value={supplementalOxygenIcu}
                      variant="filled"
                      disabled={disabled}
                      customInput={TextField}
                      thousandSeparator
                      isNumericString
                      onValueChange={(values) => {
                        this.onChange({
                          target: {
                            name: 'supplementalOxygenIcu',
                            value: values.value,
                          },
                        });
                      }}
                    />
                  </Grid>
                </Grid>

                <Separator />

                <Box color="primary.main">
                  <Typography variant="overline" gutterBottom>
                    <strong>Recoveries</strong>
                  </Typography>
                </Box>

                <Separator />

                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
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

                <Separator />

                <Typography variant="body2" gutterBottom>
                  <strong>Sources</strong>
                </Typography>

                <Grid container spacing={2}>
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
                </Grid>

                <Separator />

                <Box color="primary.main">
                  <Typography variant="overline" gutterBottom>
                    <strong>Deaths</strong>
                  </Typography>
                </Box>

                <Separator />

                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
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
                  <Grid item md={6} xs={12}>
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

                <Separator />

                <Box color="primary.main">
                  <Typography variant="overline" gutterBottom>
                    <strong>Miscellaneous</strong>
                  </Typography>
                </Box>

                <Separator />

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="brief"
                      label="Brief"
                      margin="normal"
                      name="brief"
                      onChange={(e) => this.onChange(e)}
                      value={brief}
                      variant="filled"
                      disabled={disabled}
                      multiline
                      rows={4}
                      placeholder="Anything worth noting?"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl margin="normal" fullWidth required variant="filled" disabled={disabled}>
                      <InputLabel id="select-source">Source</InputLabel>
                      <Select 
                        labelId="select-source"
                        id="briefSource"
                        name="briefSource"
                        onChange={(e) => this.onChange(e)}
                        value={briefSource}
                      >
                        {allSources.map((source) => (
                          <MenuItem key={source.id} value={source.name}>{source.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    {/* attachment: press release */}
                  </Grid>
                  <Grid item xs={12}>
                    <KeyboardDatePicker
                      fullWidth
                      id="dateFor"
                      label="Date"
                      margin="normal"
                      name="dateFor"
                      required
                      value={dateFor}
                      onChange={this.onDateChange}
                      disabled={disabled}
                      format="dd/MM/yyyy"
                      KeyboardButtonProps={{
                        'aria-label': 'Change Date',
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
                  disabled={disabled || disableButton}
                >
                  Submit Update
                </Button>
              </form>

            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
}

const DailyUpdate = compose(
  withStyles(styles, { withTheme: true }),
  withSnackbar,
  withFirebase,
)(DailyUpdateBase);

export default DailyUpdate;
