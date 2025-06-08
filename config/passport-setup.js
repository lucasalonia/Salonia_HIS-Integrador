const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require('dotenv').config();
const Administrativo = require('../models/Administrativo.js')



passport.serializeUser((user, done)=>{
    done(null,user.id_administrativo);
});

passport.deserializeUser((id_administrativo, done)=>{
    Administrativo.buscarPorID(id_administrativo).then((user)=>{
         done(null,user);
    });
   
});

passport.use(
    new GoogleStrategy({
    //opciones de la strategia
        callbackURL:"/autenticacion/google/redirect",
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }, async (accesToken, refreshToken, profile, done)=>{
        //Funciones callback de passport
        const id_administrativo = profile.id;
        const usuario = profile.displayName;
        const fotoPerfil = profile._json.picture
        const perfil = {id_administrativo, usuario, fotoPerfil};
        const usuarioIngresado = await Administrativo.crearOAsociarAdministrativo(perfil);

        done(null, usuarioIngresado);


    })
);