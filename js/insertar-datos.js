const barra = document.querySelector("#input-actual");
const botnCrearProducto = document.querySelector("#boton-crear-producto");
barra.classList.add("hidden");


function toggleVisibilidad() {
    barra.classList.toggle("hidden");
    barra.classList.add("show");
}

botnCrearProducto.addEventListener("click", ()=>{
    toggleVisibilidad();
})
