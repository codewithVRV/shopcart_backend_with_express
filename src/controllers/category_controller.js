const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const CategoryService = require('../services/category_service');
const {CategoryRepository, ProductRespository} = require('../repositories/index');
const errorResponse = require('../utils/error_response');

const categoryService = new CategoryService(new CategoryRepository(), new ProductRespository());

async function createCategory(req, res) {

    try {
        
        const response = await categoryService.createCategory(req.body);
    
        return res
                .status(StatusCodes.CREATED)
                .json({
                    sucess: true,
                    error: {},
                    message: ReasonPhrases.CREATED + " Category",
                    data: response
        });

    } catch(error) {
        console.log("CategoryController Something went wrong", error);
        return res.status(error.statusCode).json(errorResponse(error.reason, error))
    }

}

async function getAllCategories(req, res) {

    try {
        
        const response = await categoryService.getAllCategories();
    
        return res
                .status(StatusCodes.OK)
                .json({
                    sucess: true,
                    error: {},
                    message: "Successfully fetched Categories",
                    data: response
        });

    } catch(error) {
        console.log("CategoryController Something went wrong", error);
        return res.status(error.statusCode).json(errorResponse(error.reason, error))    }

}


async function getCategory(req, res) {

    try {
        
        const response = await categoryService.getCategory(req.params.id);
    
        return res
                .status(StatusCodes.OK)
                .json({
                    sucess: true,
                    error: {},
                    message: "Successfully fetched Category",
                    data: response
        });

    } catch(error) {
        console.log("CategoryController Something went wrong", error);
        return res.status(error.statusCode).json(errorResponse(error.reason, error))    }

}
async function getProductsForCategory(req, res) {

    try {
        
        const response = await categoryService.getProductsForCategory(req.params.id);
        console.log("response of getPorudct from controller", response)
    
        return res
                .status(StatusCodes.OK)
                .json({
                    sucess: true,
                    error: {},
                    message: "Successfully fetched Products for the category",
                    data: response
        });

    } catch(error) {
        console.log("CategoryController Something went wrong", error);
        return res.status(error.statusCode).json(errorResponse(error.reason, error))    }

}


async function destroyCategory(req, res) {

    try {
        
        const response = await categoryService.destroyCategory(req.params.id);
    
        return res
                .status(StatusCodes.OK)
                .json({
                    sucess: true,
                    error: {},
                    message: "Successfully deleted Category",
                    data: response
        });

    } catch(error) {
        console.log("CategoryController Something went wrong", error);
        return res.status(error.statusCode).json(errorResponse(error.reason, error))    }

}


module.exports = {
    destroyCategory,
    getCategory,
    createCategory,
    getAllCategories,
    getProductsForCategory,
}