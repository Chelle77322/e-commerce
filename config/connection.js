const Sequelize = require('sequelize');
require ('dotenv').config({path: __dirname +`/../env`});
require ('config-json');

let sequelize;
if (process.env.JAWSDB_URL){
  sequelize =  new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, 
    {
      host:'localhost',
      dialect:'mysql',
      port: 4002,
      dialectOptions: {
        decimalNumbers: true,
      },
    });
}

  console.log(sequelize);
 
  

module.exports = sequelize;
