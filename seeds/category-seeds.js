const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Crunchy Slime',
  },
  {
    category_name: 'Fluffy Slime',
  },
  {
    category_name: 'Glossy Slime',
  },
  {
    category_name: 'Butter Slime',
  },
  {
    category_name: 'Glitter Slime',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
