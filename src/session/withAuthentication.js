import React from 'react';
import { compose } from 'recompose';

import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

import AuthUserContext from './context';

import { withFirebase } from '../firebase';

const styles = theme => ({
  loading: {
    position: 'absolute', 
    top: '50%', 
    transform: 'translateY(-50%)',
  },
});

const withAUthentication = Component => {
  class WithAUthentication extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        authUser: 'loading',
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          this.setState({ authUser });
        },
        () => {
          this.setState({ authUser: null });
        },
      );
    }
  
    componentWillUnmount() {
      this.listener();
    }

    render() {
      const { classes } = this.props;

      const { authUser } = this.state;

      return (
        <React.Fragment>
          { authUser === 'loading' ? (
            <Container className={classes.loading} disableGutters={true} maxWidth={false}>
              <LinearProgress color="primary" />
            </Container>
          ): (
            <AuthUserContext.Provider value={authUser}>
              <Component {...this.props} />
            </AuthUserContext.Provider>
          )}
        </React.Fragment>
      );
    }
  }

  return compose(
    withStyles(styles, { withTheme: true }),
    withFirebase,
  )(WithAUthentication);
}

export default withAUthentication;
