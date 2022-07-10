const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  allUsers,
  login,
  updateUser,
  deleteUser,
} = require('../../controllers/userController.js');
const { authMiddleware } = require('../../utils/auth');

//Create a user
router.route('/create').post(createUser).put(authMiddleware);

//login
router.route('/login').post(login);

//user profile
router.route('/me').get(authMiddleware, getSingleUser);

//Delete logged in user
router.route('/:id').delete(authMiddleware, deleteUser);

//Update logged in user
router.route('/:id').put(authMiddleware, updateUser);

module.exports = router;