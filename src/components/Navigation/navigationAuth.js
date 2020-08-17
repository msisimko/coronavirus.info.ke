import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { compose } from 'recompose';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import FaceIcon from '@material-ui/icons/Face';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { withFirebase } from '../../firebase';

import { AuthUserContext } from '../../session';

import * as ROUTES from '../../constants/routes';

const styles = theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  leftDrawer: {
    width: 250,
  },
  bottomDrawer: {
    width: 'auto',
  },
});

class NavigationAuthBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      left: false,
      bottom: false,
    };
  }

  // Toggle theme between light or dark
  // on:  src/app.js
  // via: src/navigation/index.js
  toggleTheme = () => {
    this.props.onHandleToggleTheme();
  }

  toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ [anchor]: open });
  };

  render() {
    const { classes, firebase, theme } = this.props;

    const { left, bottom } = this.state;
    
    return(
      <React.Fragment>
        
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} onClick={this.toggleDrawer('left', true)} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>React App</Typography>
            <IconButton onClick={this.toggleTheme} color="inherit" aria-label="Toggle Theme">
              {theme === 'light' ? <Brightness4Icon /> : <BrightnessHighIcon />}
            </IconButton>
            <IconButton onClick={this.toggleDrawer('bottom', true)} color="inherit" aria-label="Sign In">
              <MoreVertIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Left drawer */}
        <Drawer anchor="left" open={left} onClose={this.toggleDrawer('left', false)}>
          <div className={classes.leftDrawer} role="presentation" onKeyDown={this.toggleDrawer('left', false)}>
            <List component="nav" subheader={<ListSubheader color="inherit" disableSticky={true}>Menu</ListSubheader>}>
              <ListItem button onClick={this.toggleDrawer('left', false)} component={NavLink} exact={true} to={ROUTES.HOME} activeClassName="Mui-selected" aria-label="Home">
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button onClick={this.toggleDrawer('left', false)} component={NavLink} exact={true} to={ROUTES.ACCOUNT} activeClassName="Mui-selected" aria-label="Account">
                <ListItemText primary="Account" />
              </ListItem>
              <ListItem button onClick={this.toggleDrawer('left', false)} component={NavLink} exact={true} to={ROUTES.SETTINGS} activeClassName="Mui-selected" aria-label="Settings">
                <ListItemText primary="Settings" />
              </ListItem>
            </List>
          </div>
        </Drawer>

        {/* Bottom drawer */}
        <Drawer anchor="bottom" open={bottom} onClose={this.toggleDrawer('bottom', false)}>
          <div className={classes.bottomDrawer} role="presentation" onClick={this.toggleDrawer('bottom', false)} onKeyDown={this.toggleDrawer('bottom', false)}>
            <List component="nav" subheader={<ListSubheader color="inherit">You are signed in to your account.</ListSubheader>}>
              <AuthUserContext.Consumer>
                { authUser => authUser &&
                  <ListItem divider>
                    <ListItemIcon>
                      <FaceIcon />
                    </ListItemIcon>
                    <ListItemText primary={authUser.email} secondary={authUser.uid} />
                  </ListItem>
                }
              </AuthUserContext.Consumer>
              <ListItem button onClick={firebase.doSignOut} aria-label="Sign Out">
                <ListItemText primary="Sign Out" />
              </ListItem>
            </List>
          </div>
        </Drawer>

      </React.Fragment>
    );
  }
}

const NavigationAuth = compose(
  withStyles(styles, { withTheme: true }),
  withFirebase,
)(NavigationAuthBase);

export default NavigationAuth;
