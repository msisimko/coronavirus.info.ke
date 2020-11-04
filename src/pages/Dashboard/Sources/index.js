import React, { Component } from 'react';
import { compose } from 'recompose';

import ListSources from './listSources';

import Separator from '../../../components/Separator';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { withSnackbar } from 'notistack';
 
import { withFirebase } from '../../../firebase';

import { AuthUserContext } from '../../../session';

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
});

const INITIAL_STATE = {
  sourceName: '',
  disabled: false,
}

class SourcesBase extends Component {
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
      <Accordion elevation={0} square>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
          <Box p={1}>
            <Typography className={classes.heading} variant="h6">Sources</Typography>
            <Typography className={classes.secondaryHeading} variant="subtitle1">Add a new or delete an old source of information.</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12}>

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

              <Separator />

              <Box color="primary.main">
                <Typography variant="overline" gutterBottom>
                  <strong>List of Sources</strong>
                </Typography>
              </Box>

              <Separator />

              <ListSources />

            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
}

const Sources = compose(
  withStyles(styles, { withTheme: true }),
  withSnackbar,
  withFirebase,
)(SourcesBase);

export default Sources;
