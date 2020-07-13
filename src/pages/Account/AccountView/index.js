import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { compose } from 'recompose';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import PersonIcon from '@material-ui/icons/Person';

import { AuthUserContext, withAuthorization, withEmailVerification } from '../../../session';

import * as ROUTES from '../../../constants/routes';

class AccountViewBase extends Component {
  render() {
    return(
      <Container maxWidth="sm">
        <Box pt={2}>
          <Paper elevation={0}>
            <Box p={3}>
              <AuthUserContext.Consumer>
                { authUser => authUser &&
                  <React.Fragment>
                    <Grid container spacing={2}>
                      <Grid item sm={4} xs={12}>
                        <Box display="flex" justifyContent="center">
                          <Box>
                            {authUser.photoURL ? (
                              <Avatar style={{ width: '100px', height: '100px'}} alt={authUser.displayName} src={authUser.photoURL} />
                            ) : (
                              <Avatar style={{ width: '100px', height: '100px'}}>
                                <PersonIcon style={{ fontSize: 60 }} />
                              </Avatar>
                            )}
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                        {/* Visible on screen sizes SM, MD, LG & XL */}
                        <Hidden xsDown>
                          <Typography variant="h4" gutterBottom>
                            <strong>{authUser.displayName}</strong>
                          </Typography>
                          <Typography variant="h6" gutterBottom>
                            <strong>{authUser.email}</strong>
                          </Typography>
                          {authUser.emailVerified ? (
                            <Typography variant="body2" gutterBottom>
                              Your email address is verified.
                            </Typography>
                          ) : (
                            <Typography variant="body2" gutterBottom>
                              Please verify your email address.
                            </Typography>
                          )}
                        </Hidden>
                        {/* Visible on screen sizes XS only */}
                        <Hidden smUp>
                          <Typography align="center" variant="h4" gutterBottom>
                            <strong>{authUser.displayName}</strong>
                          </Typography>
                          <Typography align="center" variant="h6" gutterBottom>
                            <strong>{authUser.email}</strong>
                          </Typography>
                          {authUser.emailVerified ? (
                            <Typography align="center" variant="body2" gutterBottom>
                              Your email address is verified.
                            </Typography>
                          ) : (
                            <Typography align="center" variant="body2" gutterBottom>
                              Please verify your email address.
                            </Typography>
                          )}
                        </Hidden>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                }
              </AuthUserContext.Consumer>
            </Box>
          </Paper>
        </Box>

        <Box pt={2}>
          <Paper elevation={0}>
            <Box p={3}>
              <Button fullWidth size="large" color="primary" component={RouterLink} to={ROUTES.ACCOUNT_MANAGE}>
                Manage Account
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    );
  }
}

const condition = authUser => !!authUser;

const AccountView = compose(
  withAuthorization(condition),
  withEmailVerification,
)(AccountViewBase);

export default AccountView;
