function desbloquear() {
  const bloqueEvaluacion = document.querySelector(".evaluacion");;
  if (bloqueEvaluacion) {
    bloqueEvaluacion.style.opacity = "1";
    bloqueEvaluacion.style.pointerEvents = "auto";
  }
}

function bloquear() {
  const bloqueEvaluacion = document.querySelector(".evaluacion");
  if (bloqueEvaluacion) {
    bloqueEvaluacion.style.opacity = "0.5";
    bloqueEvaluacion.style.pointerEvents = "none";
  }
}

function vaciarCampos() {
  const frecuenciaCardiaca = document.getElementById('frecuencia_cardiaca');
  const presionArterial = document.getElementById('presion_arterial');
  const frecuenciaRespiratoria = document.getElementById('frecuencia_respiratoria');
  const temperaturaCorporal = document.getElementById('temperatura_corporal');
  const colorPiel = document.getElementById('color_piel');

  frecuenciaCardiaca.value = '';
  presionArterial.value = '';
  frecuenciaRespiratoria.value = '';
  temperaturaCorporal.value = '';
  colorPiel.selectedIndex = 0; 
}

function enviarEvaluacion() {
  const dniInput = document.querySelector(".dniBusqueda");
  const dni = dniInput.value.trim();

  const presion_arterial = document.getElementById('presion_arterial').value;
  const frecuencia_cardiaca = document.getElementById('frecuencia_cardiaca').value;
  const frecuencia_respiratoria = document.getElementById('frecuencia_respiratoria').value;
  const temperatura_corporal = document.getElementById('temperatura_corporal').value;
  const color_piel = document.getElementById('color_piel').value;

  const respuestaEstimuloInput = document.querySelector('input[name="respuesta_estimulo"]:checked');
  const respuesta_estimulo = respuestaEstimuloInput ? respuestaEstimuloInput.value : null;


  const data = {
    dni: dni,
    presion_arterial: parseInt(presion_arterial),
    frecuencia_cardiaca: parseInt(frecuencia_cardiaca),
    frecuencia_respiratoria: parseInt(frecuencia_respiratoria),
    temperatura_corporal: parseFloat(temperatura_corporal),
    color_piel: color_piel,
    respuesta_estimulo: respuesta_estimulo === "true",
  };


  fetch("/enfermeria/evaluacionFisica/enviar-evaluacion", {
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
    
  document.getElementById("guardarEvaluacion").addEventListener("click", function () {
    const form = document.querySelector("form.evaluacionBasica");
    if (form.checkValidity()) {
      enviarEvaluacion(); 
    } else {
      form.reportValidity(); 
    }
  });
});