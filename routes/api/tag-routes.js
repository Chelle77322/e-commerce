const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (request, result) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product
    }
  })
  .then(tagData => result.json(tagData))
  .catch(error => {
    console.log(error);
    result.status(500).json(error);
  });
});

router.get('/:id', (request, result) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (request, result) => {
  // create a new tag
});

router.put('/:id', (request, result) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (request, result) => {
  // delete on tag by its `id` value
});

module.exports = router;
