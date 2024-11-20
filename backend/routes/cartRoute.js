const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/auth");
const {
    addToCart,
    getCartItems,
    updateCartItem,
    removeFromCart,
    clearCart
} = require("../controllers/cartController");

router.route("/cart/add").post(isAuthenticatedUser, addToCart);
router.route("/cart").get(isAuthenticatedUser, getCartItems);
router.route("/cart/update").put(isAuthenticatedUser, updateCartItem);
router.route("/cart/remove/:productId").delete(isAuthenticatedUser, removeFromCart);
router.route("/cart/clear").delete(isAuthenticatedUser, clearCart);

module.exports = router;
