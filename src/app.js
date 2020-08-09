import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { compose } from 'recompose';

import Navigation from './navigation';

import Account from './pages/Account';
import Action from './pages/Action';
import Home from './pages/Home';
import Landing from './pages/Landing';
import PasswordForget from './pages/PasswordForget';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import { withStyles } from '@material-ui/core/styles';

import { withAuthentication } from './session';

import * as ROUTES from './constants/routes';

const styles = theme => ({
  top: {
    height: theme.spacing(2),
  },
  bottom: {
    height: theme.spacing(2),
  },
});

class AppBase extends Component {
  render() {
    const { classes } = this.props;

    return(
      <Router>
        
        <Navigation />

        {/* Provides standardized top padding throughout the website */}
        <div className={classes.top} />

        <Route path={ROUTES.ACCOUNT} component={Account} />
        <Route path={ROUTES.ACTION} component={Action} />
        <Route path={ROUTES.HOME} component={Home} />
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
        <Route path={ROUTES.SETTINGS} component={Settings} />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />

        {/* Provides standardized bottom padding throughout the website */}
        <div className={classes.bottom} />

      </Router>
    );
  }
}

const App = compose(
  withStyles(styles, { withTheme: true }),
  withAuthentication,
)(AppBase);

export default App;
