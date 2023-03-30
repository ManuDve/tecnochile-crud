const barra = document.querySelector("#input-actual");
const botnCrearProducto = document.querySelector("#boton-crear-producto");
barra.classList.add("hidden");


function toggleVisibilidad() {
    barra.classList.add("show");
}

function ocultarVisibilidad() {
    barra.classList.remove("show");
}

botnCrearProducto.addEventListener("click", ()=>{
    toggleVisibilidad();
})
