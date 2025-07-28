function desbloquear() {
  const evaluacionMedica = document.querySelector(".evaluacionMedica");
  if (evaluacionMedica) {
    evaluacionMedica.style.opacity = "1";
    evaluacionMedica.style.pointerEvents = "auto";
  }
}

function bloquear() {
  const evaluacionMedica = document.querySelector(".evaluacionMedica");
  if (evaluacionMedica) {
    evaluacionMedica.style.opacity = "0.5";
    evaluacionMedica.style.pointerEvents = "none";
  }
}

function vaciarCampos() {
  const dniInput = document.querySelector(".dniBusqueda");
  dniInput.value = "";
  const selects = [
    "#select-analisis",
    "#select-resonancias",
    "#select-radiografias",
    ,
  ];
  selects.forEach((selector) => {
    $(selector).val(null).trigger("change");
  });
}
function vaciarCampos() {
  const dniInput = document.querySelector(".dniBusqueda");
  dniInput.value = "";
  const selects = [
    "#select-analisis",
    "#select-resonancias",
    "#select-radiografias",
  ];

  selects.forEach((selector) => {
    $(selector).val(null).trigger("change");
  });
}

function enviarEvaluacionMedica() {
  const dniInput = document.querySelector(".dniBusqueda");
  const dni = dniInput.value.trim();
  const analisisSeleccionadas = $("#select-analisis").val();
  const resonanciasSeleccionadas = $("#select-resonancias").val();
  const radiografiasSeleccionadas = $("#select-radiografias").val();

  const data = {
    dni: dni,
    analisis: analisisSeleccionadas,
    resonancias: resonanciasSeleccionadas,
    radiografias: radiografiasSeleccionadas,
  };

  fetch("/medicina/evaluacionMedica/enviar-evaluacionMedica", {
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

document
  .getElementById("guardarSolicitudEvaluacion")
  .addEventListener("click", function () {
    document
      .getElementById("guardarSolicitudEvaluacion")
      .addEventListener("click", function () {
        const analisis = $("#select-analisis").val();
        const resonancias = $("#select-resonancias").val();
        const radiografias = $("#select-radiografias").val();

        const seleccionValida =
          (analisis && analisis.length > 0) ||
          (resonancias && resonancias.length > 0) ||
          (radiografias && radiografias.length > 0);

        if (!seleccionValida) {
          alert(
            "Debe seleccionar al menos una opción en análisis de sangre, resonancias o radiografías."
          );
          return;
        }

        const form = document.querySelector("form.solicitarEvaluacion");
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        enviarEvaluacionMedica();
      });
  });
