
const express = require("express");
const app = express();
//Constante para el directorio de vistas pug
const directorioVistas = __dirname + "/views";
const pug = require("pug");
const fs = require("fs");
const path = require("path");
const PORT = 3000;

const rutasRegistro = require("./router/rutasRegistro");
const rutasEnfermeria = require("./router/rutasEnfermeria");

//Middleware urlencoded para recuperar los datos del formulario.
// Para que el body-parser pueda leer los datos del formulario.
//Los datos qque vienen en el cuerpo del post los va a poblar en el objeto req.body
app.use(express.urlencoded());
//Middleware json para recuperar los datos del formulario. Para que el body-parser pueda leer los datos del formulario.
app.use(express.json());
//Esto lo usamos para que el navegador pueda acceder a los archivos estaticos como css, js, imagenes, etc
app.use(express.static("public"));

//TEST PUG
//View engine
app.set("view engine", "pug");
//Configuramos el directorio de vistas
app.set("views", directorioVistas);



//TEST ROUTING 
//Registro / INDEX
app.use("/", rutasRegistro);
//ENFERMERIA ROUTING
app.use("/enfermeria", rutasEnfermeria);



//GET LOGIN
app.get("/login", function (req, res, next) {
  // Your route code
  res.render("login", {
    error: "Usuario o contraseña incorrectos",
  });
});



//PROTOCOLOS POST
//Test POST LOGIN
app.post("/ingreso", (req, res) => {
  const { usuario, contraseña } = req.body;

  const usuariosPath = path.join(__dirname, "ingresoTest.json");

  fs.readFile(usuariosPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error leyendo usuarios.json:", err);
      return res.status(500).send("Error interno del servidor");
    }

    const usuarioGuardado = JSON.parse(data);

    if (
      usuario === usuarioGuardado.nombre &&
      contraseña === usuarioGuardado.contraseña
    ) {
      res.redirect("index"); //
    } else {
      res.render("login", { error: "Usuario o contraseña incorrectos" });
    }
  });
});




//REDIRECCIONAMIENTO DE RUTAS
app.use((req, res, next) => {
  res.status(404).render("notFound");
});
;
//ESCUCHANDO PUERTO DETERMINADO POR CONSTANTE "PORT"
app.listen(PORT, () => {
  console.log("Servidor en puerto http://localhost:3000");
});
