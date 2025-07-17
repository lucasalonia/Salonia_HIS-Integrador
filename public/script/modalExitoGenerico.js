function mostrarModalExito() {
  const modal = document.querySelector(".modalExito");
  if (modal) {
    modal.style.display = "flex";
    setTimeout(() => {
      modal.style.display = "none";
    }, 5000); 
  }
}
function ocultarModalExito() {
  const modal = document.querySelector(".modalExito");
  if (modal) modal.style.display = "none";
}


document.addEventListener("DOMContentLoaded", () => {
  const botonCerrar = document.querySelector(".modalExito .botonCerrarExito");
  if (botonCerrar) {
    botonCerrar.addEventListener("click", ocultarModalExito);
  }
});