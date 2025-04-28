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


//Protocolos GET
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
  var locals = {
    title: "Ingreso",
  };
  res.render("login", {
    title: "Ingreso",
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
      res.redirect("/index"); //
    } else {
      res.render("ingreso", { error: "Usuario o contraseña incorrectos" });
    }
  });
});

//Test POST AGREGAR PACIENTE con json
//POST TEMPORAL SERA REEMPLAZADO POR UN BOTON DENTRO DE UNA MODAL QUE ASOCIA CAMAS CON PACIENTES
app.post("/paciente/agregar", (req, res) => {
  const {
    nombre,
    apellido,
    dni,
    numeroEmergencia,
    natalicio,
    direccion,
    sexo,
    correro,
    obraSocial,
    ala,
    habitacion,
    cama
  } = req.body;
  //Buscamos ruta y el la informacion que quiero escribir construyendo un objeto json
  //apartir de un objeto java script
  fs.readFile('pacientesTest.json','utf8',(error, data)=>{
      if(error){
          res.status(500).send("Error interno del servidor. Archivo no encontrado")
          return;
      }else{
        //Tomamos el arreglo dentro del json y lo parseamos a un objeto de java script
        //Y agregamos el nuevo abjeto generado con body al arreglo
        const pacientes = JSON.parse(data);
        pacientes.push({nombre, apellido, dni, numeroEmergencia, natalicio, direccion, sexo, correro, obraSocial, ala, habitacion, cama});
         //Para que sea legible el json
          //El tercer parametro es un callback
        fs.writeFile("pacientesTest.json",JSON.stringify(pacientes,null,2),(error)=>{
            if(!error){
              res.status(201).send("Paciente agregado correctamente");
            }
          }
      
        );
        }
    });

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



//REDIRECCIONAMIENTO DE RUTAS
app.use((req, res, next) => {
  res.redirect("/"); 
});
;

//ESCUCHANDO PUERTO DETERMINADO POR CONSTANTE "PORT"
app.listen(PORT, () => {
  console.log("Servidor en puerto http://localhost:3000");
});
