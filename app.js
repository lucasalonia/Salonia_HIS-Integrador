//Documento java que controla las llamadas a los endpoints de la API el cual podria devolver usuario
//El index va a recuperar los datos  e interactura con el controlador

//Importamos express
const express = require("express");
//Creamos variable de aplicacion que por convencion se denomina app
const app = express();
//Constante para el directorio de vistas pug
const directorioVistas = __dirname + "/views";
const pug = require("pug");
const fs = require("fs");
const path = require("path");
const PORT = 3000;

const rutasPaciente = require("./router/rutasPaciente");

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


//PROTOCOLOS GET
//GET INDEX
//Testeo para cargar info externa con forEach y harcodeada
app.get("/", function (req, res, next) {
  fs.readFile('alaTest.json','utf8',(error, data)=>{
    if(error){
        res.status(500).send("Error interno del servidor. Archivo no encontrado")
        return;

    }
    else{

      const alaData = JSON.parse(data);
      const alas = alaData.map(ala => ala.nombre);

      //hardcodeamos un bojeto para la vista a modo de testeo
      const habitaciones = [
        { id: "01", cantidadCamas: 2 },
        { id: "02", cantidadCamas: 1 },
      ];
      const camas = [
        { id: "C1", libre: true, higienizada: true },
        { id: "C2", libre: false, higienizada: true },
      ];

      var locals = {
        title: "Home",
        alas: alas,
        habitaciones: habitaciones.map(habitacion => habitacion.id),
        camas: camas.map(cama => cama.id)

      };
      res.render("index", locals);
    }
  });
 
});

//Las rutas a partir de aqui deberan ser protegidas por algun middleware de autenticacion

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


//TEST ROUTING 
app.use("/paciente", rutasPaciente);



//REDIRECCIONAMIENTO DE RUTAS
app.use((req, res, next) => {
  res.redirect("/"); 
});
;
//ESCUCHANDO PUERTO DETERMINADO POR CONSTANTE "PORT"
app.listen(PORT, () => {
  console.log("Servidor en puerto http://localhost:3000");
});
