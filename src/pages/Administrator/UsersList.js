import React, { Component } from 'react';

class UsersList extends Component {
  render() {
    const { users } = this.props;

    return(
      <ul>
        {users.map(user => (
          <li key={user.uid}>
            <span>
              <strong>ID:</strong> {user.uid}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <strong>Username:</strong> {user.displayName}
            </span>
          </li>
        ))}
      </ul>
    );
  }
}

export default UsersList;