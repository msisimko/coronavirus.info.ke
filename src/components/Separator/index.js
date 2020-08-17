import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  separator: {
    height: theme.spacing(2),
  },
});

class Separator extends Component {
  render() {
    const { classes } = this.props;

    return(
      <div className={classes.separator} />
    );
  }
}

export default withStyles(styles, { withTheme: true })(Separator);
