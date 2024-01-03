const Category = require("./category");
const Product = require("./product");
const User = require("./user")
const Cart = require("./cart")
const CartProduct = require("./cart_product")
const Order = require("./order")
const OrderProduct = require("./order_product")

// https://medium.com/@the_ozmic/how-to-create-many-to-many-relationship-using-sequelize-orm-postgres-on-express-677753a3edb5
// https://medium.com/@tavilesa12/dealing-with-many-to-many-associations-in-sequelize-bddc34201b80


Product.belongsTo(Category, {foreignKey: 'categoryId'})
Category.hasMany(Product, {foreignKey: 'categoryId'})

// One to one mapping of users and cart
// Cart belongs to one user
// User has one cart

User.hasOne(Cart)
Cart.belongsTo(User, {foreignKey: "userId"})


// Many to Many mapping between cart and products
// Cart has many products through cart_products
// Product belongs to many cart through cart_products

Cart.belongsToMany(Product, {through: CartProduct})
Product.belongsToMany(Cart, {through: CartProduct})


Order.belongsTo(User, {foreignKey: "userId"})
User.hasMany(Order, {foreignKey: "userId"})


Order.belongsToMany(Product, {through: OrderProduct})
Product.belongsToMany(Order, {through: OrderProduct})


module.exports = {
    Category, Product, User, Cart, CartProduct, Order, OrderProduct
}