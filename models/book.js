'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
 
    static associate(models) {
      // define association here
    }
  }

  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false, // Disallows null values
      validate: {
        notEmpty: {
          msg: "The title must not be empty" // Error message for empty string
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false, // Disallows null values
      validate: {
        notEmpty: {
          msg: "The author must not be empty" // Error message for empty string
        }
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });

  return Book;
};
