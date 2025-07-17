function desbloquearHistorial() {
  const bloqueHistorial = document.querySelector(".historial");
  if (bloqueHistorial) {
    bloqueHistorial.style.opacity = "1";
    bloqueHistorial.style.pointerEvents = "auto";
  }
}

function bloquearHistorial() {
  const bloqueHistorial = document.querySelector(".historial");
  if (bloqueHistorial) {
    bloqueHistorial.style.opacity = "0.5";
    bloqueHistorial.style.pointerEvents = "none";
  }
}


function mostrarPaciente(descripcionPaciente) {
  const textoPaciente = document.querySelector(".paciente");
  textoPaciente.textContent = descripcionPaciente;
  textoPaciente.style.color = "#007BFF";
}

function buscarPacientePorDni() {
  const dniInput = document.querySelector(".dniBusqueda");
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
    const url = `/enfermeria/historial/buscar/${dni}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al buscar el paciente");
        }
        return response.json();
      })
      .then((data) => {
        if (data.paciente !== null) {
          const id = data.paciente.id;
          const dni = data.paciente.dni;
          const nombre = data.paciente.nombre;
          const apellido = data.paciente.apellido;

          const descripcionPaciente = `${id} - ${dni} - ${apellido} - ${nombre}`;

          desbloquearHistorial();
          mostrarPaciente(descripcionPaciente);

          if (data.alergias) {
            const idsAlergias = data.alergias.map(
              (alergia) => alergia.id_alergia
            );
            $("#select-alergias").val(idsAlergias).trigger("change");
          }
          
          if (data.enfermedades) {
            const idsEnfermedades = data.enfermedades.map(
              (enfermedad) => enfermedad.id_enfermedad
            );
            $("#select-enfermedades").val(idsEnfermedades).trigger("change");
          }
          if (data.cirugias) {
            const idsCirugias = data.cirugias.map(
              (cirugia) => cirugia.id_cirugia
            );
            $("#select-cirugias").val(idsCirugias).trigger("change");
          }
          if (data.antecedentes) {
            const idsAntecedentes = data.antecedentes.map(
              (antecedente) => antecedente.id_antecedente
            );
            $("#select-antecedentes").val(idsAntecedentes).trigger("change");
          }
          if (data.medicamentos) {
            const idsMedicamentos = data.medicamentos.map(
              (medicamento) => medicamento.id_medicamento
            );
            $("#select-medicamentos").val(idsMedicamentos).trigger("change");
          }
        } else {
          console.log("No se encontró el paciente con DNI:", dni);
          const dniError = document.querySelector(
            '.error-message[data-field="dni"]'
          );
          mostrarPaciente("");
          if (dniError) {
            dniError.textContent = "No se encontro paciente con ese DNI.";
            dniError.classList.add("active");
          }
        }
      })
      .catch((error) => {
        console.error("Error al buscar el paciente:", error);
      });
  }
}

function enviarHistorial() {
  const dniInput = document.querySelector(".dniBusqueda");
  const dni = dniInput.value.trim();
  const alergiasSeleccionadas = $("#select-alergias").val();
  const cirugiasSeleccionadas = $("#select-cirugias").val();
  const enfermedadesSeleccionadas = $("#select-enfermedades").val();
  const antecedentesSeleccionadas = $("#select-antecedentes").val();
  const medicamentosSeleccionadas = $("#select-medicamentos").val();

  const data = {
    dni: dni,
    alergias: alergiasSeleccionadas,
    cirugias: cirugiasSeleccionadas,
    enfermedades: enfermedadesSeleccionadas,
    antecedentes: antecedentesSeleccionadas,
    medicamentos: medicamentosSeleccionadas,
  };

  fetch("/enfermeria/historial/enviar-historial", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al enviar los datos");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Respuesta del servidor:", data);
      vaciarCampos();
      bloquearHistorial();
      mostrarPaciente("");
      mostrarModalExito();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function vaciarCampos(){
  const dniInput = document.querySelector(".dniBusqueda");
  dniInput.value = "";
  const selects = [
  "#select-alergias",
  "#select-enfermedades",
  "#select-cirugias",
  "#select-antecedentes",
  "#select-medicamentos",
];

selects.forEach(selector => {
  $(selector).empty().trigger('change');
});
}

document.addEventListener("DOMContentLoaded", () => {
  const dniInput = document.querySelector(".dniBusqueda");
  dniInput.addEventListener("input", () => {
    const dniError = document.querySelector('.error-message[data-field="dni"]');
    if (dniError) {
      dniError.textContent = "";
      dniError.classList.remove("active");
    }
  });

  //Buscar paciente
  const botonBuscarDni = document.querySelector(".buscarDni");
  if (botonBuscarDni) {
    botonBuscarDni.addEventListener("click", buscarPacientePorDni);
  } else {
    console.error("No se encontró el elemento botonBuscarDni");
  }

  //Enviar historial
  const botonGuardarHistorial = document.getElementById("guardarHistorial");
  if (botonGuardarHistorial) {
    botonGuardarHistorial.addEventListener("click", enviarHistorial);
  } else {
    console.error("No se encontró el elemento botonGuardarHistorial");
  }
});
