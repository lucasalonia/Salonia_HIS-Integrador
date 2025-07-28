function desbloquear() {
  const bloqueseguimiento = document.querySelector(".seguimiento");
  if (bloqueseguimiento) {
    bloqueseguimiento.style.opacity = "1";
    bloqueseguimiento.style.pointerEvents = "auto";
  }
}

function bloquear() {
  const bloqueseguimiento = document.querySelector(".seguimiento");
  if (bloqueseguimiento) {
    bloqueseguimiento.style.opacity = "0.5";
    bloqueseguimiento.style.pointerEvents = "none";
  }
}

function vaciarCampos() {
  const dniInput = document.querySelector(".dniBusqueda");
  dniInput.value = "";
  const selects = [
    "#select-tratMedico",
    "#select-tratFisico",
    "#select-tratOcupacional",
    ,
  ];
  selects.forEach((selector) => {
    $(selector).val(null).trigger("change");
  });
}
function abrirModalMedicamentos() {
  const modalMedicamentos = document.querySelector(".modalMedicamentos");
  if (modalMedicamentos) {
    modalMedicamentos.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}
function cerrarModalMedicamentos() {
  const modalMedicamentos = document.querySelector(".modalMedicamentos");
  if (modalMedicamentos) {
    modalMedicamentos.style.display = "none";
    document.body.style.overflow = "";
  }
}

function enviarSeguimiento() {
  const dniInput = document.querySelector(".dniBusqueda");
  const dni = dniInput.value.trim();
  const tratMedicoSeleccionadas = $("#select-tratMedico").val();
  const tratFisicooSeleccionadas = $("#select-tratFisico").val();
  const tratOcupacionalSeleccionadas = $("#select-tratOcupacional").val();

  const data = {
    dni: dni,
    tratamientos: tratMedicoSeleccionadas,
    fisioterapias: tratFisicooSeleccionadas,
    ocupacionales: tratOcupacionalSeleccionadas,
  };

  fetch("/medicina/seguimiento/enviar-seguimiento", {
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

function enviarSeguimientoMedicamentos() {
  const dniInput = document.querySelector(".dniBusqueda");
  const dni = dniInput.value.trim();
  const medicamento = document.getElementById("select-medicamentos").value;
  const dosis = document.getElementById("select-dosis").value;
  const duracion = document.getElementById("select-duracion").value;

  const data = {
    dni: dni,
    medicamento: [
      {
        id_medicamento: medicamento,
        dosis: dosis,
        duracion: duracion,
      },
    ],
  };

  fetch("/medicina/seguimiento/enviar-medicacion", {
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
      mostrarModalExito();
      vaciarCampos();
      cerrarModalMedicamentos();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}



document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("botonConsultarMedicamentos")
    .addEventListener("click", function () {
      abrirModalMedicamentos();
    });

  document
    .querySelector(".cerrar-modal")
    .addEventListener("click", function () {
      cerrarModalMedicamentos();
    });

  document
    .getElementById("guardarSeguimiento")
    .addEventListener("click", function () {
      const tratMedico = $("#select-tratMedico").val();
      const tratFisico = $("#select-tratFisico").val();
      const tratOcupacionl = $("#select-tratOcupacional").val();

      const seleccionValida =
        (tratMedico && tratMedico.length > 0) ||
        (tratFisico && tratFisico.length > 0) ||
        (tratOcupacionl && tratOcupacionl.length > 0);

      if (!seleccionValida) {
        alert("Debe seleccionar al menos una opción.");
        return;
      }
      enviarSeguimiento();
    });
    document
    .getElementById("guardarMedicamentos")
    .addEventListener("click", function () {
      
      enviarSeguimientoMedicamentos();
    }
  );
});
