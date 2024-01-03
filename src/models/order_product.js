const db = require("../config/db_config")
const Sequelize = require("sequelize")


const OrderProduct = db.define("order_products", {
    orderId : {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "Orders",
            key: "id"
        }
    },
    productId : {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "Products",
            key: "id"
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});

module.exports = OrderProduct;