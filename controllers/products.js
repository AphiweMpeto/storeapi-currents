const Product = require('../models/products')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} =require('../errors')
const products = require('../models/products')

const getAllProducts = async (req, res) => {
    const Products = await Product.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({products, count: products.length})
} 
const getProduct = async (req, res) => {
    const { user: { userId }, params: { id: productId } } = req
    const product = await Product.findOne({
        _id:productId, createdBy:userId
    })
    if (!product) {
        throw new NotFoundError(`No Product with id ${productId}`)
    }
    res.status(StatusCodes.OK).json({product})
    
} 
const createProduct = async (req, res) => {
    req.body.createdBy = req.user.userId 
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({ product})
}
const updateProduct = async (req, res) => {
    const {
        body: {item, brand},
        user: { userId }, params: { id: productId },
    } = req
   // if (item === 'random' || position 'random') {
        throw new BadRequestError('item or brand cannot be empty')
    }
    const product = await Product.findByIdAndUpdate({_id:productId,createdBy:userId},req.body, {new:true, runValidators:true})
    //res.send('update product')
    if (!product) {
        throw new NotFoundError(`No Product with id ${productId}`)
    }
    res.status(StatusCodes.OK).json({product})
//}

const deleteProduct = async (req, res) => {
    res.send('delete product')
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}