const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    team_id: { type: String, required: true }
  },
  { timestamps: true },
);

userSchema.pre('remove', function (next) {
  this.model('UserResponse').deleteMany({ user: this.id }, next);
});

userSchema.plugin(uniqueValidator);

exports.User = mongoose.model('User', userSchema);
