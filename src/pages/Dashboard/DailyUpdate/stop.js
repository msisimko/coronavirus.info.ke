import React, { Component } from 'react';

import Separator from '../../../components/Separator';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Stop extends Component {
  render() {
    const { id } = this.props;

    return(
      <Grid item xs={12}>
        <Box borderRadius={8} bgcolor="success.main" color="success.contrastText" textAlign="center" py={8} px={2}>
          <Typography variant="h3" gutterBottom>
            <strong>Finished</strong>
          </Typography>
          
          <Typography variant="body2" gutterBottom>
            You have successfully created and posted a new update.
          </Typography>

          <Separator />

          <Typography variant="h6" gutterBottom>
            <strong>{id}</strong>
          </Typography>
        </Box>
      </Grid>
    );
  }
}

export default Stop;