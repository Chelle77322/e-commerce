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
  Tag.findOne ({
    where:{ id: request.params.id},
    include:{model: Product}
  })
  .then(tagData => result.json(tagData))
  .catch(error => {
    console.log(error);
    result.status(500).json(error);
  });
});

router.post('/', (request, result) => {
  // create a new tag
  Tag.create({
    tag_name: request.body.tag_name})
    .then(tagData => result.json(tagData))
    .catch(error => {
      console.log(error);
      result.status(500).json (error);
    });
});

router.put('/:id', (request, result) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: request.body.tag_name},
    { where: { id: request.params.id}
  })
  .then(tagData => {
    if (!tagData){
      result.status(404).json ({message: 'No Tag was found that matched the ID'});
      return;
    }
    result.json(tagData);
  })
  .catch(error => {
    console.log(error);
    result.status(500).json(error);
  });
});

router.delete('/:id', (request, result) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: { id: request.params.id}
  })
  .then(tagData => {
    if (!tagData){
      result.status(404).json({message: 'No Tag was found matching that ID'});
      return;
    }
    result.json(tagData);
  })
  .catch(error => {
    console.log(error);
    result.status(500).json (error);
  });
});

module.exports = router;
