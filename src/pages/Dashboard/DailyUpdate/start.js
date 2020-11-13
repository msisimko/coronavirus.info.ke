import React, { Component } from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Start extends Component {
  render() {
    return(
      <Grid item xs={12}>
        <Box borderRadius={8} bgcolor="primary.main" color="primary.contrastText" textAlign="center" py={8} px={2}>
          <Typography variant="h3" gutterBottom>
            <strong>Start Here</strong>
          </Typography>
          
          <Typography variant="body2" gutterBottom>
            Click <strong>Next</strong> above to create a new update.
          </Typography>
        </Box>
      </Grid>
    );
  }
}

export default Start;