import React, { Component } from 'react';

import { withFirebase } from '../../firebase';

class SignOut extends Component {
  render() {
    const { firebase } = this.props;
    
    return(
      <button type="button" onClick={firebase.doSignOut}>
        Sign Out
      </button>
    );
  }
}

export default withFirebase(SignOut);
