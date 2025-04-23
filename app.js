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

//Middleware urlencoded para recuperar los datos del formulario. Para que el body-parser pueda leer los datos del formulario.
app.use(express.urlencoded());

//Middleware json para recuperar los datos del formulario. Para que el body-parser pueda leer los datos del formulario.
app.use(express.json());

//Esto lo usamos para que el navegador pueda acceder a los archivos estaticos como css
app.use('/public',express.static(__dirname + "/public"));

//TEST PUG
//View engine
app.set("view engine", "pug");

//Configuramos el directorio de vistas
app.set("views", directorioVistas);

//Las rutas a partir de aqui deberan ser protegidas por algun middleware de autenticacion
app.get("/", function (req, res, next) {
  // Your route code
  var locals = {
    title: "Ingreso"
  };
  res.render("ingreso", { title: "Ingreso", error: "Usuario o contraseña incorrectos" });
});

app.post("/login", (req, res) => {

  const { usuario, contraseña } = req.body;

  const usuariosPath = path.join(__dirname, "ingresoTest.json");

  fs.readFile(usuariosPath, "utf8", (err, data) => {

    if (err) {

      console.error("Error leyendo usuarios.json:", err);
      return res.status(500).send("Error interno del servidor");

    }

    const usuarioGuardado = JSON.parse(data);

    if (usuario === usuarioGuardado.nombre &&contraseña === usuarioGuardado.contraseña ){

      res.redirect("/index"); // 

    } 
    else {
      res.render("ingreso", { error: "Usuario o contraseña incorrectos" }); 
    }
  });
});

app.get("/index", function (req, res, next) {
  const estiloIndex = "/css/estiloIndex.css";
  const estiloHeader = "/css/estiloHeader.css";

  var locals = {
    title: "Home",
    estiloIndex: estiloIndex,
    estiloHeader: estiloHeader,
  };
  res.render("index", locals);
});

//TEST EXPRESS POST GET
app.post("/persona", (req, res) => {
  let nombre = req.body.nombre; //Accedemos al body del formulario
  let apellido = req.body.apellido; //Accedemos al body del formulario
  res.send(`<h2>Hola ${nombre} ${apellido}</h2>`);
});
app.post("/persona2", (req, res) => {
  //Accedemos al body del formulario y lo devolvemos en formato json
  res.json({
    id: 1,
    nombre2: req.body.nombre2,
    apellido2: req.body.apellido2,
    success: true,
  });
});

//Manejador para la ruta raiz
//El objeto app tiene un verbo por cada metodo http
//get, post, put, delete, patch, options, head. Tiene all para manejar todos los metodos http
//Dos parametros ruta macheada y el segundo es la funcion que quiero que maneja el requerimeinto
app.get("/indextest", (req, res) => {
  //senFile es el equivalente a write + end + fs readFile + path.join
  res.sendFile(__dirname + "/views/indextest.html");

  console.log(__dirname + "/views/indextest.html");
  // res.send('Ejemplo');//Send es equivalente a write + end. Envia y cierra la respuesta
});

//Accedemos al parametro de una persona por su nombre, en este caso es un string
//http://localhost:3000/persona/jose?color=rojo&producto=camisa
app.get("/persona/:name", (req, res) => {
  let nombre = req.params.name; //Accedemos al parametro de la url
  let color = req.query.color; //Accedemos al query string de la url
  let producto = req.query.producto; //Accedemos al query string de la url
  res.send(
    `<h2>Hola ${nombre} </h2><p>Coloro favorito: ${color} y lleva puesto una ${producto}</p>`
  );
});

app.listen(3000, () => {
  console.log("Servidor en puerto http://localhost:3000");
});
