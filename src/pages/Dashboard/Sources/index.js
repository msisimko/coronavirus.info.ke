import React, { Component } from 'react';

import AddSource from './addSource';
import ListSources from './listSources';

import Separator from '../../../components/Separator';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
  },
});

class Sources extends Component {
  render() {
    const { classes } = this.props;

    return(
      <Accordion elevation={0} square>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
          <Box p={1}>
            <Typography className={classes.heading} variant="h6">Sources</Typography>
            <Typography className={classes.secondaryHeading} variant="subtitle1">Add a new or delete an old source of information.</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12}>

              <AddSource />

              <Separator />

              <Box color="primary.main">
                <Typography variant="overline" gutterBottom>
                  <strong>List of Sources</strong>
                </Typography>
              </Box>

              <Separator />

              <ListSources />

            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Sources);
