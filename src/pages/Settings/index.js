import React, { Component } from 'react';
import { compose } from 'recompose';

import UpdateEmail from './UpdateEmail';
import UpdatePassword from './UpdatePassword';
import UpdateProfile from './UpdateProfile';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { withAuthorization, withEmailVerification } from '../../session';

class SettingsBase extends Component {
  render() {
    return(
      <Container maxWidth="sm">
        <Paper elevation={0} square>
          <Box p={3}>
            <Typography align="center" variant="h4" gutterBottom>
              <strong>Settings</strong>
            </Typography>
            <Typography align="center" variant="body2" gutterBottom>
              This page is only accessible to logged in users.
            </Typography>
          </Box>

          <Divider variant="middle" />
          
          {/* Update profile form */}
          <Box p={3}>
            <UpdateProfile />
          </Box>

          <Divider variant="middle" />

          {/* Update email form */}
          <Box p={3}>
            <UpdateEmail />
          </Box>
          
          <Divider variant="middle" />
          
          {/* Update password form */}
          <Box p={3}>
            <UpdatePassword />
          </Box>
        </Paper>
      </Container>
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
