const { Product } = require('../models');

const productData = [
  {
    product_name: 'Maple Crunch Slime',
    price: 14.99,
    stock: 14,
    category_id: 1,
  },
  {
    product_name: 'Peanut Butter Slime',
    price: 90.0,
    stock: 25,
    category_id: 5,
  },
  {
    product_name: 'Unicorn Glitter Slime',
    price: 22.99,
    stock: 12,
    category_id: 4,
  },
  {
    product_name: 'Toffee Apple Gloss Slime',
    price: 12.99,
    stock: 50,
    category_id: 3,
  },
  {
    product_name: 'Chocolate Milkshake Slime',
    price: 29.99,
    stock: 22,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
