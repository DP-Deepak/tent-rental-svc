import { middleware } from '../../middleware/auth';
import * as express from 'express';
import { check, validationResult } from 'express-validator'
import { CustomerModel } from '../../models';


const customerRouter = express.Router();



// @route      GET /api/customer/
// @desc       Get all Customers
// @access     Private
customerRouter.get('/',
    middleware,
  async (req, res) => {
    try {
      let customer = await CustomerModel.find({ }).sort( { "customer_name": 1 } )
      if (!customer) {
        return res.status(404).send('No customer found')
      }
      return res.status(200).json(customer);
    } catch (e) {
      res.status(500).send('Server Error')
    }
  }
)


// @route      POST /api/customer/
// @desc       Create Customer
// @access     Private
customerRouter.post('/',
  [
    middleware,
    [check('customer_name', 'customer_name is required')
      .isString(),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      let customer = await CustomerModel.findOne({ customer_name: req.body.customer_name })
      if (customer) {
        return res.status(409).send('Customer already exist')
      }

      // Add customer in DB.
      customer = new CustomerModel(req.body)
      await customer.save()
      return res.status(200).json(customer);
    } catch (e) {
      res.status(500).send('Server Error')
    }
  }
)

export default customerRouter;