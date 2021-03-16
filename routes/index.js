const router = require('express').Router();
const apiRoutes = require('./api/index');

router.use('/api', apiRoutes); // Issue here

router.use((request, result) => {//Issue here
  result.send("<h1>Wrong Route!</h1>")
  console.log(router)
});

module.exports = router;