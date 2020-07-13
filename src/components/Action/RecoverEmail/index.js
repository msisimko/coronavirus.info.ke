import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { compose } from 'recompose';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import { withFirebase } from '../../../firebase';

import * as ROUTES from '../../../constants/routes';

const styles = theme => ({
  button: {
    margin: theme.spacing(3, 0, 2),
  },
});

const INITIAL_STATE = {
  isLoading: true,
  loadingError: null,
};

class RecoverEmailBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const { actionCode } = this.props;

    this.props.firebase
      .doCheckActionCode(actionCode)
      .then(() => {
        return this.props.firebase.doApplyActionCode(actionCode);
      })
      .catch(loadingError => {
        this.setState({ loadingError });
      })
      .then(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { classes } = this.props;

    const { isLoading, loadingError } = this.state;

    return(
      <Paper elevation={0}>
        <Box px={3} pt={3}>
          <Typography align="center" variant="h4">    
            <strong>Email Recovery</strong>
          </Typography>
        </Box>

        <Box p={3}>
          {isLoading ? (
            <LinearProgress color="primary" />
          ) : (
            <React.Fragment>
              {loadingError ? (
                <Typography align="center" variant="body2">
                  {loadingError.message}
                </Typography>
              ) : (
                <React.Fragment>
                  <Typography align="center" variant="body2">
                    The request to change your email address has been revoked.
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
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </Box>
      </Paper>
    );
  }
}

const RecoverEmail = compose(
  withStyles(styles, { withTheme: true }),
  withFirebase,
)(RecoverEmailBase);

export default RecoverEmail;
