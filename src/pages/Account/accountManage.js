import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { compose } from 'recompose';

import UpdateEmail from '../../components/UpdateEmail';
import UpdatePassword from '../../components/UpdatePassword';
import UpdateProfile from '../../components/UpdateProfile';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import { withAuthorization, withEmailVerification } from '../../session';

import * as ROUTES from '../../constants/routes';

class AccountManageBase extends Component {
  render() {
    return(
      <React.Fragment>
        <Container maxWidth="sm">
          <Box py={3}>
            <Paper elevation={0}>
              <Box p={3}>
                <Button fullWidth size="large" color="primary" component={RouterLink} to={ROUTES.ACCOUNT_VIEW}>
                  View Account
                </Button>
              </Box>
            </Paper>
          </Box>
        </Container>
        
        <UpdateProfile />
        <UpdateEmail />
        <UpdatePassword />
      </React.Fragment>
    );
  }
}

const condition = authUser => !!authUser;

const AccountManage = compose(
  withAuthorization(condition),
  withEmailVerification,
)(AccountManageBase);

export default AccountManage;
