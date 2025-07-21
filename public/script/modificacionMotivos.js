
const sintomasValores = {
  "Dolor de cabeza intenso": 5,
  "Vómitos": 4,
  "Náuseas": 3,
  "Mareos o vértigo": 4,
  "Pérdida de conciencia": 10,
  "Sangrado": 8,
  "Debilidad en un lado del cuerpo": 9,
  "Convulsiones": 10,
  "Palpitaciones": 5,
  "Tos persistente": 2,
  "Dolor muscular o articular": 3,
  "Dolor de garganta": 2,
  "Erupciones en la piel": 1,
  "Inflamación": 2,
  "Ansiedad o ataques de pánico": 3,
  "Visión borrosa o pérdida de visión": 7,
  "Dolor lumbar o de espalda": 3,
  "Dolor al orinar": 3,
  "Ardor o picazón genital": 2,
  "Diarrea": 3,
  "Estreñimiento severo": 3,
  "Pérdida de apetito": 4,
  "Pérdida de peso sin causa aparente": 5,
  "Fatiga extrema": 4,
  "Sensación de desmayo": 7,
  "Confusión o desorientación": 9,
  "Insomnio": 1,
  "Dificultad para hablar": 8,
  "Dolor en oídos": 3,
  "Dolor dental o de mandíbula": 2
};

const necesidadesValores = {
  "No requiere atención inmediata": 0,
  "Oxigenoterapia urgente": 10,
  "Control del dolor intenso": 8,
  "Soporte emocional inmediato": 3,
  "Derivación a especialista": 5,
  "Atención por sangrado activo": 10,
  "Reanimación urgente": 15
};

function calcularPrioridad() {
  let suma = 0;


  const sintomasSeleccionados = $('#select-sintomas').select2('data');
  sintomasSeleccionados.forEach(sintoma => {
    const desc = sintoma.text;
    if (sintomasValores[desc]) suma += sintomasValores[desc];
  });

  const necesidadesSeleccionadas = $('#select-necesidades').select2('data');
  necesidadesSeleccionadas.forEach(necesidad => {
    const desc = necesidad.text;
    if (necesidadesValores[desc]) suma += necesidadesValores[desc];
  });

  return suma;
}

function actualizarPrioridad() {
  const prioridad = calcularPrioridad();
  let textoPrioridad = "";

  if (prioridad === 0) {
    textoPrioridad = "(ninguna selección)";
  } else if (prioridad <= 10) {
    textoPrioridad = "Baja";
    document.querySelector(".prioridadValor").style= "color: #33ff00ff "

  } else if (prioridad <= 20) {
    textoPrioridad = "Media";
    document.querySelector(".prioridadValor").style= "color: #b3b623ff "
  } else {
    textoPrioridad = "Alta";
    document.querySelector(".prioridadValor").style= "color: #FF0000 "
  }


  document.querySelector(".prioridadValor").textContent = textoPrioridad;
  if(textoPrioridad == "(ninguna selección)"){
    document.querySelector(".prioridadValor").style= "color: #000000ff "
  }
}


function desbloquear() {
  const bloqueMotivo = document.querySelector(".motivo");
  if (bloqueMotivo) {
    bloqueMotivo.style.opacity = "1";
    bloqueMotivo.style.pointerEvents = "auto";
  }
}

function bloquear() {
  const bloqueMotivo = document.querySelector(".motivo");
  if (bloqueMotivo) {
    bloqueMotivo.style.opacity = "0.5";
    bloqueMotivo.style.pointerEvents = "none";
  }
}

function vaciarCampos(){
  const dniInput = document.querySelector(".dniBusqueda");
  dniInput.value = "";
  const selects = [
  "#select-necesidades",
  "#select-sintomas",
,
];

selects.forEach(selector => {
 $(selector).val(null).trigger('change');
});
}
function enviarMotivos() {
  const dniInput = document.querySelector(".dniBusqueda");
  const dni = dniInput.value.trim();
  
  const necesidades = $("#select-necesidades").val();
  const sintomas = $("#select-sintomas").val();


  const prioridad = document.querySelector(".prioridadValor").textContent;

  const data = {
    dni: dni,
    necesidades: necesidades,
    sintomas: sintomas,
    prioridad: prioridad,

  };

  fetch("/enfermeria/motivosInternacion/enviar-motivos", {
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
    
  $('#select-sintomas').on('change', actualizarPrioridad);
  $('#select-necesidades').on('change', actualizarPrioridad);


  actualizarPrioridad();

  //Enviar historial
  const guardarMotivo = document.getElementById("guardarMotivo");
  if (guardarMotivo) {
    guardarMotivo.addEventListener("click", enviarMotivos);
  } else {
    console.error("No se encontró el elemento guardarMotivo");
  }
});
