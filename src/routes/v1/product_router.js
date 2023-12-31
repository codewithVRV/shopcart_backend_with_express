const express = require('express');

const { createProduct, getProducts, getProduct, destroyProduct, searchProduct } = require('../../controllers/product_controller');
const { createProductValidator, } = require('../../middlewares/product_middlewares');

const productRouter = express.Router();


productRouter.post('/', [createProductValidator], createProduct); // mapping a route to a controller
productRouter.get('/',  getProducts); // mapping a route to a controller
productRouter.get('/:id', getProduct);
productRouter.delete('/:id', destroyProduct);
productRouter.get("/search", searchProduct)

module.exports = productRouter;