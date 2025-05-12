const express = require('express');
const router = express.Router();

// Import route modules
const userRoutes = require('./userRoutes');
const logRoutes = require('./logRoutes');

// Mount routes
router.use('/users', userRoutes);
router.use('/logs', logRoutes);

module.exports = router;
