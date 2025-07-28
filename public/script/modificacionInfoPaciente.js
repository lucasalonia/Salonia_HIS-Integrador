function abrirFichas() {
  const pacienteSeleccionado = document.getElementById("buscarPaciente").value;

  if (!pacienteSeleccionado) return alert("Seleccioná un paciente");

  fetch(`/medicina/infoPaciente/obtenerDatos?id=${pacienteSeleccionado}`)
    .then((response) => {
      if (!response.ok) throw new Error("Error al obtener los datos");
      return response.json();
    })
    .then((data) => {
      const { paciente, cama, internacion, obraSocial, medico, alergias, enfermedades, cirugias } =
        data;

      document.querySelector("span.nombre").textContent =
        paciente.nombre || "-";
      document.querySelector("span.apellido").textContent =
        paciente.apellido || "-";
      document.querySelector("span.dni").textContent = paciente.dni || "-";
      document.querySelector("span.numero").textContent =
        paciente.numero_emergencia || "-";
      document.querySelector("span.nacimiento").textContent =
        paciente.fecha_nacimiento || "-";
      document.querySelector("span.sexo").textContent = paciente.sexo || "-";
      document.querySelector("span.direccion").textContent =
        paciente.direccion || "-";
      document.querySelector("span.mail").textContent = paciente.email || "-";
      document.querySelector("span.ciudad").textContent =
        paciente.ciudad || "-";
      document.querySelector("span.medios").textContent =
        paciente.medios_ingreso || "-";
      document.querySelector("span.medico").textContent =
        medico.apellido || "-";
      document.querySelector("span.obraSocial").textContent =
        obraSocial.nombre || "-";
      document.querySelector("span.numeroObra").textContent =
        obraSocial.numero || "-";
      document.querySelector("span.ingreso").textContent =
        internacion.fecha_ingreso || "-";
      document.querySelector("span.cama").textContent = cama.numero_cama || "-";

      document.querySelector("span.alergias").textContent =
        alergias.length > 0
          ? alergias.map((a) => a.descripcion).join(", ") 
          : "-";
        document.querySelector("span.enfermedadesPrevias").textContent  =
        enfermedades.length > 0
          ? enfermedades.map((a) => a.descripcion).join(", ") 
          : "-";
        document.querySelector("span.cirugias").textContent  =
        cirugias.length > 0
          ? cirugias.map((a) => a.descripcion).join(", ") 
          : "-";
      //   document.querySelector("span.antecedentes").textContent = historial.antecedentes || "-";
      //   document.querySelector("span.medicacionActual").textContent = historial.medicacionActual || "-";
      //   document.querySelector("span.sintomas").textContent = historial.sintomas || "-";
      //   document.querySelector("span.necesidades").textContent = historial.necesidades || "-";
      //   document.querySelector("span.prioridad").textContent = historial.prioridad || "-";
      //   document.querySelector("span.presion").textContent = historial.presion || "-";
      //   document.querySelector("span.frecuenciaCardiaca").textContent = historial.frecuenciaCardiaca || "-";
      //   document.querySelector("span.frecuenciaRespiratoria").textContent = historial.frecuenciaRespiratoria || "-";
      //   document.querySelector("span.temperatura").textContent = historial.temperatura || "-";
      //   document.querySelector("span.colorPiel").textContent = historial.colorPiel || "-";
      //   document.querySelector("span.medicacionSuministrada").textContent = historial.medicacionSuministrada || "-";
      //   document.querySelector("span.intervenciones").textContent = historial.intervenciones || "-";

      //   document.querySelector("span.analisis").textContent = medicina.analisis || "-";
      //   document.querySelector("span.resonancia").textContent = medicina.resonancia || "-";
      //   document.querySelector("span.radiografia").textContent = medicina.radiografia || "-";
      //   document.querySelector("span.tratamientoMedico").textContent = medicina.tratamientoMedico || "-";
      //   document.querySelector("span.tratamientoFisico").textContent = medicina.tratamientoFisico || "-";
      //   document.querySelector("span.tratamientoOcupacional").textContent = medicina.tratamientoOcupacional || "-";
      //   document.querySelector("span.medicacionPrescripta").textContent = medicina.medicacionPrescripta || "-";
      //   document.querySelector("span.medicacionDosis").textContent = medicina.medicacionDosis || "-";
      //   document.querySelector("span.medicacionDuracion").textContent = medicina.medicacionDuracion || "-";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Hubo un problema al cargar los datos del paciente.");
    });
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("botonBuscarPaciente")
    .addEventListener("click", function () {
      abrirFichas();
    });
});
