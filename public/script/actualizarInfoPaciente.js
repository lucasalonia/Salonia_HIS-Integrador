
function abrirConfirmacion(boton) {
    //El parametro de la funcion es para obtener el boton que se ha pulsado con "this" en pug
  const modalConfirmacion = document.querySelector(".modalConfirmacion");
    const span = document.getElementById("idPaciente");

  if (modalConfirmacion) {
    modalConfirmacion.style.display = "flex";
    const fila = boton.closest("tr");
    const celdas = fila.querySelectorAll("td[data-field]");

    const datosPaciente = {};

    celdas.forEach((celda) => {
      const campo = celda.dataset.field;
      const valor = celda.textContent.trim();
      datosPaciente[campo] = valor;
    });
    span.textContent = datosPaciente.id; 
  } else {
    console.error("No se encontró el elemento .modalConfirmacion");
  }
}

function cerrarConfirmacion() {
  const modalConfirmacion = document.querySelector(".modalConfirmacion");

  if (modalConfirmacion) {
    modalConfirmacion.style.display = "none";
  } else {
    console.error("No se encontró el elemento .modalRegistro");
  }
}

function eliminarPaciente() {
  const idPaciente = document.getElementById("idPaciente").textContent.trim();

  fetch(`/pacientes/eliminar/${idPaciente}`, {
    method: "PATCH",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Paciente eliminado:", data);
      location.reload(data.exito);
    })
    .catch((error) => {
      console.error("Error al eliminar el paciente:", error);
    });
}



document.addEventListener("DOMContentLoaded", () => {

});