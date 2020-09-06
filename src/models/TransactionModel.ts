import * as mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
  transaction_id: {
    type: String,
  },
  transaction_date_time: {
    type: Date,
    default: Date.now
  },
  customer_id: {
    type: String,
    required: true
  },
  product_id: {
    type: String,
    required: true
  },
  transaction_type: {
    type: String,
    enum: ['IN', 'OUT'],
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  transaction_id_parent: {
    type: String,
    default: 'N/A'
  },
}, { versionKey: false });
// pre save hook
TransactionSchema.pre('save', function preSave() {
  this.transaction_id = this._id.toString();
});
const TransactionModel = mongoose.model('transactions', TransactionSchema)

export default TransactionModel;