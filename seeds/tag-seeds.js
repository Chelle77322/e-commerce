const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'pink gloss',
  },
  {
    tag_name: 'peanut butter',
  },
  {
    tag_name: 'glossy',
  },
  {
    tag_name: 'crunchy',
  },
  {
    tag_name: 'sparkly',
  },
  {
    tag_name: 'smooth',
  },
  {
    tag_name: 'gold',
  },
  {
    tag_name: 'popping',
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
