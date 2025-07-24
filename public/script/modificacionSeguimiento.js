function desbloquear() {
  const bloqueEvaluacionMedica = document.querySelector(".evaluacionMedica");
  if (bloqueEvaluacionMedica) {
    bloqueEvaluacionMedica.style.opacity = "1";
    bloqueEvaluacionMedica.style.pointerEvents = "auto";
  }
}

function bloquear() {
  const bloqueEvaluacionMedica = document.querySelector(".evaluacionMedica");
  if (bloqueEvaluacionMedica) {
    bloqueEvaluacionMedica.style.opacity = "0.5";
    bloqueEvaluacionMedica.style.pointerEvents = "none";
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
function abrirModalMedicamentos(){
  const modalMedicamentos = document.querySelector(".modalMedicamentos");
  if(modalMedicamentos){
    modalMedicamentos.style.display="flex";
    document.body.style.overflow = "hidden"
  }
}
function cerrarModalMedicamentos(){
  const modalMedicamentos = document.querySelector(".modalMedicamentos");
  if(modalMedicamentos){
    modalMedicamentos.style.display = "none";
    document.body.style.overflow = ""; 
  }
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
    })
});
