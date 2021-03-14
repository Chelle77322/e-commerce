const express = require('express');
const sequelize =require("./config/connection.js");
const app = express();
const mysql = require('mysql2');
console.log(sequelize);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

sequelize.authentication ().then (()=> {
  console.log('Connection established successfully.');
  console.log(sequelize);

}).catch (error =>{
  console.error("Unable to connect to the database:", error);
}).finally(()=> {
  sequelize.close();

});