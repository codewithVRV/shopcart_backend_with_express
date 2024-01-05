const db = require("../config/db_config")
const Sequelize = require("sequelize")


const CartProduct = db.define("cart_products", {
    cartId : {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "carts",
            key: "id"
        }
    },
    productId : {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "products",
            key: "id"
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
})

module.exports = CartProduct;