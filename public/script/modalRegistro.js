function validarFormulario() {

    document.querySelectorAll(".error-message").forEach((span) => {
        span.textContent = "";
    });

    let esValido = true;

    const campos = [
        { selector: ".nombre", mensaje: "El nombre es obligatorio." },
        { selector: ".apellido", mensaje: "El apellido es obligatorio." },
        { selector: ".dni", mensaje: "El DNI es obligatorio." },
        { selector: ".telefono", mensaje: "El número de emergencia es obligatorio." },
        { selector: ".calendar", mensaje: "La fecha de nacimiento es obligatoria." },
        { selector: ".direccion", mensaje: "La dirección es obligatoria." },
        { selector: ".sexo", mensaje: "El sexo es obligatorio." },
        { selector: ".email", mensaje: "El correo electrónico es obligatorio." },
        { selector: ".obraSocial", mensaje: "La obra social es obligatoria." },
    ];

    campos.forEach((campo) => {

      const input = document.querySelector(campo.selector);
      
  
      const errorSpan = document.querySelector(`.error-message[data-field="${campo.selector.replace('.', '')}"]`);
  
      if (!input) {
          esValido = false;
          return;
      }
  
      if (!input.value.trim()) { 
        if (errorSpan) {
          errorSpan.textContent = campo.mensaje;
          errorSpan.classList.add("active"); 
      }
          esValido = false;
      }
  });

    
    const dni = document.querySelector(".dni");
    const dniError = document.querySelector('.error-message[data-field="dni"]');

    if (dni && !/^\d+$/.test(dni.value.trim())) {
        if (dniError) {
            dniError.textContent = "El DNI debe contener solo números.";
        }
        esValido = false;
    }

  
    const email = document.querySelector(".email");
    const emailError = document.querySelector('.error-message[data-field="email"]');
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        if (emailError) {
            emailError.textContent = "Por favor, ingrese un correo electrónico válido.";
        }
        esValido = false;
    }

    return esValido;
}

function eliminarSpan(campos){
  campos.forEach((campo) => {
    campo.addEventListener("focus", () => {
        // Encuentra el span de error correspondiente
        const errorSpan = document.querySelector(`.error-message[data-field="${campo.className}"]`);
        if (errorSpan) {
            errorSpan.textContent = ""; // Limpia el mensaje de error
        }
    });
});
}

function abrirModalAsignacion() {

  const valido = validarFormulario();
  if(valido){
    const modalAsignacion = document.querySelector(".modalRegistro");
    if (modalAsignacion) {
      modalAsignacion.style.display = "flex";
    } else {
      console.error("No se encontró el elemento .modalRegistro");
    }
  }

}

function cerrrarModalAsignacion() {
  const modalAsignacion = document.querySelector(".modalRegistro");
  if (modalAsignacion) {
    modalAsignacion.style.display = "none";
  } else {
    console.error("No se encontró el elemento .modalRegistro");
  }
}

function abrirConfirmacion(){
    const modalAsignacion = document.querySelector(".modalRegistro");
    const modalConfirmacion = document.querySelector(".modalConfirmacion");

    if (modalAsignacion) {
        modalAsignacion.style.display = "none";
        modalConfirmacion.style.display = "flex";
      } else {
        console.error("No se encontró el elemento .modalRegistro");
      }

}

function cerrarConfirmacion(){
    const modalAsignacion = document.querySelector(".modalRegistro");
    const modalConfirmacion = document.querySelector(".modalConfirmacion");

    if (modalAsignacion) {
        modalAsignacion.style.display = "flex";
        modalConfirmacion.style.display = "none";
      } else {
        console.error("No se encontró el elemento .modalRegistro");
      }

}

function mostrarModalExito() {
    const modalExito = document.querySelector('.modalExito');
    const modalConfirmacion = document.querySelector(".modalConfirmacion");

    if (modalExito) {
      modalExito.style.display = 'flex';
      modalConfirmacion.style.display = "none";
    }
  }

function cerrarModalExito() {
    const modalExito = document.querySelector('.modalExito');
    if (modalExito) {
      modalExito.style.display = 'none'; // Oculta la modal
    }
  }

function enviarInformacion() {

  const dni = document.querySelector(".dni").value;
  const nombre = document.querySelector(".nombre").value;
  const apellido = document.querySelector(".apellido").value;
  const email = document.querySelector(".email").value;
  const telefono = document.querySelector(".telefono").value;
  const natalicio = document.querySelector(".calendar").value;
  const sexo = document.querySelector(".sexo").value;
  const direccion = document.querySelector(".direccion").value;
  const obraSocial = document.querySelector(".obraSocial").value;
  const ala = document.querySelector(".ala").value;
  const habitacion = document.querySelector(".habitacion").value;
  const cama = document.querySelector(".cama").value;

  const datosCombinados = {
    paciente: {
      dni,
      nombre,
      apellido,
      email,
      telefono,
      natalicio,
      sexo,
      direccion,
      obraSocial,
    },
    asignacion: {
      ala,
      habitacion,
      cama,
    },
  };

  const url = "/paciente/agregar";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosCombinados),
  })
    .then((respuesta) => respuesta.json())
    .then((data) => {
        console.log(data); // Imprime la respuesta en texto plano
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}



document.addEventListener("DOMContentLoaded", () => {
  const spanCerrrarModalAsignacion = document.querySelector(".spanCerrrarModalAsignacion");

  const botonAbrirModalAsignacion = document.querySelector(".botonAbrirModalAsignacion");

  const botonAbrirConfirmacion = document.querySelector(".botonAbrirConfirmacion");

  const botonCerrarConfirmacion = document.querySelector(".botonCerrarConfirmacion");

  const botonEnviarConfirmacion = document.querySelector(".botonEnviarConfirmacion");

  const botonCerrarExito = document.querySelector('.botonCerrarExito');

  const campos = document.querySelectorAll(".formularioData input, .formularioData select");


  eliminarSpan(campos);

  if (botonAbrirModalAsignacion) {
    botonAbrirModalAsignacion.addEventListener("click", abrirModalAsignacion);
  } else {
    console.error("No se encontró el elemento .openModal");
  }

  if (spanCerrrarModalAsignacion) {
    spanCerrrarModalAsignacion.addEventListener("click", cerrrarModalAsignacion);
  } else {
    console.error("No se encontró el elemento .closeModal");
  }

  if(botonAbrirConfirmacion){
    botonAbrirConfirmacion.addEventListener("click", abrirConfirmacion);
  }else{
    console.error("Soy un esptupido");
  }

  if(botonCerrarConfirmacion){
    botonCerrarConfirmacion.addEventListener("click", cerrarConfirmacion);
  }

  if(botonEnviarConfirmacion){
    botonEnviarConfirmacion.addEventListener("click", mostrarModalExito);
  }
  
  if (botonCerrarExito) {
    botonCerrarExito.addEventListener('click', cerrarModalExito);
  }


});
