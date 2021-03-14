const express = require('express');
const { Z_ERRNO } = require('node:zlib');
const sequelize = require('./config/connection');
const routes = require('./routes');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync ({force: false}).then(() => {
  app.listen(PORT, () => console.log(`App is now listening on port ${PORT}`));
});

