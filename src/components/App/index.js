import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route // the route to component
} from 'react-router-dom';

// import navigation
import Navigation from '../Navigation';

// import pages
import Account from '../../pages/Account';
import Action from '../../pages/Action';
import Administrator from '../../pages/Administrator';
import Home from '../../pages/Home';
import Landing from '../../pages/Landing';
import PasswordForget from '../../pages/PasswordForget';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';

import { withAuthentication } from '../../session';

import * as ROUTES from '../../constants/routes';

class App extends Component {
  render() {
    return(
      <Router>
        <Navigation />
        <hr />
        <Route path={ROUTES.ACCOUNT} component={Account} />
        <Route path={ROUTES.ACTION} component={Action} />
        <Route path={ROUTES.ADMINISTRATOR} component={Administrator} />
        <Route path={ROUTES.HOME} component={Home} />
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
      </Router>
    );
  }
}

export default withAuthentication(App);
