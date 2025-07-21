function mostrarPaciente(paciente) {
  document.getElementById("apellidoPaciente").textContent = paciente.apellido;
  document.getElementById("nombrePaciente").textContent = paciente.nombre;
  document.getElementById("dniPaciente").textContent = paciente.dni;
  document.getElementById("idPaciente").textContent = paciente.id;
}

function buscarPacientePorDni() {
  const dniInput = document.querySelector(".dniBusqueda");
  let flag = true;

  if (dniInput && dniInput.value.trim() === "") {
    const dniError = document.querySelector('.error-message[data-field="dni"]');
    if (dniError) {
      dniError.textContent =
        "Ingrese un numero valido para realizar la busqueda del paciente";
        bloquear();
      dniError.classList.add("active");
    }
    flag = false;
    return;
  }
  if (
    (dniInput && !/^\d{8}$/.test(dniInput.value.trim())) ||
    dniInput.value.trim().length !== 8

  ) {
    const dniError = document.querySelector('.error-message[data-field="dni"]');
    if (dniError) {
      dniError.textContent = "El DNI debe tener exactamente 8 números.";
      dniError.classList.add("active");
      bloquear();
      mostrarPaciente("");
    }
    flag = false;
    return;
  }
  if (dniInput.value.startsWith("0")) {
    const dniError = document.querySelector('.error-message[data-field="dni"]');
    if (dniError) {
      dniError.textContent = "El DNI no puede comenzar con 0.";
      dniError.classList.add("active");
      bloquear();
      mostrarPaciente("");
    }
    flag = false;
    return;
  }

  if (flag) {
    const dni = dniInput.value.trim();
    const ruta = document.getElementById("app").dataset.ruta;

    const url = `${ruta}/busqueda-generica/${dni}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al buscar el paciente");
        }
        return response.json();
      })
      .then((data) => {
        if (data.paciente !== null) {


          mostrarPaciente(data.paciente);
          desbloquear();
        } else {
          console.log("No se encontró el paciente con DNI:", dni);
          const dniError = document.querySelector(
            '.error-message[data-field="dni"]'
          );
          mostrarPaciente("");
          if (dniError) {
            dniError.textContent = "No se encontro paciente con ese DNI.";
            dniError.classList.add("active");
            bloquear();
          }
        }
        return data.paciente
      })
      .catch((error) => {
        console.error("Error al buscar el paciente:", error);
      });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  //Buscar paciente
  const botonBuscarDni = document.querySelector(".buscarDni");
  if (botonBuscarDni) {
    botonBuscarDni.addEventListener("click", buscarPacientePorDni);
  } else {
    console.error("No se encontró el elemento botonBuscarDni");
  }
});
