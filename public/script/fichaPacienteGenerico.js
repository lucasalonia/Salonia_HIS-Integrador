function actualizarSpansFichaPaciente(datos) {
  const mapeo = {
    nombre: "nombre",
    apellido: "apellido",
    dni: "dni",
    numero: "numeroEmergencia",
    nacimiento: "fechaNacimiento",
    sexo: "sexo",
    direccion: "direccion",
    mail: "email",
    ciudad: "ciudad",
    medios: "medioIngreso",
    medico: "medico",
    obraSocial: "obraSocial",
    numeroObra: "numeroObraSocial",
    ingreso: "fechaIngreso",
    cama: "cama",
  };

  for (const [claseSpan, claveDato] of Object.entries(mapeo)) {
    const span = document.querySelector(`span.${claseSpan}`);
    if (span) {
      span.textContent = datos[claveDato] ?? "-";
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const secciones = document.querySelectorAll('.fichaPaciente');
  let actual = 0;

  function mostrarSeccion(index) {
    secciones.forEach(sec => sec.classList.remove('active'));
    secciones[index].classList.add('active');
  }


  mostrarSeccion(actual);


  document.querySelectorAll('.fichaPaciente__accionesIzq').forEach(boton => {
    boton.addEventListener('click', () => {
      actual = (actual - 1 + secciones.length) % secciones.length;
      mostrarSeccion(actual);
    });
  });


  document.querySelectorAll('.fichaPaciente__accionesDer').forEach(boton => {
    boton.addEventListener('click', () => {
      actual = (actual + 1) % secciones.length;
      mostrarSeccion(actual);
    });
  });
});