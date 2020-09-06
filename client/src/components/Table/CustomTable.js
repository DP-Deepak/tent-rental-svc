import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  Paper,
} from '@material-ui/core';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 500,
    maxWidth: 5000
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    cursor: 'pointer',
  },
});

const CustomTable = (props) => {


  const {
    classes, data, column
  } = props;
  console.log('== data, column, order, act==', classes,data);
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
              <TableCell> ID </TableCell>
            {
              column.map(col => {
                return (
                  <TableCell >
              {col}
            </TableCell>
                )
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((row, index) => (
              <TableRow key={row.id} className={classes.row} hover>
                <TableCell>{index+1}</TableCell>
                {
                  column.map((col) => {
                    let value = row[col];

                    return (
                      <TableCell >
                        {value}
                      </TableCell>
                    );
                  })
                }

              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </Paper>
  );
};

CustomTable.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};

export default withStyles(styles)(CustomTable)
