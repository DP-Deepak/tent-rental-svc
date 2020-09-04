import * as mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  product_id: {
    type: String,
  },
  product_title: {
    type: String,
    required: true
  },
  quantity_total: {
    type: Number,
  },
  quantity_booked: {
    type: Number,
  },
  price: {
    type: Number,
  },
});
//pre save hook
ProductSchema.pre('save', function preSave() {
  this.product_id = this._id.toString();
});

const ProductModel = mongoose.model('products', ProductSchema)

export default ProductModel;
