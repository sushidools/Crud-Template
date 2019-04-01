const uniquePlugin = require('mongoose-unique-validator');
const validator = require('validator');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const RestaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please give a name for the restaurant'],
      minlength: [3, 'Restaurant name must be 3 characters!'],
      validator: {
        unique: [true, 'Restaurant name cannot already exist!'],
      },
      trim: true,
    },
    cuisine: {
      type: String,
      required: [true, 'Please give a cuisine type'],
      minlength: [3, 'Cuisine must be 3 characters!'],
      trim: true,
    },
    reviews: [
      {
        _id: {
          type: String,
        },
        name: {
          type: String,
          required: [true, 'Please give a name for review!'],
          minlength: [3, 'Name must be at least 3 characters!'],
          trim: true,
        },
        star: {
          type: Number,
          default: 1,
          min: [1, 'Cannot be less than 1 star!'],
          max: [5, 'Cannot give more than 5 stars!'],
        },
        content: {
          type: String,
          required: [true, 'Please provide a reason for your review!'],
          minlength: [3, 'Review must be at least 3 characters!'],
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

RestaurantSchema.plugin(uniquePlugin, { message: '{VALUE} is not unique' });

module.exports = mongoose.model('Restaurant', RestaurantSchema);
