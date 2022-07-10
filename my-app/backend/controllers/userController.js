// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {

  //Get all users
  async allUsers( req, res) {
    const userData = await User.findAll()

    if (!userData) {
        return res.status(400).json({ message: 'Cannot find all users!' });
    }

    res.json("found all users", userData);
  },

  // get a single user by either their id or their username
  async getSingleUser({ user = null, params }, res) {
    const singleUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    });

    if (!singleUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(singleUser);
  },
  // create a user, sign a token
  async createUser( req, res) {
    const user = await User.create({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });

    if (!user) {
      return res.status(400).json({ message: 'Couldn\'t create user!' });
    }
    const token = signToken(user);
    res.json({ message: 'Created user', token, user });
  },
  // login a user, sign a token, and send it back
  async login( req, res ) {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(400).json({ message: 'Wrong password or email entered!' });
    }

    const correctPw = user.isCorrectPassword(req.body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password or email entered!' });
    }
    const token = signToken(user);
    res.status(200).json({ message: 'Logging in!', token, user} );
  },
  
  // Delete a user
  async deleteUser( req, res) {
    const delUser = await User.destroy({ where: { id: req.params.id}});

    if (!delUser) {
      return res.status(400).json({ message: 'Couldn\'t find user!' });
    }

    res.status(200).json({ message: "Deleting user", delUser});
  },

  // Update a user
  async updateUser( req, res) {
    const user = await User.updateOne(
      {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
      }, { where: { id: req.params.id } });

    if (!user) {
      return res.status(400).json({ message: 'Couldn\'t update user!' });
    }
    res.status(200).json({ message: 'updated user', user });
  },
};