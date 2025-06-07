const express = require("express")

const router = express.Router();

var passport = require("passport");
const { route } = require("./rutasRegistro");

const autenticacionCheck = (req, res, next) =>{
  if(!req.user){
    res.redirect("/autenticacion/login");
  }else{
    next();
  }
};

//Ruta a la view de login
router.get("/login", (req, res)=>{
    res.render('login');
});

router.get("/logout", (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

//autenticacion con google
router.get("/google", passport.authenticate('google',{
    scope:['profile']
}));


//Callback para google para redirigir despues del log in
router.get('/google/redirect', passport.authenticate('google'), (req, res   )=>{
    // res.send(  req.user);
    res.redirect("/");
});


module.exports = {
  router,
  autenticacionCheck
};