require("dotenv").config();
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD || null, 
  {
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT,
    dialect: "mysql", 
    logging: false, 
    timezone:process.env.DB_TIMEZONE,
  }
);
sequelize.authenticate()
.then(() => {
console.log('Conectado')
})
.catch(err => {
console.log('No se conecto' + err)
})

module.exports = { sequelize };
