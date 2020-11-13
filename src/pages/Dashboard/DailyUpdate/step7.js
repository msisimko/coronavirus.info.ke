import React, { Component } from 'react';
import { compose } from 'recompose';

import Separator from '../../../components/Separator';

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

import SaveIcon from '@material-ui/icons/Save';

import { DateTime } from 'luxon';

import { KeyboardDatePicker } from '@material-ui/pickers';

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
  brief: '',
  source: '',
  day: DateTime.local(),
  attachment: '',
  disabled: true,
}

class StepSevenBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      ...INITIAL_STATE,
    };

    this.onChange = this.onChange.bind(this);
    this.onDayChange = this.onDayChange.bind(this);
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
        let draft = doc.data().step7;

        this.setState({ 
          brief: draft.brief ? draft.brief : '',
          source: draft.source ? draft.source : '',
          day: draft.day ? DateTime.fromISO(draft.day) : DateTime.local(),
          attachment: draft.attachment ? draft.attachment : '',
          disabled: false,
          });
      });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onDayChange(instance) {
    this.setState({ day: instance });
  }

  onSubmit(event) {
    const { id, enqueueSnackbar } = this.props;

    this.setState({ disabled: true });

    const { brief, source, day, attachment } = this.state;
    
    this.props.firebase
      .draft(id)
      .set({
        step7: {
          brief: brief.toString(),
          source: source,
          day: day.toISO(),
          attachment,
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
    const { classes, id, sources } = this.props;

    const { brief, source, day, /* attachment, */ disabled } = this.state;

    return(
      <Grid item xs={12}>
        <form className={classes.form} onSubmit={(e) => this.onSubmit(e)}>

          <Box color="primary.main">
            <Typography variant="h6" align="center" gutterBottom>
              <strong>Miscellaneous</strong>
            </Typography>
          </Box>

          <Separator />

          <Typography variant="body2" gutterBottom>
            <strong>Anything worth noting that hasn't been captured?</strong>
          </Typography>

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
          </Grid>

          <Separator />

          <Typography variant="body2" gutterBottom>
            <strong>Source</strong>
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl margin="normal" fullWidth variant="filled" disabled={disabled}>
                <InputLabel id="select-source">Source</InputLabel>
                <Select 
                  labelId="select-source"
                  id="source"
                  name="source"
                  onChange={(e) => this.onChange(e)}
                  value={source}
                >
                  {sources.map((source) => (
                    <MenuItem key={source.id} value={source.name}>{source.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Separator />

          <Typography variant="body2" gutterBottom>
            <strong>Date</strong>
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <KeyboardDatePicker
                fullWidth
                id="day"
                label="Day"
                margin="normal"
                name="day"
                value={day}
                onChange={this.onDayChange}
                disabled={disabled}
                format="dd/MM/yyyy"
                KeyboardButtonProps={{
                  'aria-label': 'Change Day',
                }}
                disableFuture
              />
            </Grid>
          </Grid>

          <Separator />

          <Typography variant="body2" gutterBottom>
            <strong>Attachment(s)</strong>
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* attachment: press release */}
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
          <Typography variant="body2" gutterBottom>Step 7</Typography>
        </Box>

        <Box p={1} textAlign="center" color="text.disabled" fontWeight="fontWeightBold">
          <Typography variant="body2" gutterBottom><strong>{id}</strong></Typography>
        </Box>
      </Grid>
    );
  }
}

const StepSeven = compose(
  withStyles(styles, { withTheme: true }),
  withSnackbar,
  withFirebase,
)(StepSevenBase);

export default StepSeven;