import React, { Component } from 'react';
import { compose } from 'recompose';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { withStyles } from '@material-ui/core/styles';

import { withSnackbar } from 'notistack';
 
import { withFirebase } from '../../../firebase';

import { AuthUserContext } from '../../../session';

const styles = theme => ({
  table: {
    minWidth: 275,
  },
});

const INITIAL_STATE = {
  allSources: [],
}

class ListSourcesBase extends Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.listener = this.props.firebase
                      .sources()
                      .orderBy("createdOn", "desc")
                      .onSnapshot((querySnapshot) => {
                        let allSources = [];
                        querySnapshot.forEach((doc) => {
                          allSources.push({ id: doc.id, name: doc.data().sourceName, createdBy: doc.data().createdBy });
                        });
                        this.setState({ allSources });
                      });
  }

  componentWillUnmount() {
    this.listener();
  }

  handleDelete(source) {
    const { enqueueSnackbar } = this.props;

    this.props.firebase
      .source(source.id)
      .delete()
      .then(() => {
        enqueueSnackbar(`${source.name} has successfully been deleted.`, { variant: 'success' });
      })
      .catch(error => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };

  render() {
    const { classes } = this.props;

    const { allSources } = this.state;
    
    const authUser = this.context;

    return(
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <caption>A list of all the sources in the database. </caption>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2}>Source Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allSources.length === 0 ? (
                  <React.Fragment>
                    <TableRow key={0}>
                      <TableCell colSpan={2}>
                        <Box color="text.disabled">There are currently no sources in the database.</Box>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {allSources.map((source) => (
                      <TableRow key={source.id} hover>
                        <TableCell component="th" scope="row">
                          {source.name}
                        </TableCell>
                        <TableCell align="right">
                          <Button size="small" onClick={() => this.handleDelete(source)} disabled={authUser.uid !== source.createdBy}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  }
}

const ListSources = compose(
  withStyles(styles, { withTheme: true }),
  withSnackbar,
  withFirebase,
)(ListSourcesBase);

export default ListSources;
