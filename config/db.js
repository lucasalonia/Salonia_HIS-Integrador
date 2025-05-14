// //CON MYSQL2
// const mysql = require("mysql2");
// //leer datos de archivo de entorno
// require("dotenv").config();

// let connection;

// try {
//   connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   });
//   console.log("Conexión a la base de datos exitosa.");
// } catch (error) {
//   console.error("Error al conectar a la base de datos:", error.message);
//   process.exit(1);
// }

// module.exports = connection.promise();


//CON SEQUELIZE
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
