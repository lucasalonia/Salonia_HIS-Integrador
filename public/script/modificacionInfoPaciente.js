function abrirModalFichas() {
  const modal = document.querySelector(".informacionCompleta");
  if (modal) {
    modal.style.display = "block";
  }
}
function cerrarModalFichas() {
  const modal = document.querySelector(".informacionCompleta");
  if (modal) {
    modal.style.display = "none";
  }
}
function abrirFichas() {
  const pacienteSeleccionado = document.getElementById("buscarPaciente").value;

  if (!pacienteSeleccionado) return alert("Seleccioná un paciente");

  fetch(`/medicina/infoPaciente/obtenerDatos?id=${pacienteSeleccionado}`)
    .then((response) => {
      if (!response.ok) throw new Error("Error al obtener los datos");
      return response.json();
    })
    .then((data) => {
      const {
        paciente,
        cama,
        internacion,
        obraSocial,
        medico,
        alergias,
        enfermedades,
        cirugias,
        antecedentes,
        medicamentosHistorial,
        sintomas,
        necesidades,
        prioridad,
        presion_arterial,
        frecuencia_cardiaca,
        frecuencia_respiratoria,
        temperatura_corporal,
        color_piel,
        medicamentosPlan,
        intervenciones,
        analisis,
        radiografias,
        resonancia,
        tratamientos,
        fisioterapias,
        ocupacionales,
        medicamentosMedico,
        medicamentoEspecificaciones,
      } = data;

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
      document.querySelector("span.enfermedadesPrevias").textContent =
        enfermedades.length > 0
          ? enfermedades.map((a) => a.descripcion).join(", ")
          : "-";
      document.querySelector("span.cirugias").textContent =
        cirugias.length > 0
          ? cirugias.map((a) => a.descripcion).join(", ")
          : "-";
      document.querySelector("span.antecedentes").textContent =
        antecedentes.length > 0
          ? antecedentes.map((a) => a.descripcion).join(", ")
          : "-";
      document.querySelector("span.medicacionActual").textContent =
        medicamentosHistorial.length > 0
          ? medicamentosHistorial.map((a) => a.descripcion).join(", ")
          : "-";
      document.querySelector("span.sintomas").textContent =
        sintomas.length > 0
          ? sintomas.map((a) => a.descripcion).join(", ")
          : "-";
      document.querySelector("span.necesidades").textContent =
        necesidades.length > 0
          ? necesidades.map((a) => a.descripcion).join(", ")
          : "-";

      const prioridadSpan = document.querySelector("span.prioridad");
      prioridadSpan.textContent = prioridad || "-";
      if (prioridad == "Baja") {
        prioridadSpan.style.color = "green";
      } else if (prioridad == "Media") {
        prioridadSpan.style.color = "orange";
      } else if (prioridad == "Alta") {
        prioridadSpan.style.color = "red";
      } else {
        prioridadSpan.style.color = "black";
      }
      document.querySelector("span.presion").textContent =
        presion_arterial || "-";
      document.querySelector("span.frecuenciaCardiaca").textContent =
        frecuencia_cardiaca || "-";
      document.querySelector("span.frecuenciaRespiratoria").textContent =
        frecuencia_respiratoria || "-";
      document.querySelector("span.temperatura").textContent =
        temperatura_corporal || "-";
      document.querySelector("span.colorPiel").textContent = color_piel || "-";
      document.querySelector("span.medicacionSuministrada").textContent =
        medicamentosPlan.length > 0
          ? medicamentosPlan.map((a) => a.descripcion).join(", ")
          : "-";
      document.querySelector("span.intervenciones").textContent =
        intervenciones.length > 0
          ? intervenciones.map((a) => a.descripcion).join(", ")
          : "-";

      document.querySelector("span.analisis").textContent =
        analisis.length > 0
          ? analisis.map((a) => a.descripcion).join(", ")
          : "-";

      document.querySelector("span.resonancia").textContent =
        radiografias.length > 0
          ? radiografias.map((a) => a.descripcion).join(", ")
          : "-";
      document.querySelector("span.radiografia").textContent =
        resonancia.length > 0
          ? resonancia.map((a) => a.descripcion).join(", ")
          : "-";
      document.querySelector("span.tratamientoMedico").textContent =
        tratamientos.length > 0
          ? tratamientos.map((a) => a.descripcion).join(", ")
          : "-";
      document.querySelector("span.tratamientoFisico").textContent =
        fisioterapias.length > 0
          ? fisioterapias.map((a) => a.descripcion).join(", ")
          : "-";
      document.querySelector("span.tratamientoOcupacional").textContent =
        ocupacionales.length > 0
          ? ocupacionales.map((a) => a.descripcion).join(", ")
          : "-";

      document.querySelector("span.medicacionPrescripta").textContent =
        medicamentosMedico.length > 0
          ? medicamentosMedico.map((a) => a.descripcion).join(", ")
          : "-";
      document.querySelector("span.medicacionDosis").textContent =
        medicamentoEspecificaciones.length > 0
          ? medicamentoEspecificaciones.map((a) => a.dosis).join(", ")
          : "-";
      document.querySelector("span.medicacionDuracion").textContent =
        medicamentoEspecificaciones.length > 0
          ? medicamentoEspecificaciones.map((a) => a.duracion).join(", ")
          : "-";
      abrirModalFichas();
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
  document.querySelectorAll(".cerrar-modal").forEach((btn) => {
    btn.addEventListener("click", function () {
      cerrarModalFichas();
    });
  });
});
