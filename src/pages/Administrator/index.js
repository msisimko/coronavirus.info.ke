import React, { Component } from 'react';
import { compose } from 'recompose';

import UsersList from './UsersList';

import { withFirebase  } from '../../firebase';
import { withAuthorization } from '../../session';

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
        let usersList = []; // array usersList: initialize

        querySnapshot.forEach((doc) => {
          let userObject = doc.data();    // object userObject: initialize with doc.data()
          userObject.uid = doc.id;        // object userObject: add doc.id => uid
          usersList.push(userObject);     // array usersList: add userObject
        });
        
        this.setState({
          users: usersList,
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

        <p>This page is only accessible to logged in users.</p>
      </React.Fragment>
    );
  }
}

const condition = authUser => !!authUser;

const Administrator = compose(
  withFirebase,
  withAuthorization(condition),
)(AdministratorBase);

export default Administrator;
