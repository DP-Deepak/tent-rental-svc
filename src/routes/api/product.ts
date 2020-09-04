import { middleware } from '../../middleware/auth';
import * as express from 'express';
import { check, validationResult } from 'express-validator'
import { ProductModel } from '../../models';


const productRouter = express.Router();

// @route      GET /api/product/
// @desc       Get all Products
// @access     Private
productRouter.get('/',
    middleware,
  async (req, res) => {
    try {
      let product = await ProductModel.find({ })
      if (!product) {
        return res.status(404).send('No product found')
      }

      return res.status(200).json(product);
    } catch (e) {
      console.log('Error in customer:', e.message);
      res.status(500).send('Server Error')
    }
  }
)

// @route      POST /api/product/
// @desc       Create Product
// @access     Private
productRouter.post('/',
  [
    middleware,
    [check('quantity_total', 'quantity_total is required')
      .isNumeric(),
    check('quantity_booked', 'quantity_booked is required')
      .isNumeric(),
    check('product_title', 'product_title is required')
      .isString(),
    check('price', 'price is required')
      .isNumeric(),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const {
        product_title,
        quantity_total,
        quantity_booked,
        price
      } = req.body
      let product = await ProductModel.findOne({ product_title: req.body.product_title })

      if (product) {
        //Update the existing product
        const productField = {
          product_title,
          quantity_total: parseInt(product.quantity_total) + parseInt(quantity_total),
          quantity_booked: parseInt(product.quantity_booked) + parseInt(quantity_booked),
          price,
        }
        const updatedProduct = await ProductModel.findOneAndUpdate({ product_title: req.body.product_title },
          { $set: productField }
        )
        return res.json(updatedProduct);
      }

      // Add product in DB.
      product = new ProductModel(req.body)
      await product.save()
      return res.status(200).json(product);
    } catch (e) {
      console.log('Error in product:', e.message);
      res.status(500).send('Server Error')
    }
  }
)


// @route      PUT /api/product/
// @desc       Update Product
// @access     Private
productRouter.put('/',
  middleware,
  async (req, res) => {

    try {
      let product = await ProductModel.findOne({ product_title: req.body.product_title })

      if (product) {
        const updatedProduct = await ProductModel.findOneAndUpdate({ product_title: req.body.product_title },
          { $set: req.body }
        )
        return res.json(updatedProduct);
      }

      // Add product in DB.
      product = new ProductModel(req.body)
      await product.save()
      return res.status(200).json(product);
    } catch (e) {
      console.log('Error in product:', e.message);
      res.status(500).send('Server Error')
    }
  }
)


export default productRouter;