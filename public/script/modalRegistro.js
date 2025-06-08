function validarFormulario() {
  document.querySelectorAll(".error-message").forEach((span) => {
    span.textContent = "";
  });

  let esValido = true;

  const campos = [
    { selector: ".nombre", mensaje: "El nombre es obligatorio." },
    { selector: ".apellido", mensaje: "El apellido es obligatorio." },
    { selector: ".dni", mensaje: "El DNI es obligatorio." },
    {
      selector: ".telefono",
      mensaje: "El número de emergencia es obligatorio.",
    },
    {
      selector: ".calendar",
      mensaje: "La fecha de nacimiento es obligatoria.",
    },
    { selector: ".direccion", mensaje: "La dirección es obligatoria." },
    { selector: ".sexo", mensaje: "El sexo es obligatorio." },
    { selector: ".email", mensaje: "El correo electrónico es obligatorio." },
    { selector: ".obraSocial", mensaje: "La obra social es obligatoria." },
    { selector: ".vias", mensaje: "Se debe seleccionar una opcion." },
    { selector: ".ciudad", mensaje: "Se debe ingresar una ciudad." },
    {
      selector: ".numeroObraSocial",
      mensaje: "Numero de obra social necesario.",
    },
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
      dniError.textContent = "El DNI debe tener exactamente 8 números.";
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

  const confirmNombre = document.getElementById("confirmNombre");
  const confirmApellido = document.getElementById("confirmApellido");
  const confirmDni = document.getElementById("confirmDni");
  const confirmObraSocial = document.getElementById("confirmObraSocial");
  const confirmNumeroObraSocial = document.getElementById(
    "confirmNumeroObraSocial"
  );
  const confirmTelefono = document.getElementById("confirmTelefono");
  const confirmCiudad = document.getElementById("confirmCiudad");
  const confirmCalle = document.getElementById("confirmCalle");

  const dni = document.querySelector(".dni").value;
  const apellido = document.querySelector(".apellido").value;
  const nombre = document.querySelector(".nombre").value;
  const obraSocial = document.querySelector(".obraSocial").value;
  const numeroObraSocial = document.querySelector(".numeroObraSocial").value;
  const telefono = document.querySelector(".telefono").value;
  const ciudad = document.querySelector(".ciudad").value;
  const direccion = document.querySelector(".direccion").value;

  const parrafos = document.querySelectorAll(
    ".contenidoConfirmacion p:not(.descripcion)"
  );
  const parrafoDescripcion = document.querySelector("p.descripcion");

  if (dni.startsWith("00")) {
    parrafos.forEach((p) => p.remove());
    parrafoDescripcion.textContent =
      "El paciente que ingresará al sistema es DESCONOCIDO ";
  } else {
    confirmNombre.textContent = nombre;
    confirmApellido.textContent = apellido;
    confirmDni.textContent = dni;
    confirmObraSocial.textContent = obraSocial;
    confirmNumeroObraSocial.textContent = numeroObraSocial;
    confirmTelefono.textContent = telefono;
    confirmCiudad.textContent = ciudad;
    confirmCalle.textContent = direccion;
  }

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

function vaciarInputs(exito) {
  if (exito) {
    const inputs = document.querySelectorAll(
      ".dni, .nombre, .apellido, .email, .telefono, .calendar, .sexo, .direccion, .obraSocial, .ciudad, .medico, .numeroObraSocial"
    );

    inputs.forEach((input) => {
      if (input.type === "checkbox" || input.type === "radio") {
        input.checked = false;
      } else {
        input.value = "";
      }
    });
  }
}

function vaciarInputsSinDni(exito) {
  if (exito) {
    const inputs = document.querySelectorAll(
      ".nombre, .apellido, .email, .telefono, .calendar, .sexo, .direccion, .obraSocial, .ciudad, .medico, .numeroObraSocial"
    );

    inputs.forEach((input) => {
      if (input.type === "checkbox" || input.type === "radio") {
        input.checked = false;
      } else {
        input.value = "";
      }
    });
  }
}

async function enviarInformacion() {
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
  let medico_derivador = document.querySelector(".medico").value;
  const numero_obra_social = document.querySelector(".numeroObraSocial").value;
  const borradoLogico = true;
  if (medico_derivador.trim() === "") {
    medico_derivador = null;
  }

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
      medios_ingreso,
      ciudad,
      borradoLogico,
    },
    mutual: {
      obra_social,
      numero_obra_social,
    },
    medico: {
      medico_derivador,
    },
    asignacion: {
      ala,
      habitacion,
      cama,
    },
  };

  try {
    const respuesta = await fetch("/paciente/agregar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosCombinados),
    });

    const data = await respuesta.json();
    console.log(data);

    if (data.success) {
      mostrarModalExito(true);
      vaciarInputs(data.success);
      bloquearCampos(false);
      setTimeout(() => {
        location.reload();
      }, 2000);
    } else {
      console.log("Error en agregar paciente");
    }
  } catch (error) {
    console.error("Error en enviarInformacion:", error);
  }
}

function elegirMedico(selectVias, selectMedico, campoMedico) {
  if (selectVias.value === "Derivacion Medica") {
    selectMedico.disabled = false;
    selectMedico.classList.remove("disabled");
    campoMedico.style.color = "black";
  } else {
    selectMedico.disabled = true;
    selectMedico.selectedIndex = 0; // opción "Seleccionar Medico"
    selectMedico.classList.add("disabled");
    campoMedico.style.color = "#a09f9f";
  }
  selectVias.addEventListener("change", () => {
    if (selectVias.value === "Derivacion Medica") {
      selectMedico.disabled = false;
      selectMedico.classList.remove("disabled");
      campoMedico.style.color = "black";
    } else {
      selectMedico.disabled = true;
      selectMedico.selectedIndex = 0; // resetear selección
      selectMedico.classList.add("disabled");
      campoMedico.style.color = "#a09f9f";
    }
  });
}

function enviarAla(id_ala) {
  const url = "/paciente/agregar-habitacion";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ala: id_ala }),
  })
    .then((respuesta) => respuesta.json())
    .then((habitaciones) => {
      selectHabitacion.innerHTML = "";

      if (!habitaciones || habitaciones.length === 0) {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "No hay habitaciones disponibles";
        selectHabitacion.appendChild(option);
        return;
      }
      habitaciones.forEach((habitacion) => {
        const option = document.createElement("option");
        option.value = habitacion.id_habitacion;

        option.textContent =
          "ID Hab: " +
          habitacion.id_habitacion +
          "- Numero Hab: " +
          habitacion.numero_habitacion;
        selectHabitacion.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error cargando habitaciones:", error);
    });
}

function enviarHabitacion(id_habitacion) {
  const url = "/paciente/agregar-cama";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ habitacion: id_habitacion }),
  })
    .then((respuesta) => respuesta.json())
    .then((camas) => {
      const selectCama = document.querySelector("#selectCama");
      selectCama.innerHTML = "";
      console.log("Respuesta recibida:", camas);
      if (!camas || camas.length === 0) {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "No hay camas disponibles";
        selectCama.appendChild(option);
        return;
      }

      camas.forEach((cama) => {
        const option = document.createElement("option");
        option.value = cama.id_cama;
        option.textContent =
          "ID Cama: " + cama.id_cama + "- Numero Cama: " + cama.numero_cama;
        selectCama.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error cargando camas:", error);
    });
}

function bloquearCampos(desbloquear) {
  const campos = document.querySelectorAll(
    ".formularioData input, .formularioData select, .formularioData label"
  );
  const labels = document.querySelectorAll(".formularioData label");
  campos.forEach((campo) => {
    campo.disabled = true;
    campo.style.color = "#a09f9f";
    if (
      campo.classList.contains("dni") ||
      campo.classList.contains("etiquetaDni")
    ) {
      campo.disabled = false;
      campo.style.color = "black";
    }
  });
  if (desbloquear) {
    const campos = document.querySelectorAll(
      ".formularioData input, .formularioData select, .formularioData label"
    );
    campos.forEach((campo) => {
      campo.disabled = false;
      campo.style.color = "#2d6aac";
    });
    labels.forEach((label) => {
      label.style.color = "black";
    });
  }
}

function buscarPacientePorDni() {
  const dniInput = document.querySelector(".dni");
  console.log(dniInput);
  let flag = true;

  if (dniInput && dniInput.value.trim() === "") {
    const dniError = document.querySelector('.error-message[data-field="dni"]');
    if (dniError) {
      dniError.textContent =
        "Ingrese un numero valido para realizar la busqueda del paciente";
      dniError.classList.add("active");
    }
    flag = false;
    return;
  }
  if (
    (dniInput && !/^\d{8}$/.test(dniInput.value.trim())) ||
    dniInput.value.trim().length !== 8
  ) {
    const dniError = document.querySelector('.error-message[data-field="dni"]');
    if (dniError) {
      dniError.textContent = "El DNI debe tener exactamente 8 números.";
      dniError.classList.add("active");
    }
    flag = false;
    return;
  }
  if (dniInput.value.startsWith("0")) {
    const dniError = document.querySelector('.error-message[data-field="dni"]');
    if (dniError) {
      dniError.textContent = "El DNI no puede comenzar con 0.";
      dniError.classList.add("active");
    }
    flag = false;
    return;
  }

  if (flag) {
    const dni = dniInput.value.trim();
    const url = `/paciente/buscar/${dni}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al buscar el paciente");
        }
        return response.json();
      })
      .then((data) => {
        if (data.paciente !== null) {
          const paciente = data.paciente;
          const obraSocial = data.obraSocial;
          const medico = data.medico;
          console.log(data);

          console.log("Paciente encontrado:", paciente);

          document.querySelector(".nombre").value = paciente.nombre || "";
          document.querySelector(".apellido").value = paciente.apellido || "";
          document.querySelector(".dni").value = paciente.dni || "";
          document.querySelector(".email").value = paciente.email || "";
          document.querySelector(".telefono").value =
            paciente.numero_emergencia || "";
          document.querySelector(".calendar").value =
            paciente.fecha_nacimiento || "";
          document.querySelector(".sexo").value = paciente.sexo || "";
          document.querySelector(".direccion").value = paciente.direccion || "";
          document.querySelector(".ciudad").value = paciente.ciudad || "";

          document.querySelector(".numeroObraSocial").value =
            obraSocial.numero || "";
          document.querySelector(".obraSocial").value = obraSocial.nombre || "";

          document.querySelector(".vias").value = paciente.medios_ingreso || "";

          document.querySelector(".medico").value =
            medico?.id_medico?.toString() || "";

          bloquearCampos(true);
        } else {
          console.log("No se encontró el paciente con DNI:", dni);
          vaciarInputsSinDni(true);
          mostrarModalDni(true, dni);
          bloquearCampos(true);
        }
      })
      .catch((error) => {
        console.error("Error al buscar el paciente:", error);
      });
  }
}

function mostrarModalDni(dniNoEncontrado, dni) {
  const modalDni = document.querySelector(".modalDni");
  const dniSpan = document.querySelector('span.dni-message[data-field="dni"]');

  if (dniNoEncontrado) {
    modalDni.style.display = "flex";
    if (dniSpan) {
      dniSpan.textContent = dni;
      dniSpan.style.fontWeight = "bold";
      dniSpan.style.color = "red";
      dniSpan.style.fontSize = "20px";
    }
  }
}

function cerrarModalDni() {
  const modalDni = document.querySelector(".modalDni");

  modalDni.style.display = "none";
}

function irAPacientes() {
  window.location.href = "/pacientes/listaPacientes";
}

function bloquearBusquedaDni() {
  const buscarDni = document.querySelector(".buscarDni");
  const dniInput = document.querySelector(".dni");
  buscarDni.disabled = true;

  buscarDni.style.backgroundColor = "#ccc";
  buscarDni.style.color = "#666";
  buscarDni.style.cursor = "not-allowed";

  dniInput.readOnly = true;

  dniInput.style.backgroundColor = "#eee";
  dniInput.style.color = "#666";
  dniInput.style.cursor = "not-allowed";
}

function traerUltimoPacienteNN() {
  let dniInput = document.querySelector(".dni");
  const nombreInput = document.querySelector(".nombre");
  const apellidoInput = document.querySelector(".apellido");
  const emailInput = document.querySelector(".email");
  const telefonoInput = document.querySelector(".telefono");
  const fechaNacimientoInput = document.querySelector(".calendar");
  const sexoInput = document.querySelector(".sexo");
  const direccionInput = document.querySelector(".direccion");
  const ciudadInput = document.querySelector(".ciudad");
  const numeroObraSocialInput = document.querySelector(".numeroObraSocial");
  const obraSocialInput = document.querySelector(".obraSocial");
  const viasInput = document.querySelector(".vias");
  const url = "/paciente/ultimo-paciente-nn";
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al buscar el paciente");
      }
      return response.json();
    })
    .then((data) => {
      if (data.paciente !== null) {
        const paciente = data.paciente;
        nombreInput.value = "Sin Asignar";
        apellidoInput.value = "Sin Asignar";
        emailInput.value = "xxxxx@xxxx.xxx";
        telefonoInput.value = "0";
        fechaNacimientoInput.value = "2000-01-01";
        sexoInput.value = "Otro";
        direccionInput.value = "Sin Asignar";
        ciudadInput.value = "Sin Asignar";
        numeroObraSocialInput.value = "0";
        obraSocialInput.value = "No Especifica";
        viasInput.value = "Emergencia";

        dniInput.value = paciente.dni;
        console.log(paciente.dni);
        bloquearBusquedaDni();
        console.log("Ultimo Paciente NN encontrado:", paciente);
      } else {
        nombreInput.value = "Sin Asignar";
        apellidoInput.value = "Sin Asignar";
        emailInput.value = "xxxxx@xxxx.xxx";
        telefonoInput.value = "0";
        fechaNacimientoInput.value = "2000-01-01";
        sexoInput.value = "Otro";
        direccionInput.value = "Sin Asignar";
        ciudadInput.value = "Sin Asignar";
        numeroObraSocialInput.value = "0";
        obraSocialInput.value = "No Especifica";
        viasInput.value = "Emergencia";

        dniInput.value = "00000000";
        bloquearBusquedaDni();
      }
    })
    .catch((error) => {
      console.error("Error al buscar el ultimo paciente NN:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  //Campos bloqueados por defecto
  bloquearCampos();

  const boton = document.querySelector(".botonEmergencia");
  const tooltip = document.getElementById("tooltip");

  boton.addEventListener("mouseenter", (e) => {
    const rect = boton.getBoundingClientRect();

    tooltip.style.left = `${rect.left + window.scrollX + 32}px`;
    tooltip.style.top = `${rect.top + window.scrollY - 38}px`;
    tooltip.style.display = "block";
  });

  boton.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });

  //Boton para ejecutar paciente de EMERGENCIA
  const botonEmergencia = document.querySelector(".botonEmergencia");
  if (botonEmergencia) {
    botonEmergencia.addEventListener("dblclick", traerUltimoPacienteNN);
  } else {
    console.error("No se encontró el elemento .openModal");
  }

  //Busqueda de paciente por DNI. Bloqueo y desbloqueo de campos
  const botonBuscarDni = document.querySelector(".buscarDni");
  if (botonBuscarDni) {
    botonBuscarDni.addEventListener("click", buscarPacientePorDni);
  } else {
    console.error("No se encontró el elemento .openModal");
  }

  const botonModalDni = document.querySelector(".botonCerrarModalDni");
  if (botonModalDni) {
    botonModalDni.addEventListener("click", cerrarModalDni);
  } else {
    console.error("No se encontró el elemento .openModal");
  }

  //Agregar alas habitaciones y camas
  const selectAla = document.querySelector(".ala");
  const selectHabitacion = document.querySelector(".habitacion");
  const selectCama = document.querySelector(".cama");

  let ultimaAlaSeleccionada = null;
  let ultimaHabitacionSeleccionada = null;

  selectAla.addEventListener("mousedown", () => {
    ultimaAlaSeleccionada = selectAla.value;
  });

  selectAla.addEventListener("change", (event) => {
    const valorSeleccionado = event.target.value;
    selectHabitacion.innerHTML = "";
    selectCama.innerHTML = "";

    if (valorSeleccionado === "") {
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "Se debe seleccionar un ala";
      selectHabitacion.appendChild(option);
    } else {
      enviarAla(valorSeleccionado);
      ultimaAlaSeleccionada = valorSeleccionado;
    }
  });

  selectAla.addEventListener("click", () => {
    if (selectAla.value === ultimaAlaSeleccionada && selectAla.value !== "") {
      selectHabitacion.innerHTML = "";
      selectCama.innerHTML = "";
      enviarAla(selectAla.value);
    }
  });

  selectHabitacion.addEventListener("mousedown", () => {
    ultimaHabitacionSeleccionada = selectHabitacion.value;
  });

  selectHabitacion.addEventListener("change", (event) => {
    const valorSeleccionado = event.target.value;
    selectCama.innerHTML = "";

    if (valorSeleccionado === "") {
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "Se debe seleccionar una habitacion";
      selectCama.appendChild(option);
    } else {
      enviarHabitacion(valorSeleccionado);
      ultimaHabitacionSeleccionada = valorSeleccionado;
    }
  });

  selectHabitacion.addEventListener("click", () => {
    if (
      selectHabitacion.value === ultimaHabitacionSeleccionada &&
      selectHabitacion.value !== ""
    ) {
      selectCama.innerHTML = "";
      enviarHabitacion(selectHabitacion.value);
    }
  });

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

  const botonCerrarExito = document.querySelector(".botonCerrarExito");

  const campos = document.querySelectorAll(
    ".formularioData input, .formularioData select"
  );

  const selectVias = document.querySelector(".vias");
  const selectMedico = document.querySelector(".medico");
  const campoMedicoDerivador = document.querySelector(".campoMedicoDerivador");

  elegirMedico(selectVias, selectMedico, campoMedicoDerivador);

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
