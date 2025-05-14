require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD || null, 
  {
    host: process.env.DB_HOST, 
    dialect: "mysql", 
    logging: false, 
  }
);
sequelize.authenticate()
.then(() => {
console.log('Conectado')
})
.catch(err => {
console.log('No se conecto'+err)
})

module.exports = { sequelize };
