import React, { Component } from 'react';
import { compose } from 'recompose';

import AccountManage from './accountManage';
import AccountView from './accountView';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { withAuthorization, withEmailVerification } from '../../session';

class AccountBase extends Component {
  render() {
    return(
      <React.Fragment>
        <Container maxWidth="sm" disableGutters>
          <Box py={3}>
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

const Account = compose(
  withAuthorization(condition),
  withEmailVerification,
)(AccountBase);

export default Account;

export { AccountView, AccountManage };
