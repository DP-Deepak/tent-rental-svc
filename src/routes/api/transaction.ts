import { middleware } from '../../middleware/auth';
import * as express from 'express';
import { check, validationResult } from 'express-validator'
import { TransactionModel } from '../../models';


const transactionRouter = express.Router();

// @route      GET /api/customer/
// @desc       Get all out-on-rent transaction
// @access     Private
transactionRouter.get('/',
  middleware,
  async (req, res) => {
    try {
      let transaction = (req.query.transaction_type) ?
        await TransactionModel.find({ transaction_type: req.query.transaction_type })
        : await TransactionModel.find({}).sort( { "transaction_date_time": -1 } )

      if (!transaction) {
        return res.status(404).send('No transaction found')
      }
      return res.status(200).json(transaction);
    } catch (e) {
      res.status(500).send('Server Error')
    }
  }
)

// @route      POST /api/transaction/
// @desc       Create Transaction
// @access     Private
transactionRouter.post('/',
  [
    middleware,
    [check('customer_id', 'customer_id is required')
      .isString(),
    check('product_id', 'product_id is required')
      .isString(),
    check('transaction_type', 'transaction_type is required')
      .isString(),
    check('quantity', 'quantity is required')
      .isNumeric(),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      // Add product in DB.
      const transaction = new TransactionModel(req.body)
      await transaction.save()
      return res.json(transaction);
    } catch (e) {
      res.status(500).send('Server Error')
    }
  }
)

export default transactionRouter;