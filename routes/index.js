const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((request, result) => {
  result.send("<h1>Wrong Route!</h1>")
});

module.exports = router;