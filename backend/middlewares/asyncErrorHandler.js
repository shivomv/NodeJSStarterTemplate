const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch((err) => {
            const message ="Internal Server Error";
            res.status(err.statusCode || 500).json({
                success: false,
                message
            });
        });
};

module.exports = asyncHandler;
