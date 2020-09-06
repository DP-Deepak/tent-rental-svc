import React from 'react';
import { getQuery } from '../../api/api';
import Loader from '../Loader/Loader';
import CustomerTable from '../Table/CustomTable'
import { Redirect } from 'react-router-dom';
import { SharedSnackbarConsumer } from '../../context/SharedSnackbar.context';
import { Button } from '@material-ui/core';
import DialogBox from './DialogBox/CustomerDialogBox';


class Customer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      customers: {},
      isError: false,
      open: false,
    }
  }


  handleError = (openSnackbar) => {
    openSnackbar('Something went wrong!')
    return <Redirect to="/" />
  }

  openDialogBox = (e, open) => {
    e.preventDefault()
    this.setState({ open: open })
  }

  async componentDidMount() {
    try {
      const res = await getQuery('customer')
      this.setState({ loading: false, customers: res.data })
    } catch (err) {
      this.setState({ loading: false, isError: true })
    }
  }

  render() {
    const { loading, customers, isError, open } = this.state
    const column = ['customer_name']
    return < SharedSnackbarConsumer >
      {({ openSnackbar }) => {
        return (
          (loading) ? <Loader /> : ((isError) ? (this.handleError(openSnackbar)) :
            <>
              <CustomerTable
                data={customers}
                loader={loading}
                dataLength={customers.dataLength}
                column={column}
              />
              <Button style={{ marginTop: '30px' }} variant="outlined" color="primary" onClick={(e) => this.openDialogBox(e, true)}>
                Add Customer
             </Button>
              {open && <DialogBox open handleOpen={this.openDialogBox} openSnackbar={openSnackbar} />}
            </>
          ))

      }
      }
    </SharedSnackbarConsumer>
  }
}

export default Customer;
