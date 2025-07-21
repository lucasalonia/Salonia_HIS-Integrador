const express = require("express");
const app = express();
const directorioVistas = __dirname + "/views";
const pug = require("pug");
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
const PORT = process.env.PORT;


const passportSetup = require("./config/passport-setup");
const rutasRegistro = require("./router/rutasRegistro");
const rutasEnfermeria = require("./router/rutasEnfermeria");
const rutasPacientes = require("./router/rutasPacientes");
const rutasAdministracion = require("./router/rutasAdministracion");
const rutasMedicina = require("./router/rutasMedicina");
const { router: rutaAutenticacion, autenticacionCheck } = require("./router/autenticacion");



app.use(session({
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "pug");
app.set("views", directorioVistas);


app.use("/autenticacion", rutaAutenticacion);

//Registro / INDEX
app.use("/",autenticacionCheck, rutasRegistro);

//ENFERMERIA ROUTING
app.use("/enfermeria",autenticacionCheck, rutasEnfermeria);

//MEDICINA ROUTING
app.use("/medicina",autenticacionCheck, rutasMedicina);

//PACIENTES ROUTING
app.use("/pacientes", autenticacionCheck,rutasPacientes);


//ADMINISTRACION ROUTING
app.use("/administracion",autenticacionCheck, rutasAdministracion);




//REDIRECCIONAMIENTO DE RUTAS
app.use((req, res, next) => {
  res.status(404).render("notFound");
});
;
//ESCUCHANDO PUERTO DETERMINADO POR CONSTANTE "PORT"
app.listen(PORT, () => {
  console.log(`Servidor en puerto http://localhost:${PORT}`);
});

module.exports = app;
