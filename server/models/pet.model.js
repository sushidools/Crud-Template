const uniquePlugin = require('mongoose-unique-validator');
const validator = require('validator');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const PetSchema = new Schema(
  {
    petName: {
      type: String,
      required: [true, 'Pet name is required'],
      minlength: [3, 'Pet name must be least three characters'],
      trim: true,
      unique: [true, 'The pets name must be unique!']
    },
    petType: {
      type: String,
      required: [true, 'Pet type is required'],
      minlength: [3, 'Pet type must be at least three characters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Pet description is required'],
      minlength: [3, 'Pet description must be at least three characters']
    },
    skill1: {
      type: String
    },
    skill2: {
      type: String
    },
    skill3: {
      type: String
    },
    likes: {
      type: Number,
      default: 0
    },
  },
  {
    timestamps: true,
  }
);

PetSchema.plugin(uniquePlugin, { message: '{VALUE} is not unique' });

module.exports = mongoose.model('Pet', PetSchema);