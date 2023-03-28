// Variables

const seccionEditar = document.querySelectorAll(".editar");
const inputsEditar = document.querySelector("#input-actual");
const botonCrearProducto = document.querySelector("#boton-crear-producto");
const CANTIDAD_DE_ELEMENTOS = 8;

// Funciones

function crearProducto() {
    let main = document.querySelector("main");
    let nuevoProducto = document.createElement("section");
    nuevoProducto.classList.add("producto");
    main.appendChild(nuevoProducto);
    seccionEditar = document.querySelectorAll(".editar");
}

function crearBotones() {
    seccionEditar.forEach(element => {
        const botonEditar = document.createElement("i");
        const botonEliminar = document.createElement("i");
        botonEditar.classList.add("fa", "fa-edit");
        botonEliminar.classList.add("fa", "fa-trash");
        element.appendChild(botonEditar);
        element.appendChild(botonEliminar);
    });
}

function removerBotones() {
    seccionEditar.forEach(element => {
        element.replaceChildren();
    });
}

function removerProducto(boton){
    boton.forEach((element, index) => {
        const seccionActual  = document.querySelectorAll(".producto")
        element.addEventListener("click", ()=> {
            seccionActual[index].remove();
        })
    });
}


function agregarAceptarCancelar(boton){
    boton.forEach((element, index) => {
        const seccionActual  = document.querySelectorAll(".editar")
        const productoActual = document.querySelectorAll(".producto")
        element.addEventListener("click", ()=> {
            limpiarBotones();
            crearBotones();
            let aceptar = document.createElement("i");
            let cancelar = document.createElement("i");
            aceptar.classList.add("fa", "fa-times-circle", "red")
            cancelar.classList.add("fa", "fa-check-circle", "green")
            seccionActual[index].appendChild(aceptar);
            seccionActual[index].appendChild(cancelar);
            agregarListenersBotones();
            
        })
    });
}

function cambiarEstadoProducto(boton){
    let productos = document.querySelectorAll(".producto");
    boton.forEach((element, index) => {
        element.addEventListener("click", ()=> {
            productos[index].classList.toggle("producto--gray")
            productos[index].classList.toggle("editable")
        })
    });
}

function removerEstadoProducto(){
    let productos = document.querySelectorAll(".producto")
    productos.forEach(element => {
        element.classList.remove("producto--gray");
        element.classList.remove("editable");
    });
}

function removerModificar(boton) {
    boton.forEach((element, index) => {
        const seccionActual  = document.querySelectorAll(".editar")
        element.addEventListener("click", ()=> {
            inicializarBotones();
        })
    });
}


function actualizarPlaceHolders(boton) {
    boton.forEach((element, index) => {
        element.addEventListener("click", ()=> {
            let editable = document.querySelector(".editable");
            
            for(let i=0; i<CANTIDAD_DE_ELEMENTOS; i++) {
                let hijo = editable.children[i].textContent;
                let inputEditar = inputsEditar.children[i];
                inputEditar.value = hijo;
            }
        })
    });
}

function agregarListenersBotones(){
    // Crear producto

    botonCrearProducto.addEventListener("click", ()=>{
        crearProducto();
    })

    // Editar
    let editar = document.querySelectorAll(".fa-edit");
    agregarAceptarCancelar(editar);
    cambiarEstadoProducto(editar);
    actualizarPlaceHolders(editar);
    

    // Eliminar
    let eliminar = document.querySelectorAll(".fa-trash");
    removerProducto(eliminar);

    // Aceptar
    let aceptar = document.querySelectorAll(".fa-check-circle");

    // Cancelar
    let cancelar = document.querySelectorAll(".fa-times-circle");
    removerModificar(cancelar);
}

function limpiarBotones(){
    removerEstadoProducto();
    removerBotones();
}

function inicializarBotones(){
    removerEstadoProducto();
    removerBotones();
    crearBotones();
    agregarListenersBotones();
}

// Inicializar

inicializarBotones();

