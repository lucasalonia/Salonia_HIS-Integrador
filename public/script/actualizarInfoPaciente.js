
function guardarEdicion(cell, newValue) {
        const field = cell.dataset.field;
        const rowId = cell.parentElement.querySelector("[data-field='id']").textContent.trim();

        cell.textContent = newValue;

        
        fetch(`/pacientes/actualizar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: rowId,
                field: field,
                value: newValue,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Datos actualizados:", data);
            })
            .catch((error) => {
                console.error("Error al actualizar los datos:", error);
            });
    }



function seleccionarElemento(){
const tabla = document.querySelector("section.tablaPacientes table");

    tabla.addEventListener("dblclick", (event) => {
        const cell = event.target;

        if (cell.tagName === "TD" && cell.dataset.field !== "id") {

            const originalValue = cell.textContent.trim();
            
            const input = document.createElement("input");
            input.type = "text";
            input.value = originalValue;
            input.style.width = "100%";

            cell.textContent = "";
            cell.appendChild(input);
            input.focus();

            input.addEventListener("blur", () => {
                cancelar(cell, originalValue);
            });

            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    guardarEdicion(cell, input.value);
                } else if (e.key === "Escape") {
                    cancelar(cell, originalValue);
                }
            });
        }
    });
}

function cancelar(cell, originalValue) {
        cell.textContent = originalValue;
}




document.addEventListener("DOMContentLoaded", () => {

    seleccionarElemento();

});