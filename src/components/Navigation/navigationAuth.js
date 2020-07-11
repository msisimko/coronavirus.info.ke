import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import SignOut from '../SignOut';

import AppBar from '@material-ui/core/AppBar';
import Collapse from '@material-ui/core/Collapse';
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

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FaceIcon from '@material-ui/icons/Face';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

class NavigationAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      left: false,
      bottom: false,
      account: false,
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ [anchor]: open });
  };

  toggleMenu = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    
    this.setState({ [anchor]: !open });
  };

  render() {
    const { classes } = this.props;

    const { left, bottom, account } = this.state;
    
    return(
      <React.Fragment>
        
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} onClick={this.toggleDrawer('left', true)} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>Marekia</Typography>
            <IconButton onClick={this.toggleDrawer('bottom', true)} color="inherit" aria-label="Sign In">
              <MoreVertIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Left drawer */}
        <Drawer anchor="left" open={left} onClose={this.toggleDrawer('left', false)}>
          <div className={classes.leftDrawer} role="presentation" onKeyDown={this.toggleDrawer('left', false)}>
            <List component="nav" subheader={<ListSubheader color="primary" disableSticky={true}>Menu</ListSubheader>}>
              <ListItem button onClick={this.toggleDrawer('left', false)} component={NavLink} exact={true} to={ROUTES.HOME} activeClassName="Mui-selected" aria-label="Home">
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button onClick={this.toggleMenu('account', account)} aria-label="Account">
                <ListItemText primary="Account" />
                {account ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={account} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button onClick={this.toggleDrawer('left', false)} className={classes.nested} component={NavLink} exact={true} to={ROUTES.ACCOUNT_VIEW} activeClassName="Mui-selected" aria-label="View Account">
                    <ListItemText primary="View Account" />
                  </ListItem>
                  <ListItem button onClick={this.toggleDrawer('left', false)} className={classes.nested} component={NavLink} exact={true} to={ROUTES.ACCOUNT_MANAGE} activeClassName="Mui-selected" aria-label="Manage Account">
                    <ListItemText primary="Manage Account" />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </div>
        </Drawer>

        {/* Bottom drawer */}
        <Drawer anchor="bottom" open={bottom} onClose={this.toggleDrawer('bottom', false)}>
          <div className={classes.bottomDrawer} role="presentation" onClick={this.toggleDrawer('bottom', false)} onKeyDown={this.toggleDrawer('bottom', false)}>
            <List component="nav" subheader={<ListSubheader color="primary">You are signed in to your account.</ListSubheader>}>
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
              <SignOut />
            </List>
          </div>
        </Drawer>

      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NavigationAuth);
