import React, { Component } from 'react';
import { compose } from 'recompose';

import UpdateEmail from './UpdateEmail';
import UpdatePassword from './UpdatePassword';
import UpdateProfile from './UpdateProfile';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { withAuthorization, withEmailVerification } from '../../session';

class SettingsBase extends Component {
  render() {
    return(
      <React.Fragment>
        <Container maxWidth="sm">
          <Box pt={2}>
            <Paper elevation={0}>
              <Box p={3}>
                <Typography align="center" variant="h4" gutterBottom>
                  <strong>Settings</strong>
                </Typography>
                <Typography align="center" variant="body2" gutterBottom>
                  This page is only accessible to logged in users.
                </Typography>
              </Box>
            </Paper>
          </Box>

          <Box pt={2}>
            <UpdateProfile />
          </Box>

          <Box pt={2}>
            <UpdateEmail />
          </Box>

          <Box pt={2}>
            <UpdatePassword />
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}

const condition = authUser => !!authUser;

const Settings = compose(
  withAuthorization(condition),
  withEmailVerification,
)(SettingsBase);

export default Settings;

export { UpdateEmail, UpdatePassword, UpdateProfile };
