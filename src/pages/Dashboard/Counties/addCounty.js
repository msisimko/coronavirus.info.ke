import React, { Component } from 'react';
import { compose } from 'recompose';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

import { withSnackbar } from 'notistack';

import NumberFormat from 'react-number-format';
 
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
  countyName: '',
  countyCode: '',
  countyCapital: '',
  countyArea: '',
  countyPopulation: '',
  disabled: false,
}

class AddCountyBase extends Component {
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

    const { countyName, countyCode, countyCapital, countyArea, countyPopulation } = this.state;

    const authUser = this.context;

    this.setState({ disabled: true });
 
    this.props.firebase
      .counties()
      .add({
        countyName,
        countyCode: parseFloat(countyCode),
        countyCapital,
        countyArea: parseFloat(countyArea),
        countyPopulation: parseFloat(countyPopulation),
        createdOn: this.props.firebase.getServerTimestamp(),
        createdBy: authUser.uid,
        createdByName: authUser.displayName,
      })
      .then(() => {
        enqueueSnackbar(`${countyName} County has been successfully added.`, { variant: 'success', onClose: this.handleSuccess });
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

    const { countyName, countyCode, countyCapital, countyArea, countyPopulation, disabled } = this.state;

    const disableButton = countyName === '' ||
                          countyCode === ''  ||
                          countyCapital === ''||
                          countyArea === '' ||
                          countyPopulation === '';

    return(
      <form className={classes.form} onSubmit={(e) => this.onSubmit(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="countyName"
              helperText="Make sure you confirm existing counties before adding a county that may already exist."
              label="County Name"
              margin="normal"
              name="countyName"
              onChange={(e) => this.onChange(e)}
              required
              value={countyName}
              variant="filled"
              disabled={disabled}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <NumberFormat 
              fullWidth
              id="countyCode"
              label="County Code"
              margin="normal"
              name="countyCode"
              required
              value={countyCode}
              variant="filled"
              disabled={disabled}
              customInput={TextField}
              thousandSeparator
              isNumericString
              onValueChange={(values) => {
                this.onChange({
                  target: {
                    name: 'countyCode',
                    value: values.value,
                  },
                });
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              id="countyCapital"
              label="County Capital"
              margin="normal"
              name="countyCapital"
              onChange={(e) => this.onChange(e)}
              required
              value={countyCapital}
              variant="filled"
              disabled={disabled}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <NumberFormat 
              fullWidth
              id="countyArea"
              helperText="Area is in square kilometers."
              label="County Area"
              margin="normal"
              name="countyArea"
              required
              value={countyArea}
              variant="filled"
              disabled={disabled}
              customInput={TextField}
              thousandSeparator
              isNumericString
              onValueChange={(values) => {
                this.onChange({
                  target: {
                    name: 'countyArea',
                    value: values.value,
                  },
                });
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <NumberFormat 
              fullWidth
              id="countyPopulation"
              helperText="Population is as of the 2019 Census."
              label="County Population"
              margin="normal"
              name="countyPopulation"
              required
              value={countyPopulation}
              variant="filled"
              disabled={disabled}
              customInput={TextField}
              thousandSeparator
              isNumericString
              onValueChange={(values) => {
                this.onChange({
                  target: {
                    name: 'countyPopulation',
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
          disabled={disabled || disableButton}
        >
          Add County
        </Button>
      </form>
    );
  }
}

const AddCounty = compose(
  withStyles(styles, { withTheme: true }),
  withSnackbar,
  withFirebase,
)(AddCountyBase);

export default AddCounty;
