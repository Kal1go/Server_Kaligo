/* eslint-disable max-len */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
      appleID: {type: String, required: true, unique: true},
      email: {type: String},
      name: {type: String, required: true},
    },
    {timestamps: true},
);

User.plugin(require('mongoose-autopopulate'));
module.exports = {
  UserModel: mongoose.model('users', User),
};
