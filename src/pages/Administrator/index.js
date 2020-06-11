import React, { Component } from 'react';
import { compose } from 'recompose';

import UserList from './UserList';

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
    this.listener = this.props.firebase.users().onSnapshot(function(doc) {
      const usersObject = doc.data();

      console.log(usersObject);

      // const userList = Object.keys(usersObject).map(key => ({
      //   ...usersObject[key],
      //   uid: key,
      // }));

      // this.setState({
      //   users: userList,
      //   loading: false,
      // });
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

        <UserList users={users} />

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
