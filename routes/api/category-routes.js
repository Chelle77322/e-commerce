const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (request, result) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{
      model: Product,
      attributes:['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then(dbCategoryData => result.json(dbCategoryData))
  .catch(error => {
    console.log(error);
    result.status(500).json(error);
  });
});

router.get('/:id', (request, result) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: request.params.id
    },
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then(dbCategoryData => {
    if (!dbCategoryData){
      result.status(404).json({message: 'No category found matching this id'});
      return;
    }
    result.json(dbCategoryData);
  })
  .catch(error => {
    console.log(error);
    result.status(500).json(error);
  });
});

router.post('/', (request, result) => {
  // create a new category
  Category.create({
    category_name: request.body.category_name
  })
  .then(dbCategoryData => result.json(dbCategoryData))
  .catch(error => {
    console.log(error);
    result.status(500).json(error);
  });
});

router.put('/:id', (request, result) => {
  // update a category by its `id` value
  Category.update(request.body, {
    where: {
      id: request.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData[0]){
      result.status(404).json ({ message: 'No category matches this id'});
      return;
    }
    result.json(dbCategoryData);
  })
  .catch(error => {
    console.log(error);
    result.status(500).json(error);

  });
});

router.delete('/:id', (request, result) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id: request.params.id
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData){
      result.status(404).json ({ message: 'No category matches this id'});
      return;
    }
    result.json(dbCategoryData);
    console.log(dbCategoryData);
    console.log(result);
  })
  .catch(error => {
    console.log(error);
    result.status(500).json(error);
  });
});

module.exports = router;
