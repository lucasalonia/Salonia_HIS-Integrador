function desbloquear() {
  const bloquePlan = document.querySelector(".plan");
  if (bloquePlan) {
    bloquePlan.style.opacity = "1";
    bloquePlan.style.pointerEvents = "auto";
  }
}

function bloquear() {
  const bloquePlan = document.querySelector(".plan");
  if (bloquePlan) {
    bloquePlan.style.opacity = "0.5";
    bloquePlan.style.pointerEvents = "none";
  }
}

function vaciarCampos() {
  const dniInput = document.querySelector(".dniBusqueda");
  dniInput.value = "";
  const selects = ["#select-intervenciones", "#select-medicamentos"];

  selects.forEach((selector) => {
    $(selector).val(null).trigger("change");
  });
}

function enviarPlan() {
  const dniInput = document.querySelector(".dniBusqueda");
  const dni = dniInput.value.trim();

  const intervenciones = $("#select-intervenciones").val();
  const medicamentos = $("#select-medicamentos").val();
  const tratamientoInput = document.querySelector(
    'input[name="tratamiento"]:checked'
  );
  const tratamiento = tratamientoInput
    ? tratamientoInput.value === "si"
    : false;

  const data = {
    dni: dni,
    intervenciones: intervenciones,
    medicamentos: medicamentos,
    tratamiento: tratamiento,
  };

  fetch("/enfermeria/planCuidados/enviar-plan", {
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
       bloquear();
       mostrarPaciente("");
      mostrarModalExito();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  //Enviar historial
  const guardarPlan = document.getElementById("guardarPlan");
  if (guardarPlan) {
    guardarPlan.addEventListener("click", enviarPlan);
  } else {
    console.error("No se encontró el elemento guardarPlan");
  }
});
