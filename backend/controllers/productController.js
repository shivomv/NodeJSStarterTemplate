const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("./../models/productModel");
const asyncErrorHandler = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create Product -- Admin
exports.createProduct = asyncErrorHandler(async (req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

// Get all Products
exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .paginate(resultPerPage);

    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        productCount,
        products,
        resultPerPage,
    });
});


// Get Product By Id
exports.getProductById = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product Not Found"
        });
    }
    res.status(200).json({
        product
    });
});

// Update Product -- Admin
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false
    });

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        product
    });
});

// Delete Product -- Admin
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product Not Found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Product Deleted"
    });
});
