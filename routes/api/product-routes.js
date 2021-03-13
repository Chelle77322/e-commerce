const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (request, result) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    include: [{
      model: Category,
      attributes: ['id', 'category_name']
    },
  {
    model: Tag,
    attributes: ['id', 'tag_name']
  }]
  })
  .then(dbProductData => result.json(dbProductData))
  .catch(error => {
    console.log(error);
    result.status(500).json(error);
  });
});

// get one product
router.get('/:id', (request, result) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
    where: {
      id: request.params.id
    },
    include: [{
      model: Category,
      attributes: ['id' ,'category_name']
    },
    {
      model: Tag,
      attributes: ['id', 'tag_name']
    }
     ]
  })
  .then(dbProductData => {
    if (!dbProductData){
      result.status(404).json ({ message: " No product was found that matched this id "});
      return;
    }
    result.json(dbProductData);
  })
  .catch(error => {
    console.log(error);
    result.status(500).json(error);
  });
});

// create new product
router.post('/', (request, result) => {
  Product.create({
    product_name: request.body.product_name,
    price: request.body.price,
    stock: request.body.stock,
    category_id: request.body.category_id,
    tagIds: request.body.tag_id
  })

    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (request.body.tagIds.length) {
        const productTagIdArr = request.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      result.status(200).json(product);
    })
    .then((productTagIds) => result.status(200).json(productTagIds))
    .catch((error) => {
      console.log(error);
      result.status(400).json(error);
    });
});

// update product
router.put('/:id', (request, result) => {
  // update product data
  Product.update(request.body, {
    where: {
      id: request.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: request.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = request.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: request.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !request.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => result.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      result.status(400).json(err);
    });
});

router.delete('/:id', (request, result) => {
  // delete one product by its `id` value
});

module.exports = router;
