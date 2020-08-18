import React, { Component } from 'react';

import SignInForm from './signInForm';
import SignInLink from './signInLink';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';

import Box from '@material-ui/core/Box';
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
      <Paper elevation={0} square>
        <Box p={3}>
          <Typography align="center" variant="h4" gutterBottom>    
            <strong>Log In</strong>
          </Typography>

          {/* Sign in form */}
          <SignInForm />
          
          {/* Sign up link */}
          <SignUpLink />
          
          {/* Password forget link */}
          <PasswordForgetLink />
        </Box>
      </Paper>
    )
  }
}
 
export default SignIn;

export { SignInForm, SignInLink };
