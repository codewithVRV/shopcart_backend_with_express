const Sequelize = require("sequelize")

const db = require("../config/db_config")

const Order = db.define("order", {
    status: {
        type: Sequelize.ENUM({
            values: ["pending", "cancelled", "successfull"]
        }),
        allowNull: false,
    },
    userId : {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
})

module.exports = Order;