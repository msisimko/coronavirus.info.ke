import React, { Component } from 'react';
import { compose } from 'recompose';

import UsersList from './UsersList';

import { withFirebase  } from '../../firebase';
import { withAuthorization } from '../../session';

import * as ROLES from '../../constants/roles';

class AdministratorBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    }
  }

  componentDidMount() {
    // set loading to true
    this.setState({ loading: true });

    // set users state with data from database
    this.listener = this.props.firebase.users()
      .onSnapshot((querySnapshot) => {
        let users = []; // array users: initialize

        querySnapshot.forEach((doc) => {
          let userObject = doc.data();    // object userObject: initialize with doc.data()
          userObject.uid = doc.id;        // object userObject: add doc.id => uid
          users.push(userObject);         // array users: add userObject
        });
        
        this.setState({
          users: users,
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { users, loading } = this.state;

    return(
      <React.Fragment>
        <h1>Administrator</h1>

        { loading && <div>Loading...</div> }

        <UsersList users={users} />

        <p>This page is only accessible to logged in users, who are administrators.</p>
      </React.Fragment>
    );
  }
}

const condition = authUser => 
  authUser && !!authUser.roles[ROLES.ADMINISTRATOR];

const Administrator = compose(
  withFirebase,
  withAuthorization(condition),
)(AdministratorBase);

export default Administrator;
