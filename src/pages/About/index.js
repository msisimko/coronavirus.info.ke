import React, { Component } from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class About extends Component {
  render() {
    return(
      <Paper elevation={0} square>
        <Box p={3}>
          <Typography align="center" variant="h4" gutterBottom>
            <strong>About</strong>
          </Typography>
        </Box>
      </Paper>
    );
  }
}

export default About;
