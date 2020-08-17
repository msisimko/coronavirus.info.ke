import React from 'react';

import PasswordForgetForm from './passwordForgetForm';
import PasswordForgetLink from './passwordForgetLink';

import { SignUpLink } from '../SignUp';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { AuthUserContext } from '../../session';

import * as ROUTES from '../../constants/routes';

class PasswordForget extends React.Component {
  static contextType = AuthUserContext;
  
  componentDidMount() {
    // If signed in, redirect to Home
    let authUser = this.context;
    authUser && this.props.history.push(ROUTES.HOME);
  }

  render() {
    return(
      <Container maxWidth="lg" disableGutters>
        <Paper elevation={0} square>
          <Box p={3}>
            <Typography align="center" variant="h4" gutterBottom>    
              <strong>Forgot Password?</strong>
            </Typography>

            {/* Password forget form */}
            <PasswordForgetForm />

            {/* Sign up link */}
            <SignUpLink />
          </Box>
        </Paper>
      </Container>
    )
  }
}
 
export default PasswordForget;

export { PasswordForgetForm, PasswordForgetLink };
