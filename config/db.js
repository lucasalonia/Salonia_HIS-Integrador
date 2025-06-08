require("dotenv").config();
console.log({
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_TIMEZONE: process.env.DB_TIMEZONE,
});
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD || null, 
  {
    host: process.env.DB_HOST, 
    port: process.env.PORT,
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
