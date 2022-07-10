const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Schema to create a course model
const userSchema = new Schema(
  { 

    firstname: {
      type: String,
      required: true,
      trim: true,
    },

    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'A valid email address is required']
      },

      password: {
        type: String,
        required: true,
        minlength: 8,
      },
  },

);

// Check entered password if it matches password in db
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

const User = model('User', userSchema);

module.exports = User;