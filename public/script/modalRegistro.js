

function openModal() {
    const modal = document.querySelector('.modalRegistro');
    if (modal) {
        modal.style.display = 'flex'; 
    } else {
        console.error('No se encontró el elemento .modalRegistro');
    }
}
function closeModal() {
    const modal = document.querySelector('.modalRegistro');
    if (modal) {
        modal.style.display = 'none'; 
    } else {
        console.error('No se encontró el elemento .modalRegistro');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const closeModalButton = document.querySelector('.closeModal');
    const openModalButton = document.querySelector('.openModal');

    if (openModalButton) {
        openModalButton.addEventListener('click', openModal);
    } else {
        console.error('No se encontró el elemento .openModal');
    }
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal); 
    } else {
        console.error('No se encontró el elemento .closeModal');
    }
   
});