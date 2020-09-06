import * as bcrypt from 'bcrypt';
import UserModel from '../models/UserModel';
import { envVariable } from '../config/configuration';
import ProductModel from '../models/ProductModel';
import { products, customers } from './mockData';
import CustomerModel from '../models/CustomerModel';
import { TransactionModel } from '../models';

const seed = async () => {

  let user = await UserModel.countDocuments();
  let { name, email, password } = envVariable
  // Encrypt password
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt)
  if (user <= 0) {
    user = new UserModel({
      name,
      email,
      password,
    })
    await user.save();
  }
  //Re-build Products
  let product = await ProductModel.deleteMany({})
  products.forEach(async oneProduct => {
    const { product_title, quantity_total, quantity_booked, price } = oneProduct
    product = new ProductModel({
      product_title,
      quantity_total,
      quantity_booked,
      price
    })
    await product.save()
  });

  //Re-build Customers
  let customer = await CustomerModel.deleteMany({})
  customers.forEach(async (oneCustomer) => {
    const { customer_name } = oneCustomer
    customer = new CustomerModel({
      customer_name
    })
    await customer.save()
  });

  //Remove all transactions
  await TransactionModel.deleteMany({})

}

export default seed;