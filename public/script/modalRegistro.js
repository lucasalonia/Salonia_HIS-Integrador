function validarFormulario() {
  document.querySelectorAll(".error-message").forEach((span) => {
    span.textContent = "";
  });

  let esValido = true;

  const campos = [
    { selector: ".nombre", mensaje: "El nombre es obligatorio." },
    { selector: ".apellido", mensaje: "El apellido es obligatorio." },
    { selector: ".dni", mensaje: "El DNI es obligatorio." },
    {selector: ".telefono",mensaje: "El número de emergencia es obligatorio.",},
    {selector: ".calendar",mensaje: "La fecha de nacimiento es obligatoria.",},
    { selector: ".direccion", mensaje: "La dirección es obligatoria." },
    { selector: ".sexo", mensaje: "El sexo es obligatorio." },
    { selector: ".email", mensaje: "El correo electrónico es obligatorio." },
    { selector: ".obraSocial", mensaje: "La obra social es obligatoria." },
    { selector: ".vias", mensaje: "Se debe seleccionar una opcion." },
    { selector: ".ciudad", mensaje: "Se debe ingresar una ciudad." },
    {selector: ".numeroObraSocial",mensaje: "Numero de obra social necesario.",},
  ];

  campos.forEach((campo) => {
    const input = document.querySelector(campo.selector);

    const errorSpan = document.querySelector(
      `.error-message[data-field="${campo.selector.replace(".", "")}"]`
    );

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

  if (dni && !/^\d{8}$/.test(dni.value.trim())) {
    if (dniError) {
      dniError.textContent = "El DNI debe tener exactamente 7 números.";
      dniError.classList.add("active");
    }
    esValido = false;
  }

  const email = document.querySelector(".email");
  const emailError = document.querySelector(
    '.error-message[data-field="email"]'
  );

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    if (emailError) {
      emailError.textContent =
        "Por favor, ingrese un correo electrónico válido.";
    }
    esValido = false;
  }

  const fecha = document.querySelector(".calendar");
  const fechaError = document.querySelector(
    '.error-message[data-field="calendar"]'
  );

if (fecha) {
  const valor = fecha.value.trim(); // yyyy-mm-dd

  if (!valor) {
    if (fechaError) {
      fechaError.textContent = "La fecha de nacimiento es obligatoria.";
      fechaError.classList.add("active");
    }
    esValido = false;
  } else {
    const fechaIngresada = new Date(valor);
    const hoy = new Date();
    const fechaMinima = new Date("1900-01-01");

    // Borramos la parte de la hora para evitar conflictos
    hoy.setHours(0, 0, 0, 0);

    if (fechaIngresada < fechaMinima) {
      fechaError.textContent = "La fecha es demasiado antigua.";
      fechaError.classList.add("active");
      esValido = false;
    } else if (fechaIngresada > hoy) {
      fechaError.textContent = "La fecha no es valida, aun no ocurre .";
      fechaError.classList.add("active");
      esValido = false;
    }
  }
}

  return esValido;
}

function eliminarSpan(campos) {
  campos.forEach((campo) => {
    campo.addEventListener("focus", () => {
      // Encuentra el span de error correspondiente
      const errorSpan = document.querySelector(
        `.error-message[data-field="${campo.className}"]`
      );
      if (errorSpan) {
        errorSpan.textContent = ""; // Limpia el mensaje de error
      }
    });
  });
}

function abrirModalAsignacion() {
  const valido = validarFormulario();
  if (valido) {
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

function abrirConfirmacion() {
  const modalAsignacion = document.querySelector(".modalRegistro");
  const modalConfirmacion = document.querySelector(".modalConfirmacion");

  if (modalAsignacion) {
    modalAsignacion.style.display = "none";
    modalConfirmacion.style.display = "flex";
  } else {
    console.error("No se encontró el elemento .modalRegistro");
  }
}

function cerrarConfirmacion() {
  const modalAsignacion = document.querySelector(".modalRegistro");
  const modalConfirmacion = document.querySelector(".modalConfirmacion");

  if (modalAsignacion) {
    modalAsignacion.style.display = "flex";
    modalConfirmacion.style.display = "none";
  } else {
    console.error("No se encontró el elemento .modalRegistro");
  }
}

function mostrarModalExito(exito) {
  const modalExito = document.querySelector(".modalExito");
  const modalConfirmacion = document.querySelector(".modalConfirmacion");

  if (exito) {
    modalExito.style.display = "flex";
    modalConfirmacion.style.display = "none";
  }
}

function cerrarModalExito() {
  const modalExito = document.querySelector(".modalExito");
  if (modalExito) {
    modalExito.style.display = "none"; // Oculta la modal
  }
}

function enviarInformacion() {
  const dni = document.querySelector(".dni").value;
  const nombre = document.querySelector(".nombre").value;
  const apellido = document.querySelector(".apellido").value;
  const email = document.querySelector(".email").value;
  const numero_emergencia = document.querySelector(".telefono").value;
  const fecha_nacimiento = document.querySelector(".calendar").value;
  const sexo = document.querySelector(".sexo").value;
  const direccion = document.querySelector(".direccion").value;
  const obra_social = document.querySelector(".obraSocial").value;
  const ala = document.querySelector(".ala").value;
  const habitacion = document.querySelector(".habitacion").value;
  const cama = document.querySelector(".cama").value;
  const medios_ingreso = document.querySelector(".vias").value;
  const ciudad = document.querySelector(".ciudad").value;
  const medico_derivador = document.querySelector(".medico").value;
  const numero_obra_social = document.querySelector(".numeroObraSocial").value;
  console.log(email);
  
  const datosCombinados = {
    paciente: {
      dni,
      nombre,
      apellido,
      email,
      numero_emergencia,
      fecha_nacimiento,
      sexo,
      direccion,
      obra_social,
      medios_ingreso,
      ciudad,
      numero_obra_social,
      medico_derivador,
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
      console.log(data);
      
      mostrarModalExito(data.success);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function elegirMedico(selectVias, inputMedico, campoMedico) {
  selectVias.addEventListener("change", () => {
    if (selectVias.value === "Derivacion Medica") {
      inputMedico.disabled = false;
      inputMedico.classList.remove("disabled");
      campoMedico.style.color = "black";
    } else {
      inputMedico.disabled = true;
      inputMedico.value = "";
      inputMedico.classList.add("disabled");
      campoMedico.style.color = "#a09f9f";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const spanCerrrarModalAsignacion = document.querySelector(
    ".spanCerrrarModalAsignacion"
  );

  const botonAbrirModalAsignacion = document.querySelector(
    ".botonAbrirModalAsignacion"
  );

  const botonAbrirConfirmacion = document.querySelector(
    ".botonAbrirConfirmacion"
  );

  const botonCerrarConfirmacion = document.querySelector(
    ".botonCerrarConfirmacion"
  );

  const botonEnviarConfirmacion = document.querySelector(
    ".botonEnviarConfirmacion"
  );

  const botonCerrarExito = document.querySelector(".botonCerrarExito");

  const campos = document.querySelectorAll(
    ".formularioData input, .formularioData select"
  );

  const selectVias = document.querySelector(".vias");

  const inputMedico = document.querySelector(".medico");

  const campoMedicoDerivador = document.querySelector(".campoMedicoDerivador");

  elegirMedico(selectVias, inputMedico, campoMedicoDerivador);

  eliminarSpan(campos);

  if (botonAbrirModalAsignacion) {
    botonAbrirModalAsignacion.addEventListener("click", abrirModalAsignacion);
  } else {
    console.error("No se encontró el elemento .openModal");
  }

  if (spanCerrrarModalAsignacion) {
    spanCerrrarModalAsignacion.addEventListener(
      "click",
      cerrrarModalAsignacion
    );
  } else {
    console.error("No se encontró el elemento .closeModal");
  }

  if (botonAbrirConfirmacion) {
    botonAbrirConfirmacion.addEventListener("click", abrirConfirmacion);
  } else {
    console.error("Soy un esptupido");
  }

  if (botonCerrarConfirmacion) {
    botonCerrarConfirmacion.addEventListener("click", cerrarConfirmacion);
  }

  if (botonCerrarExito) {
    botonCerrarExito.addEventListener("click", cerrarModalExito);
  }
});
