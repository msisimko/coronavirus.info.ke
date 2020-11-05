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
  allCounties: [],
}

class ListCountiesBase extends Component {
  static contextType = AuthUserContext;

  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.listener = this.props.firebase
                      .counties()
                      .orderBy("countyCode", "asc")
                      .onSnapshot((querySnapshot) => {
                        let allCounties = [];
                        querySnapshot.forEach((doc) => {
                          allCounties.push({ id: doc.id, name: doc.data().countyName, code: doc.data().countyCode, createdBy: doc.data().createdBy });
                        });
                        this.setState({ allCounties });
                      });
  }

  componentWillUnmount() {
    this.listener();
  }

  handleDelete(county) {
    const { enqueueSnackbar } = this.props;

    this.props.firebase
      .county(county.id)
      .delete()
      .then(() => {
        enqueueSnackbar(`${county.name} County has successfully been deleted.`, { variant: 'success' });
      })
      .catch(error => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
  };

  render() {
    const { classes } = this.props;

    const { allCounties } = this.state;
    
    const authUser = this.context;

    return(
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <caption>A list of all the counties in the database. </caption>
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell colSpan={2}>County Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allCounties.length === 0 ? (
                  <React.Fragment>
                    <TableRow key={0}>
                      <TableCell colSpan={3}>
                        <Box color="text.disabled">There are currently no counties in the database.</Box>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {allCounties.map((county) => (
                      <TableRow key={county.id} hover>
                        <TableCell>
                          {county.code}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {county.name}
                        </TableCell>
                        <TableCell align="right">
                          <Button size="small" onClick={() => this.handleDelete(county)} disabled={authUser.uid !== county.createdBy}>Delete</Button>
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

const ListCounties = compose(
  withStyles(styles, { withTheme: true }),
  withSnackbar,
  withFirebase,
)(ListCountiesBase);

export default ListCounties;
