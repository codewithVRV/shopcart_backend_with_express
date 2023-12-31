const ProductRespository = require("../repositories/product_repository")
const FakeStoreRepository = require("../repositories/fake_store_repository")
const CategoryRepository = require("../repositories/category_repository")
const UserRepository = require("../repositories/user_repository")
const CartRepository = require("../repositories/cart_repository")
const OrderRepository = require("../repositories/order_repository")

module.exports = {
    ProductRespository, FakeStoreRepository, CategoryRepository, UserRepository,
    CartRepository, OrderRepository,
}