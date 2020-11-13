import React, { Component } from 'react';
import { compose } from 'recompose';

import Start from './start';
import StepOne from './step1';    // Positive Cases & Samples Tested, Distribution of New Cases
import StepTwo from './step2';    // County Distribution
import StepThree from './step3';  // Recoveries
import StepFour from './step4';   // Deaths
import StepFive from './step5';   // Health Workers
import StepSix from './step6';    // Admissions
import StepSeven from './step7';  // Miscellaneous
import StepEight from './step8';  // Confirm & Submit
import Stop from './stop';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MobileStepper from '@material-ui/core/MobileStepper';
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
});

const INITIAL_STATE = {
  id: '',                 // The draft post id
  activeStep: 0,          // The current active step
  steps: 10,              // Total number of steps
  counties: {},           // List of all Counties - relevant for Step 2
  sources: [],            // List of all Sources - relevant for Step 6
};

class DailyUpdateBase extends Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };

    this.getStepContent = this.getStepContent.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    // Listen to changes to Counties
    this.countiesListener = this.props.firebase
                      .counties()
                      .orderBy("countyCode", "asc")
                      .onSnapshot((querySnapshot) => {
                        let counties = {};
                        querySnapshot.forEach((doc) => {
                          counties[doc.id] = doc.data().countyName;
                        });
                        this.setState({ counties });
                      });

    // Listen to changes to Sources
    this.sourcesListener = this.props.firebase
                      .sources()
                      .onSnapshot((querySnapshot) => {
                        let sources = [];
                        querySnapshot.forEach((doc) => {
                          sources.push({ id: doc.id, name: doc.data().sourceName });
                        });
                        this.setState({ sources });
                      });
  }

  componentWillUnmount() {
    this.countiesListener();  // Unsubscribe from listening to Counties
    this.sourcesListener();   // Unsubscribe from listening to Sources
  }

  /**
   * getStepContent() gets the respective content component for each step
   */
  getStepContent() {
    const { id, activeStep, counties, sources } = this.state;

    switch (activeStep) {
      case 0:
        return <Start />;                                   // Start - This is the starting point
      case 1:
        return <StepOne id={id} />;                         // Step 1
      case 2:
        return <StepTwo id={id} counties={counties} />;     // Step 2
      case 3:
        return <StepThree id={id} />;                       // Step 3
      case 4:
        return <StepFour id={id} />;                        // Step 4
      case 5:
        return <StepFive id={id} />;                        // Step 5
      case 6:
        return <StepSix id={id} />;                         // Step 6
      case 7:
        return <StepSeven id={id} sources={sources} />;     // Step 7
      case 8:
        return <StepEight id={id} />;                       // Step 8
      case 9:
        return <Stop id={id} />;                            // Stop - This is the stop point
      default:
        return 'Error. Unkown Step.';
    }
  }
  
  handleNext() {
    const { enqueueSnackbar } = this.props;
    
    const { id, activeStep, steps } = this.state;

    const authUser = this.context;

    // If step IS first step (i.e. step 0), create a draft post,
    // get the draft post's id and pass it to state, then activeStep++
    if (activeStep === 0) {
      this.props.firebase
        .drafts()
        .add({
          step1: {},
          step2: {
            distribution: {},
          },
          step3: {},
          step4: {},
          step5: {},
          step6: {},
          step7: {},
          step8: {},
          createdOn: this.props.firebase.getServerTimestamp(),
          createdBy: authUser.uid,
          createdByName: authUser.displayName,
        })
        .then((docRef) => {
          this.setState({ activeStep: activeStep + 1, id: docRef.id });
        })
        .catch(error => {
          enqueueSnackbar(error.message, { variant: 'error' });
        });
    } else if (activeStep === steps - 2) {
      // Read draft post
      this.props.firebase
        .draft(id)
        .get()
        .then((doc) => {

          if (doc.exists) { // If document exists

            let draft = doc.data();

            if (draft.step8.confirmation) { // If draft post has confirmation

              // Post to posts
              this.props.firebase
                .post(id)
                .set({
                  createdBy: draft.createdBy,
                  createdByName: draft.createdByName,
                  createdOn: draft.createdOn,
                  step1: draft.step1,
                  step2: draft.step2,
                  step3: draft.step3,
                  step4: draft.step4,
                  step5: draft.step5,
                  step6: draft.step6,
                  step7: draft.step7,
                })
                .then(() => {
                  enqueueSnackbar("Draft has successfully been posted.", { variant: 'success' });
                });

            }

          }

        })
        .catch(error => {
          enqueueSnackbar(error.message, { variant: 'error', onClose: this.handleError });
        });

      this.setState({ activeStep: activeStep + 1 });
    } else {
      this.setState({ activeStep: activeStep + 1 });
    }
  };

  handleBack() {
    const { activeStep } = this.state;

    this.setState({ activeStep: activeStep - 1 });
  };

  handleReset() {
    const { enqueueSnackbar } = this.props;

    const { id, activeStep, steps } = this.state;

    // If step IS NOT the last step, delete/discard the draft post id
    if(activeStep !== steps - 1) {
      this.props.firebase
      .draft(id)
      .delete()
      .catch(error => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
    }

    this.setState({ activeStep: 0 });
  };

  render() {
    const { classes, theme } = this.props;

    const { activeStep, steps } = this.state;

    return(
      <Accordion elevation={0} square>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box p={1}>
            <Typography className={classes.heading} variant="h6">Daily Update</Typography>
            <Typography className={classes.secondaryHeading} variant="subtitle1">What's the latest within the last 24 hours?</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>

          {/* Stepper component */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MobileStepper
                variant="progress"
                steps={steps}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton={
                  <React.Fragment>
                    {activeStep === steps - 1 ? (
                      <Button size="small" disabled>Finished</Button>
                    ) : (
                      <Button size="small" onClick={this.handleNext} disabled={activeStep === steps - 1}>
                        {activeStep === steps - 2 ? 'Finish' : 'Next'}
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                      </Button>
                    )}
                  </React.Fragment>
                }
                backButton={
                  <Button size="small" onClick={this.handleBack} disabled={activeStep === 0 || activeStep === 1 || activeStep === steps - 1}>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    Back
                  </Button>
                }
              />
            </Grid>

            {/* Stepper content */}
            {this.getStepContent()}

            {/* Reset button */}
            <Grid item xs={12}>
              <Box textAlign="center">
                <Button size="small" onClick={this.handleReset} disabled={activeStep === 0}>
                  {activeStep === steps -1 ? 'New Update' : 'Reset'}
                </Button>
              </Box>
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
