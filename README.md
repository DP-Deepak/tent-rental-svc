# tent-rental-svc

This project is about creating tent-inventory-management application
In this project, [AirBnb](https://github.com/airbnb/javascript) guidelines are followed.

## Let's Run the Application

Note: First go to the project (tent-rental-svc) directory.
It should be on master branch.(Default)

Run the command :-

Install the packages.

### `npm i`

Start the server.

### `npm run server`

Now, Open another Terminal.
Again go to project directory and navigate to 'client', inside tent-rental-svc

### `cd tent-rental-svc/client`

Install packages for front-end.

### `npm i`

Run the UI.

### `npm start`

<br />

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# User Journey:

First of all you will see a Welcome page,
There is a choice, you can login from button 'Login' below welcome title or go to the login page through navigation bar.

Until you are not authenticated, you will only be able to see login page.
If you try to navigate using URLs of other pages, You will always be redirect to login page.
Wrong credentials will generate error and shows notification.

## Login:

Use these credentials to login :
Email: admin@gmail.com
Password: password

After successful login, You will be redirected to welcome page. Your name will appear there.
Initialization process to add 5 customers and 5 products will start now.

Navigation bar on the top right will also show some links, you can choose to go to any of the three pages available.
`Customer` `Inventory Report` `Transactions`

# `On Customer Page:`

Initially, You will see 5 customers on this page.
They are sorted by name in ascending order.

## `Add Customer:`

Click on the `Add Customer` button.

A popup will appear, You can enter the customer name here.
After adding the customer, it will appear in the customer table.

# `Important Note`:

You can add any number of customers and products and use them in transactions, can also download the report.
But, once you logout. Your data like, customers, products, transactions will be erased and can't be recover.

Only downloaded reports will be available after that.

# `On Inventory Report Page:`

Initially you will see details of 5 products on this page.
Here, you will see report of all the products that exist in inventory.

You can also add any number of product of your choice.

## `Add Product:`

When you use the 'add product' option. It will open a popup and will ask you to fill some necessary details, rest details will be added automatically.
### Note:
If you add the product which already exist in the inventory, in this case it will update the quantity of existing one accordingly.

To avoid the incorrect details, Error prevention methods are used.

- Total quantity ,Booked quantity and Price can only be numbers.
- Negative numbers are not allowed.(If used, it will generate an error notification).
- Total quantity can not be less than the booked quantity.

You can add any number of products and they will be added in the inventory report.

## `Export to pdf`

This button can be used to download the on-screen Inventory report.
It download the file in browser's default download folder.

## `On Transaction Page`

Initially you will see 2 buttons, `New Transaction` `Reverse Transaction`.

`New Transaction` will be use for the item-out-on-rent.
on the other hand `Reverse Transaction` can be used when the item received back in inventory.
Hence, Reverse transaction can't be made initially. First the transaction to rent-out products should be made.

On clicking the `New Transaction Button`, you will see three fields.
Choose the customer name, The customers which are newly added by you will also appear in this dropdown, select any one of them.
For now, In quantity field. you will see '0 available', it is because the user have not choose any product. Quantity is dependent upon the product.
Once you select the product name from the dropdown list, It will render the available quantity on the quantity field.
It is for user's convenience, he is still free to change products or customers before creating transaction. Quantity will be calculated dynamically for all options in product list.

Error prevention:

- If user try to save without entering all details, error message will appear.
- Minimum inputs are taken from user rest is managed by application itself.
- Rent-out Quantity can not be zero.
- User can't rent-out more than the available products.
- To maintain integrity of the data. These transaction will also update the available quantity in `Inventory Report`.

Once you successfully save the transaction, A table will be visible on this page now.
New transactions will itself be marked as "IN'. While reverse transactions will be marked as "OUT'.

`Reverse Transaction` will be use for the item-back-to-inventory.
It will popup a form which asks you to fill only 2 fields.
First is select transaction id, It will show a list of all the `OUT` transaction. Because you can take back only what you have rent-out.
Select the transaction id for the item which is now back to inventory.

Once you select the field, It will show you the quantity which is out-on-rent, on the next field.

Error prevention:

- If user try to save without entering all details, error message will appear.
- Minimum inputs are taken from user rest is managed by application itself, like parent id, date customer id product id etc.
- get-back-to-inventory Quantity can not be zero.
- User can't get-back more than the quantity he rented-out.
- To maintain integrity of the data. These transaction will also update the available quantity in `Inventory Report` you can see that on Inventory Report page.

Once you successfully create the reverse transaction, Transaction table will update and your transaction will appear on the top. Because the table is sorted by transaction date in descending order.

## `Export to pdf`

Once you are done with you transactions. You can download the report in pdf format.

# Routing Validations:

There are total 5 routes :

- `/login`: It is used to authenticate the user.
- `/customer`: It manages the Customer details.
- `/product`: It manages the Inventory Report.
- `/transaction`: It manages the transactions.

`/login` is the only route which will be available to an unauthorized user all other routes are restricted.
Link to the other pages are not available on Navigation bar until you are not logged in. Using URL to reach on other pages is also restricted.
You will always be redirected to the login page.
After successful login, user can't get back to the login page until there is an active session.
Data is highly secured in UI as well as in the backend.

# Server :
## API with sample payloads :
Base URL: http://localhost:9000/api
Note: Use the below headers throughout the application.
headers: {
"Content-Type": "application/json",
"x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY1MjdlMGFkYzhkZjY3Y2NlNjAxYWRhIn0sImlhdCI6MTU5OTI0MzQ3NH0.IZU1fy5dkWYCwTN4fL4M6KE263E3_af3k9pb2w-DT40"

}

## POST
`/auth`
* First get the token from server.

Sample payload :
{
    "email": "admin@gmail.com",
    "password": "password"
}


`/customer`
* Create a customer.

Sample payload :
{
   "customer_name":"Deepak Prajapati"
}

`/product`
* Add product in inventory.
Sample payload :
{
   "product_title":"Halogen Light",
"quantity_total":"100",
"quantity_booked":"10",
"price":"200"
}

`/transaction`
* Create transaction.

Sample payload :
{
"customer_id":"5f54def14da4d631aef70dc",
"product_id":"5f54def14awc2d631aef70dc",
"transaction_type": "IN",
"quantity":"100",
"transaction_id_parent":"5f54def14aw1dw631aef70dc"
}


## GET

`/customer`
* Return all the existing customers.
`/product`
* Return all the existing products.
* Also accepts product_title in query params.

`/transaction`
* Return all transaction.
* Also accepts transaction_type in query params.

## PUT
`product`
* Update the products available in inventory.
 Sample payload:
 {
    "product_title":"Fan",
   "quantity_booked":"3"
}











