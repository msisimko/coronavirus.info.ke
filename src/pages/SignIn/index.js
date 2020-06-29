import React, { Component } from 'react';

import SignInForm from './signInForm';
import SignInLink from './signInLink';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { AuthUserContext } from '../../session';

import * as ROUTES from '../../constants/routes';

class SignIn extends Component {
  static contextType = AuthUserContext;
  
  componentDidMount() {
    // If signed in, redirect to Home
    let authUser = this.context;
    authUser && this.props.history.push(ROUTES.HOME);
  }

  render() {
    return(
      <Container maxWidth="sm">
        <Box py={3}>
          <Paper elevation={0}>
            <Box px={3} pt={3}>
              <Typography align="center" variant="h4">    
                <strong>Log In</strong>
              </Typography>
            </Box>

            <Box p={3}>
              <SignInForm />
            </Box>

            <Box px={3} pb={1}>
              <SignUpLink />
            </Box>

            <Box px={3} pb={3}>
              <PasswordForgetLink />
            </Box>
          </Paper>
        </Box>
      </Container>
    )
  }
}
 
export default SignIn;

export { SignInForm, SignInLink };
