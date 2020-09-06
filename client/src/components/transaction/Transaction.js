import React from 'react';
import { getQuery } from '../../api/api';
import Loader from '../Loader/Loader';
import CustomerTable from '../Table/CustomTable'
import { Redirect } from 'react-router-dom';
import { SharedSnackbarConsumer } from '../../context/SharedSnackbar.context';
import { Button } from '@material-ui/core';
import TransactionDialogBox from './DialogBox/TransactionDialogBox';
import moment from 'moment'
import DownloadPdf from '../DownloadPdf';


class Transaction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      transaction: {},
      column: [],
      isError: false,
      pdfData: null,
      pdfColumn: null,
      openReverse: false,
    }
  }

  handleError = (openSnackbar) => {
    openSnackbar('Something went wrong!')
    return <Redirect to="/" />
  }

  async componentDidMount() {
    try {
      const res = await getQuery('transaction');
      if (res.data.length > 0) {
        const transaction = res.data.map(({ transaction_id, transaction_date_time, transaction_type, quantity }) => ({
          Transaction_ID: transaction_id,
          Date_Time: moment(transaction_date_time).format('MMMM Do YYYY, h:mm:ss a'),
          Type: transaction_type,
          Quantity: quantity
        }));
        const pdfData = transaction.map(({ Transaction_ID, Date_Time, Type, Quantity }, index) =>
          [index + 1, Transaction_ID, Date_Time, Type, Quantity])
        const pdfColumn = Object.keys(transaction[0])
        pdfColumn.unshift('ID')
        this.setState({ loading: false, pdfData, pdfColumn, transaction, column: Object.keys(transaction[0]) })
      }
      this.setState({ loading: false })
    }
    catch (error) {

      this.setState({ loading: false, isError: true })
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

  openReverseTransaction = (e, open) => {
    e.preventDefault()
    this.setState({ openReverse: open })
  }

  render() {
    const { loading, transaction, column, isError, open, pdfData, pdfColumn, openReverse } = this.state
    return (
      <SharedSnackbarConsumer>
        {({ openSnackbar }) => {

          return (
            (loading) ? <Loader /> : ((isError) ? (this.handleError(openSnackbar)) :
              <>
                {transaction.length > 0 && <CustomerTable
                  data={transaction}
                  loader={loading}
                  dataLength={transaction.dataLength}
                  column={column}
                />}
                <Button style={{ marginTop: '30px', marginRight: '25px' }} variant="outlined" color="primary" onClick={(e) => this.openDialogBox(e, true)}>
                  New Transaction
                </Button>
                {
                  column.length > 0 &&
                  <Button style={{ marginTop: '30px', marginLeft: '50px', marginRight: '50px' }} variant="outlined" color="primary"
                    onClick={() => DownloadPdf(pdfColumn, pdfData)} >
                    Export to pdf
           </Button>
                }
                <Button style={{ marginTop: '30px',  marginLeft: '25px' }} variant="outlined" color="primary" onClick={(e) => this.openReverseTransaction(e, true)}>
                  Reverse Transaction
                </Button>
                {open && <TransactionDialogBox open handleOpen={this.openDialogBox} titleTr="New Transaction " transaction_type="IN" openSnackbar={openSnackbar} />}
                {openReverse && <TransactionDialogBox open handleOpen={this.openReverseTransaction} titleTr="Reverse Transaction " transaction_type="OUT" openSnackbar={openSnackbar} />}
              </>
            ))
        }}
      </SharedSnackbarConsumer>
    )
  }
}

export default Transaction;
