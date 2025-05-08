document.addEventListener("DOMContentLoaded", () => {
    const selectPacientes = document.querySelector(".pacientes");
    const pacienteSeleccionado = document.querySelector(".paciente");
  
    selectPacientes.addEventListener("change", () => {
      const nombrePaciente = selectPacientes.options[selectPacientes.selectedIndex].text;
      pacienteSeleccionado.textContent = ` ${nombrePaciente}`;
      pacienteSeleccionado.style.color = "#1cd82e";
    });
  });