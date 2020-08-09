import React, { Component } from 'react';

import SignUpForm from './signUpForm';
import SignUpLink from './signUpLink';

import { SignInLink } from '../SignIn';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { AuthUserContext } from '../../session';

import * as ROUTES from '../../constants/routes';

class SignUp extends Component {
  static contextType = AuthUserContext;
  
  componentDidMount() {
    // If signed in, redirect to Home
    let authUser = this.context;
    authUser && this.props.history.push(ROUTES.HOME);
  }

  render() {
    return(
      <Container maxWidth="sm">
        <Box pt={2}>
          <Paper elevation={0}>
            <Box p={3}>
              <Typography align="center" variant="h4" gutterBottom>    
                <strong>Sign Up</strong>
              </Typography>
              
              <SignUpForm />
              
              <SignInLink />
            </Box>
          </Paper>
        </Box>
      </Container>
    )
  }
}
 
export default SignUp;

export { SignUpForm, SignUpLink };
