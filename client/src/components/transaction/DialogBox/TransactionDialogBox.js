import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { postData, getQuery, updateData } from '../../../api/api';
import { FormControl, InputLabel, Select, MenuItem, withStyles, DialogTitle } from '@material-ui/core';


const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});



class TransactionDialogBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      customer_id: null,
      product_id: null,
      quantity: null,
      customers: null,
      products: null,
      transaction_id: null,
      selectedProduct: null,
      selectedCustomer: null,
      selectedQuantity: null,
      availableQuantity: 0,
      alreadyBookedQuantity: 0,
      inTransactions: null,
      newReverseTransaction: {
        quantity: 0
      },
    }
  }

  saveNewTransaction = async (openSnackbar) => {
    const { customer_id,
      selectedProduct,
      product_id,
      alreadyBookedQuantity,
      quantity, availableQuantity } = this.state
    const { transaction_type } = this.props
    if (customer_id && product_id && transaction_type && quantity > 0 && quantity <= availableQuantity) {
      try {
        await postData({
          customer_id,
          product_id,
          transaction_type, quantity
        }, 'transaction')
        await updateData({
          product_title: selectedProduct,
          quantity_booked: parseInt(alreadyBookedQuantity) + parseInt(quantity)
        }, 'product')
        window.location.reload();
      } catch (error) {
        openSnackbar('Something went wrong!')
      }

    } else {

      openSnackbar('Please enter correct details')
    }
  }
  saveReverseTransaction = async (openSnackbar) => {
    const { newReverseTransaction, quantity, transaction_id } = this.state

    if (transaction_id && quantity > 0) {
      if (quantity < 0 && quantity > newReverseTransaction.quantity) {
        openSnackbar('Incorrect quantity')
      }
      try {
        newReverseTransaction.quantity = quantity
        await postData(newReverseTransaction, 'transaction')
        const allProducts = await getQuery('product')
        if (allProducts.data) {
          const productDetails = allProducts.data.filter(product => newReverseTransaction.product_id.toString() === product._id)


          await updateData({
            product_title: productDetails[0].product_title,
            quantity_booked: parseInt(productDetails[0].quantity_booked) - parseInt(quantity)
          }, 'product')
        }

        window.location.reload();
      } catch (error) {
        openSnackbar('Something went wrong!')
      }
    } else {

      openSnackbar('Please fill correct details')
    }
  }
  onChangeHandler = field => (event) => {
    const { products, customers, inTransactions } = this.state

    this.setState({
      [field]: event.target.value,
    }, () => {
      if (field === 'selectedProduct') {
        const availableQuantity = products.filter(product => product.product_title === this.state.selectedProduct)
        this.setState({
          product_id: availableQuantity[0].product_id,
          alreadyBookedQuantity: availableQuantity[0].quantity_booked,
          availableQuantity: availableQuantity[0].quantity_total - availableQuantity[0].quantity_booked
        })
      }

      if (field === 'transaction_id') {
        const transactionFound = inTransactions.filter(inTransaction => inTransaction.transaction_id === this.state.transaction_id)
        const newReverseTransaction = {
          customer_id: transactionFound[0].customer_id,
          product_id: transactionFound[0].product_id,
          transaction_type: 'OUT',
          quantity: transactionFound[0].quantity,
          transaction_id_parent: this.state.transaction_id
        }
        this.setState({ newReverseTransaction })
      }

      if (field === 'selectedCustomer') {
        const customerFound = customers.filter(customer => customer.customer_name === this.state.selectedCustomer)
        this.setState({
          customer_id: customerFound[0]._id
        })
      }
    }

    );
  }
  async componentDidMount() {
    try {
      const { transaction_type } = this.props
      if (transaction_type === 'IN') {
        const products = await getQuery('product')
        const customers = await getQuery('customer')
        this.setState({ products: products.data, customers: customers.data })
      } else {
        const inTransactions = await getQuery('transaction/?transaction_type=IN')
        this.setState({ inTransactions: inTransactions.data })
      }

    } catch (error) {
      const { handleOpen, openSnackbar } = this.props
      handleOpen(false)
      openSnackbar('Something went wrong!')
    }

  }

  render() {
    const { open, handleOpen, openSnackbar, classes, transaction_type, titleTr } = this.props
    const { products, customers, availableQuantity, inTransactions, newReverseTransaction } = this.state
    return (

      < div >
        <Dialog open={open} onClose={(e) => handleOpen(e, false)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{titleTr} {` `} ({transaction_type})</DialogTitle>
          <DialogContent>
            {(transaction_type === 'IN') &&
              <>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Customer</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={selectedCustomer}
                    onChange={this.onChangeHandler('selectedCustomer')}
                  >
                    {
                      customers && customers.map(customer => {
                        return <MenuItem value={customer.customer_name}>{customer.customer_name}</MenuItem>
                      })
                    }

                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Product</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={selectedProduct}
                    onChange={this.onChangeHandler('selectedProduct')}
                  >
                    {
                      products && products.map(product => {
                        return <MenuItem value={product.product_title} >{product.product_title}</MenuItem>
                      })
                    }

                  </Select>
                </FormControl>
                <TextField
                  className={classes.formControl}
                  id="outlined-number"
                  required
                  onChange={this.onChangeHandler('quantity')}
                  type="number"
                  label={`${availableQuantity} available`}
                />
              </>
            }
            {
              (transaction_type === 'OUT') &&
              <>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Transaction Id</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={selectedProduct}
                    onChange={this.onChangeHandler('transaction_id')}
                  >
                    {
                      inTransactions && inTransactions.map(inTransaction => {
                        return <MenuItem value={inTransaction.transaction_id} >{inTransaction.transaction_id}</MenuItem>
                      })
                    }

                  </Select>
                </FormControl>
                <TextField
                  className={classes.formControl}
                  id="outlined-number"
                  required
                  onChange={this.onChangeHandler('quantity')}
                  type="number"
                  label={`${newReverseTransaction.quantity} items on rent`}
                />
              </>
            }

          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => handleOpen(e, false)} color="primary">
              Cancel
          </Button>
            <Button onClick={(e) => {
              handleOpen(e, false);
              (transaction_type === 'IN') ?
                this.saveNewTransaction(openSnackbar)
                : this.saveReverseTransaction(openSnackbar)
            }} color="primary">
              Add
          </Button>
          </DialogActions>
        </Dialog>
      </div >
    )
  }
}

export default withStyles(styles)(TransactionDialogBox);
