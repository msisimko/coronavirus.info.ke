import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { withFirebase } from '../../firebase';

class SignOut extends Component {
  render() {
    const { firebase } = this.props;
    
    return(
      <ListItem button onClick={firebase.doSignOut} aria-label="Sign Out">
        <ListItemText primary="Sign Out" />
      </ListItem>
    );
  }
}

export default withFirebase(SignOut);
