const router = require('express').Router();
const userRoutes = require('./userRoutes');

// Prefix all routes in the user routes with `/users`
router.use('/users', userRoutes);

module.exports = router;