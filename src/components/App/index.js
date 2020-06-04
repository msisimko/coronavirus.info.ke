import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route // the route to component
} from 'react-router-dom';

// import navigation
import Navigation from '../Navigation';

// import pages
import Account from '../../pages/Account';
import Administrator from '../../pages/Administrator';
import Home from '../../pages/Home';
import Landing from '../../pages/Landing';
import PasswordForget from '../../pages/PasswordForget';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';

import { withFirebase } from '../../firebase';

import * as ROUTES from '../../constants/routes';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser 
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { authUser } = this.state;

    return(
      <Router>
        <Navigation authUser={authUser} />
        <hr />
        <Route path={ROUTES.ACCOUNT} component={Account} />
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

export default withFirebase(App);
