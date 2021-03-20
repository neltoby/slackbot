const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const userResponseSchema = new Schema(
  {
    response: [{ 
      question_0: String, 
      question_1: [String], 
      question_2: [String], 
      question_3: String, 
    }],
    user: { type: String, ref: 'User' },
  },
  { timestamps: true },
);

userResponseSchema.plugin(uniqueValidator);

exports.UserResponse = mongoose.model('UserResponse', userResponseSchema);
