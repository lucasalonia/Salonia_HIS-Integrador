//Documento java que controla las llamadas a los endpoints de la API el cual podria devolver usuario 
//El index va a recuperar los datos  e interactura con el controlador 

const express = require('express'); //Importamos express
const app = express(); //Creamos variable de aplicacion que por convencion se denomina app

//Manejador para la ruta raiz
//El objeto app tiene un verbo por cada metodo http
//get, post, put, delete, patch, options, head. Tiene all para manejar todos los metodos http
//Dos parametros ruta macheada y el segundo es la funcion que quiero que maneja el requerimeinto 
app.get('/',(req,res)=>{   

    //senFile es el equivalente a write + end + fs readFile + path.join
    const pinga = res.sendFile(__dirname + '/views/index.html');

    console.log(__dirname + '/views/index.html');
    // res.send('Ejemplo');//Send es equivalente a write + end. Envia y cierra la respuesta 
});


app.listen(3000,()=>{
    console.log("Servidor en puerto http://localhost:3000");
    
});