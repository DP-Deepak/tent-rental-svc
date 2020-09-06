import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { postData } from '../../../api/api';

const DialogBox = (props) => {
  const [customerName, setCustomerName] = useState('')
  const { open, handleOpen, openSnackbar } = props
  const handleChange = (e) => {
    setCustomerName(e.target.value)
    console.log('==e==', customerName);
  }

  const saveCustomer = async () => {
    try {
      console.log('==customerName===d==', customerName);
      await postData({ customer_name: customerName }, 'customer')
      window.location.reload();
    } catch (error) {
      openSnackbar('Something went wrong!')
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={(e) => handleOpen(e, false)} aria-labelledby="form-dialog-title">
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Customer Name"
            type="text"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleOpen(e, false)} color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => {
            handleOpen(e, false)
            saveCustomer()
          }} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogBox;
