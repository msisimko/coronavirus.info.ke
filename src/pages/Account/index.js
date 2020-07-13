import React, { Component } from 'react';

import AccountManage from './AccountManage';
import AccountView from './AccountView';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { withAuthorization } from '../../session';

class Account extends Component {
  render() {
    return(
      <React.Fragment>
        <Container maxWidth="sm">
          <Box pt={2}>
            <Paper elevation={0}>
              <Box p={3}>
                <Typography align="center" variant="h4" gutterBottom>
                  <strong>Account</strong>
                </Typography>
                <Typography align="center" variant="body2" gutterBottom>
                  This page is only accessible to logged in users.
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Container>
      </React.Fragment>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account);

export { AccountView, AccountManage };
