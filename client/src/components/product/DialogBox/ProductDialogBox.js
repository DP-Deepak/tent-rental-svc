import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { postData } from '../../../api/api';

class ProductDialogBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product_title: null,
      quantity_total: null,
      quantity_booked: null,
      price: null,
    }
  }

  saveProduct = async (openSnackbar) => {
    const { product_title,
      quantity_total,
      quantity_booked,
      price } = this.state

    if (product_title && quantity_total && quantity_booked && price && quantity_total < quantity_booked) {
      try {
        await postData({
          product_title,
          quantity_total,
          quantity_booked,
          price
        }, 'product')
        window.location.reload();
      } catch (error) {
        openSnackbar('Something went wrong!')
      }
    } else {

      openSnackbar('Please fill the correct details')
    }
  }

  onChangeHandler = field => (event) => {
    this.setState({
      [field]: event.target.value,
    });
  }
  render() {
    const { open, handleOpen, openSnackbar } = this.props
    return (
      < div >
        <Dialog open={open} onClose={(e) => handleOpen(e, false)} aria-labelledby="form-dialog-title">
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Product Name"
              type="text"
              fullWidth
              required
              onChange={this.onChangeHandler('product_title')}
            />
            <TextField
              id="outlined-number"
              label="Total Quantity"
              required
              type="number"
              onChange={this.onChangeHandler('quantity_total')}
            />
            <TextField
              id="outlined-number"
              label="Booked Quantity"
              required
              onChange={this.onChangeHandler('quantity_booked')}
              type="number"
            />
            <TextField
              id="outlined-number"
              required
              onChange={this.onChangeHandler('price')}
              label="Price"
              type="number"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => handleOpen(e, false)} color="primary">
              Cancel
          </Button>
            <Button onClick={(e) => {
              handleOpen(e, false)
              this.saveProduct(openSnackbar)
            }} color="primary">
              Add
          </Button>
          </DialogActions>
        </Dialog>
      </div >
    )
  }
}

export default ProductDialogBox;
