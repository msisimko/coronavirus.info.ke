import React, { Component } from 'react';

import { RecoverEmail, ResetPassword, VerifyEmail } from '../../components/Action';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const INITIAL_STATE = {
  mode: null,
  oobCode: null,
};

class Action extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);

    this.setState({
      mode: query.get('mode'),
      oobCode: query.get('oobCode'),
    });
  }

  render() {
    const { mode, oobCode } = this.state;

    switch (mode) {
      case 'recoverEmail':
        return (
          <Container maxWidth="sm">
            <Box py={3}>
              <RecoverEmail actionCode={oobCode} />
            </Box>
          </Container>
        );
      case 'resetPassword':
        return (
          <Container maxWidth="sm">
            <Box py={3}>
              <ResetPassword actionCode={oobCode} />
            </Box>
          </Container>
        );
      case 'verifyEmail':
        return (
          <Container maxWidth="sm">
            <Box py={3}>
              <VerifyEmail actionCode={oobCode} />
            </Box>
          </Container>
        );
      default:
        return(
          <Container maxWidth="sm">
            <Box py={3}>
              <Paper elevation={0}>
                <Box p={3}>
                  <Typography align="center" variant="h4" gutterBottom>
                    <strong>Oops...</strong>
                  </Typography>
                  <Typography align="center" variant="body2" gutterBottom>
                    Invalid action.
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Container>
        );
    }
  }
}

export default Action;
