import React from 'react';
import { getQuery } from '../../api/api';
import Loader from '../Loader/Loader';
import CustomerTable from '../Table/CustomTable'
import { Redirect } from 'react-router-dom';
import { SharedSnackbarConsumer } from '../../context/SharedSnackbar.context';
import { Button } from '@material-ui/core';
import ProductDialogBox from './DialogBox/ProductDialogBox';
import DownloadPdf from '../DownloadPdf/Download';


class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      products: {},
      column: [],
      isError: false,
      open: false,
      pdfData: null,
      pdfColumn: null,
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

      const res = await getQuery('product')

      const products = res.data.map(({ product_title, quantity_total, quantity_booked }) => ({
        Item_Name: product_title,
        Available_Quantity: parseInt(quantity_total) - parseInt(quantity_booked)
      }))
      const pdfData = products.map(({ Item_Name, Available_Quantity }, index) =>
        [index + 1, Item_Name, Available_Quantity])
      const pdfColumn = Object.keys(products[0])
      pdfColumn.unshift('ID')
      this.setState({ loading: false, pdfColumn, pdfData, products, column: Object.keys(products[0]) })

    } catch (error) {
      this.setState({ loading: false, isError: true })
    }
  }


  render() {
    const { loading, products, column, pdfColumn, isError, open, pdfData } = this.state
    return < SharedSnackbarConsumer >
      {({ openSnackbar }) => {
        return (
          (loading) ? <Loader /> : ((isError) ? (this.handleError(openSnackbar)) :
            <>
              <CustomerTable
                data={products}
                loader={loading}
                dataLength={products.dataLength}
                column={column}
              />
              <Button style={{ marginTop: '30px' }} variant="outlined" color="primary" onClick={(e) => this.openDialogBox(e, true)}>
                Add Product
           </Button>
              {
                column.length &&
                <Button style={{ marginTop: '30px', marginLeft: '50px' }} variant="outlined" color="primary"
                  onClick={() => DownloadPdf(pdfColumn, pdfData)} >
                  Export to pdf
           </Button>
              }
              {open && <ProductDialogBox open handleOpen={this.openDialogBox} openSnackbar={openSnackbar} />}
            </>
          ))
      }
      }
    </SharedSnackbarConsumer >
  }
}

export default Product;
