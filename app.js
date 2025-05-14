
const express = require("express");
const app = express();
const directorioVistas = __dirname + "/views";
const pug = require("pug");
const fs = require("fs");
const path = require("path");
const PORT = 3000;

const rutasRegistro = require("./router/rutasRegistro");
const rutasEnfermeria = require("./router/rutasEnfermeria");
const rutasPacientes = require("./router/rutasPacientes");

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "pug");
app.set("views", directorioVistas);

//Registro / INDEX
app.use("/", rutasRegistro);

//ENFERMERIA ROUTING
app.use("/enfermeria", rutasEnfermeria);

//PACIENTES ROUTING
app.use("/pacientes", rutasPacientes);


//GET LOGIN
app.get("/login", function (req, res, next) {
  // Your route code
  res.render("login", {
    error: "Usuario o contraseña incorrectos",
  });
});
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
