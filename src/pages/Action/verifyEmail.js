import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { compose } from 'recompose';

import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import { withFirebase } from '../../firebase';

import * as ROUTES from '../../constants/routes';

const styles = theme => ({
  button: {
    margin: theme.spacing(3, 0, 2),
  },
});

const INITIAL_STATE = {
  isLoading: true,
  error: null,
};

class VerifyEmailBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const { actionCode } = this.props;

    this.props.firebase
      .doApplyActionCode(actionCode)
      .catch(error => {
        this.setState({ error });
      })
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { classes } = this.props;

    const { isLoading, error } = this.state;

    const isError = error !== null;

    return(
      <Container maxWidth="sm">
        <Box py={3}>
          <Paper elevation={0}>
            <Box px={3} pt={3}>
              <Typography align="center" variant="h4">    
                <strong>Email Verification</strong>
              </Typography>
            </Box>

            {isLoading ? (
              <Box p={3}>
                <LinearProgress color="primary" />
              </Box>
            ) : (
              <React.Fragment>
                {error ? (
                  <React.Fragment>
                    <Box p={3}>
                      <Typography align="center" variant="body2" gutterBottom>
                        There was an error verifying your email.
                      </Typography>
                    </Box>
                    <Snackbar open={isError}>
                      <Alert elevation={6} variant="filled" onClose={this.handleClose} severity="error">
                        {error.message}
                      </Alert>
                    </Snackbar>
                  </React.Fragment>
                ) : (
                  <Box p={3}>
                    <Typography align="center" variant="body2" gutterBottom>
                      Your email has been verified.
                    </Typography>
                    <Button
                      className={classes.button}
                      color="primary"
                      component={RouterLink}
                      fullWidth
                      size="large"
                      to={ROUTES.LANDING}
                      type="button"
                      variant="contained"
                    >
                      Continue
                    </Button>
                  </Box>
                )}
              </React.Fragment>
            )}
          </Paper>
        </Box>
      </Container>
    );
  }
}

const VerifyEmail = compose(
  withStyles(styles, { withTheme: true }),
  withFirebase,
)(VerifyEmailBase);

export default VerifyEmail;
