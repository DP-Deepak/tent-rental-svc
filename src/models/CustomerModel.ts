import * as mongoose from 'mongoose'

const CustomerSchema = new mongoose.Schema({
  customer_id: {
    type: String,
  },
  customer_name: {
    type: String,
    required: true
  },
}, {versionKey: false});

// pre save hook
CustomerSchema.pre('save', function preSave() {
  this.customer_id = this._id.toString();
});
const CustomerModel = mongoose.model('customers', CustomerSchema);

export default CustomerModel;