function cerrarModal() {
  const modal = document.getElementById("modalEditar");
  const cerrarBtn = document.getElementById("cerrarModal");

  cerrarBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}
function comprobarValores() {
  const nombreActual = document
    .getElementById("nombreActual")
    ?.textContent.split(":")[1]
    .trim();
  const dniActual = document
    .getElementById("dniActual")
    ?.textContent.split(":")[1]
    .trim();
  if (nombreActual == "Sin Asignar" && dniActual.startsWith("0")) {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("dni").value = "";
    document.getElementById("numero_emergencia").value = "";
    document.getElementById("fecha_nacimiento").value = "";
    document.getElementById("sexo").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("email").value = "";
    document.getElementById("ciudad").value = "";
    document.getElementById("obraSocial").value = "";
    document.getElementById("numeroObraSocial").value = "";
  }
}

function abrirModal() {
  const modal = document.getElementById("modalEditar");
  modal.style.display = "flex";
  comprobarValores();
}

async function enviarEdicionPaciente(pacienteId) {
  const form = document.getElementById("formEditarPaciente");

  if (!form.reportValidity()) {
    return;
  }
  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  let dniInput = document.querySelector("#dni");
  let dni = 0;

  if (dniInput) {
    dni = dniInput.value;
  }
  const numero_emergencia = document.querySelector("#numero_emergencia").value;
  const fecha_nacimiento = document.querySelector("#fecha_nacimiento").value;
  const sexo = document.querySelector("#sexo").value;
  const direccion = document.querySelector("#direccion").value;
  const email = document.querySelector("#email").value;
  const ciudad = document.querySelector("#ciudad").value;
  const obra_social = document.querySelector("#obraSocial").value;
  const numero_obra_social = document.querySelector("#numeroObraSocial").value;

  const datosCombinados = {
    paciente: {
      nombre,
      apellido,
      dni,
      numero_emergencia,
      fecha_nacimiento,
      sexo,
      direccion,
      email,
      ciudad,
    },
    mutual: {
      obra_social,
      numero_obra_social,
    },
  };

  try {
    const respuesta = await fetch(`/pacientes/modificar-datos/${pacienteId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosCombinados),
    });

    const data = await respuesta.json();
    console.log(data);

    if (!data.exito) {
      abrirModalError();
    }

    if (data.exito) {
       mostrarModalExito();
       setTimeout(() => {
        location.reload();
      }, 2000);
    } else {
      console.error("Error al actualizar paciente");
    }
  } catch (error) {
    console.error("Error en enviarEdicionPaciente:", error);
  }
}
function abrirModalError() {
  document.getElementById("modalErrorDni").style.display = "flex";
}
function cerrarModalError() {
  document.getElementById("modalErrorDni").style.display = "none";
}

function mostrarModalExito() {
  const modalExito = document.querySelector(".modalExito");
  const modalEditar = document.getElementById("modalEditar");

    modalExito.style.display = "flex";
    modalEditar.style.display = "none";
}

function cerrarModalExito() {
  const modalExito = document.querySelector(".modalExito");
  if (modalExito) {
    modalExito.style.display = "none"; 
  }
}
function detectarTipoDNI() {
  const dniInput = document.querySelector("#dni");
  const dniLabel = document.getElementById("labelDNI");
  const divDNI = document.getElementById("divDNI");
  const dni = dniInput.value;

  if (!dni.startsWith("0")) {
    dniInput.remove();
    dniLabel.remove();
    divDNI.remove();
  }
}
document.addEventListener("DOMContentLoaded", () => {
  cerrarModal();
  detectarTipoDNI();
});
