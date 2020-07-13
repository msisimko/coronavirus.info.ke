import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { withFirebase } from '../../../firebase';

import * as ROUTES from '../../../constants/routes';

const INITIAL_STATE = {
  isLoading: true,
  loadingError: null,
};

class RecoverEmail extends Component {
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
    const { isLoading, loadingError } = this.state;

    const isLoaded = !isLoading && !loadingError;

    return(
      <Container maxWidth="sm">
        <Box pt={2}>
          <Paper elevation={0}>
            <Box p={3}>
              <Typography align="center" variant="h4" gutterBottom>
                <strong>Email Recovery</strong>
              </Typography>
              
              {isLoading &&
                <LinearProgress color="primary" />
              }

              {loadingError &&
                <Typography align="center" variant="body2" gutterBottom>
                  {loadingError.message}
                </Typography>
              }

              {isLoaded &&
                <Typography align="center" variant="body2" gutterBottom>
                  The request to change your email address has successfully been revoked.
                </Typography>
              }
            </Box>
          </Paper>
        </Box>
        
        {isLoaded &&
          <Box pt={2}>
            <Paper elevation={0}>
              <Box p={3}>
                <Button fullWidth size="large" color="primary" component={RouterLink} to={ROUTES.LANDING}>
                  Continue
                </Button>
              </Box>
            </Paper>
          </Box>
        }
      </Container>
    );
  }
}

export default withFirebase(RecoverEmail);
