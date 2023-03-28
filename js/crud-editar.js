// Variables

const inputsEditar = document.querySelector("#input-wrapper");
const botonCrearProducto = document.querySelector("#boton-crear-producto");
const main = document.querySelector("main");
const CANTIDAD_DE_ELEMENTOS = 8;


// Funciones de Datos

function insertarProductos(){
    
    productosImaginarios.forEach(elemento=>{
        const nuevaSeccion = document.createElement("section");
        const botonesEditar = document.createElement("div");
        nuevaSeccion.classList.add("producto")
        botonesEditar.classList.add("editar");
        for (let dato in elemento) {
            // Evita que se genere la sucursal
            if (dato != "sucursal") {
                let p = document.createElement("p");
                p.textContent = elemento[dato];
                nuevaSeccion.appendChild(p);
            }
        }
        nuevaSeccion.appendChild(botonesEditar);
        main.appendChild(nuevaSeccion)
    })

}

function eliminarTodosLosProductos(){
    let todosLosProductos = document.querySelectorAll(".producto")
    todosLosProductos.forEach(element => {
        element.remove();
    });
}

function crearProducto(){
    let productoNuevo = new Producto();
    productosImaginarios.push(productoNuevo)
    eliminarTodosLosProductos();
    insertarProductos();
    inicializarBotones();
    agregarListenersBotones();
}


// Funciones Botones CRUD

function crearBotones() {
    const seccionEditar = document.querySelectorAll(".editar");
    seccionEditar.forEach(element => {
        const botonEditar = document.createElement("i");
        const botonEliminar = document.createElement("i");
        botonEditar.classList.add("fa", "fa-edit");
        botonEliminar.classList.add("fa", "fa-trash");
        element.appendChild(botonEditar);
        element.appendChild(botonEliminar);
    });
}

function agregarAceptarCancelar(index){
    const seccionEditar = document.querySelectorAll(".editar");
    const aceptar = document.createElement("i");
    const cancelar = document.createElement("i");
    aceptar.classList.add("fa", "fa-times-circle", "red")
    cancelar.classList.add("fa", "fa-check-circle", "green")
    seccionEditar[index].appendChild(aceptar)
    seccionEditar[index].appendChild(cancelar)
}

function removerBotones() {
    const seccionEditar = document.querySelectorAll(".editar");
    seccionEditar.forEach(element => {
        element.replaceChildren();
    });
}

function removerProducto(index){
    const seccionActual  = document.querySelectorAll(".producto")
    seccionActual[index].remove();
}


function cambiarEstadoProducto(index){
    let productos = document.querySelectorAll(".producto");
    productos[index].classList.toggle("producto--gray")
    productos[index].classList.toggle("editable")
}

function removerEstadoProductos(){
    let productos = document.querySelectorAll(".producto")
    productos.forEach(element => {
        element.classList.remove("producto--gray");
        element.classList.remove("editable");
    });
}

function actualizarPlaceHolders(index) {
    let editable = document.querySelector(".editable"); 
    for(let i=0; i<CANTIDAD_DE_ELEMENTOS; i++) {
        let hijo = editable.children[i].textContent;
        let inputEditar = inputsEditar.children[i];
        inputEditar.value = hijo;
    }
}

function inicializarBotones(){
    removerBotones();
    crearBotones();
} 

// Event Listeners

// Crear producto

botonCrearProducto.addEventListener("click", ()=>{
    crearProducto();
})


function agregarListenersBotones(){

    // Editar
    let editar = document.querySelectorAll(".fa-edit");

    editar.forEach((element, index)=>{
        element.addEventListener("click", ()=>{
            inicializarBotones();
            removerEstadoProductos();
            agregarAceptarCancelar(index);
            cambiarEstadoProducto(index);
            actualizarPlaceHolders(index)
            agregarListenersBotones();
        })
    })

    // Eliminar
    let eliminar = document.querySelectorAll(".fa-trash");
    eliminar.forEach((element, index) => {
        element.addEventListener("click", ()=> {
            inicializarBotones();
            removerProducto(index);
            agregarListenersBotones();
        })
    });

    // Aceptar
    // let aceptar = document.querySelector(".fa-check-circle");

    // Cancelar
    if (document.querySelector(".fa-times-circle")) {
        let cancelar = document.querySelector(".fa-times-circle");
        cancelar.addEventListener("click", ()=>{
            inicializarBotones();
            removerEstadoProductos();
            agregarListenersBotones();
        })
    }    
}

// Inicializar

insertarProductos();
inicializarBotones();
agregarListenersBotones();