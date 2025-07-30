function desbloquear() {
  const bloqueAltasAccion = document.querySelector(".altasAccion");
  if (bloqueAltasAccion) {
    bloqueAltasAccion.style.opacity = "1";
    bloqueAltasAccion.style.pointerEvents = "auto";
  }
}

function bloquear() {
  const bloqueAltasAccion = document.querySelector(".altasAccion");
  if (bloqueAltasAccion) {
    bloqueAltasAccion.style.opacity = "0.5";
    bloqueAltasAccion.style.pointerEvents = "none";
  }
}
function vaciarCampos() {
  const dniInput = document.querySelector(".dniBusqueda");
  dniInput.value = "";
}

function mostrarModalConfirmacion() {
  return new Promise((resolve) => {
    const modal = document.getElementById("modalConfirmacion");
    const btnSi = document.getElementById("confirmarSi");
    const btnNo = document.getElementById("confirmarNo");

    modal.style.display = "flex";

    function limpiarEventos() {
      btnSi.removeEventListener("click", onSi);
      btnNo.removeEventListener("click", onNo);
    }

    function onSi() {
      limpiarEventos();
      modal.style.display = "none";
      resolve(true);
    }

    function onNo() {
      limpiarEventos();
      modal.style.display = "none";
      resolve(false);
    }

    btnSi.addEventListener("click", onSi);
    btnNo.addEventListener("click", onNo);
  });
}

async function altaMedica() {
  const confirmado = await mostrarModalConfirmacion();

  if (!confirmado) {
    console.log("Operación cancelada por el usuario.");
    return;
  }
  const id = document.getElementById("idPaciente").textContent.trim();

  
  fetch(`/medicina/altas/darAlta/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ pacienteId: 123 }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Alta médica realizada:", data);
      if (data.exito) {
        bloquear(); 
        vaciarCampos();
        mostrarModalExito();
        mostrarPaciente("");
      }
    })
    .catch((err) => {
      console.error("Error al dar el alta:", err);
    });
}



document.addEventListener("DOMContentLoaded", () => {


  const botonDarAlta = document.getElementById("botonDarAlta");
  if (botonDarAlta) {
    botonDarAlta.addEventListener("click", altaMedica);
  } else {
    console.error("No se encontró el elemento botonDarAlta");
  }


});
