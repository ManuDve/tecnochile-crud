// Variables

let urlProductos = 'https://slifer.bsite.net/td-producto';
let urlConsultarCategoria = 'https://slifer.bsite.net/td-categoria';
let urlConsultarSucursal = 'https://slifer.bsite.net/td-sucursal';

let productos = []
let categorias = []
let sucursales = []
let nombreCategoria = ''

const inputBuscador = document.querySelector('#input-buscador');
const btnBuscador = document.querySelector('#boton-buscador');
const inputSucursal = document.querySelector('#input-sucursal');
const btnCrearProducto = document.querySelector('#crear-producto');
const idActual = document.querySelector('#id-actual');
const nombreActual = document.querySelector('#nombre-actual');
const precioActual = document.querySelector('#precio-actual');
const linkActual = document.querySelector('#link-actual');
const stockActual = document.querySelector('#stock-actual');
const etiquetaActual = document.querySelector('#etiqueta-actual');
const descripcionActual = document.querySelector('#descripcion-actual');
const categoriaActual = document.querySelector('#categoria-actual');

const btnCancelarProducto = document.querySelector('#cancelar-producto');

btnBuscador.addEventListener('click',buscarProducto);
inputBuscador.addEventListener('keyup',(e)=>{
    if (e.code === 'Enter') {
        buscarProducto();
    }
});
btnCrearProducto.addEventListener('click',limpiarInput);
btnCancelarProducto.addEventListener('click', ()=>{
    ocultarVisibilidad();
    limpiarInput();
});


const inputsEditar = document.querySelector("#input-wrapper");
const botonCrearProducto = document.querySelector("#boton-crear-producto");
const main = document.querySelector("main");
const CANTIDAD_DE_ELEMENTOS = 8;


// Funciones de Datos

//consultar productos
async function insertarProductos(llegada) {
    //Voy a buscar los prodcutos a la Base de datos
    let data = await fetch(urlProductos+'/idSucursal/31')
    .then(response => response.json())
    .then(data => {
        productos = data
        if (llegada === 1){
            mostrarProductos();
        }
          

    });
    if (llegada === 1){
        inicializarBotones();
        agregarListenersBotones();
    }    
    limpiarInput();
}

function mostrarProductos(){
    productos.forEach(elemento => {
        // obtenerCategorias(contenido.idCategoria)
        const nuevaSeccion = document.createElement("section");
        const botonesEditar = document.createElement("div");
        nuevaSeccion.classList.add("producto")
        botonesEditar.classList.add("editar");
        let p1 = document.createElement("p");
        p1.textContent = elemento.id;
        nuevaSeccion.appendChild(p1);
        let p2 = document.createElement("p");
        p2.textContent = elemento.nombre;
        nuevaSeccion.appendChild(p2);
        let p3 = document.createElement("p");
        p3.textContent = elemento.precio;
        nuevaSeccion.appendChild(p3);
        let p4 = document.createElement("p");
        p4.textContent = elemento.link;
        nuevaSeccion.appendChild(p4);
        let p5 = document.createElement("p");
        p5.textContent = elemento.stock;
        nuevaSeccion.appendChild(p5);
        let p6 = document.createElement("p");
        p6.textContent = elemento.etiqueta;
        nuevaSeccion.appendChild(p6);
        let p7 = document.createElement("p");
        p7.textContent = elemento.descripcion; 
        nuevaSeccion.appendChild(p7);   
        let p8 = document.createElement("p");
        p8.textContent = elemento.idCategoria;               
        nuevaSeccion.appendChild(p8);
           
       
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
    // let productoNuevo = new Producto();
    // productosImaginarios.push(productoNuevo)
    eliminarTodosLosProductos();
    insertarProductos(1);
    limpiarInput();
    // inicializarBotones();
    // agregarListenersBotones();
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

/* function agregarAceptarCancelar(index){
    const seccionEditar = document.querySelectorAll(".editar");
    const aceptar = document.createElement("i");
    const cancelar = document.createElement("i");
    aceptar.classList.add("fa", "fa-times-circle", "red")
    cancelar.classList.add("fa", "fa-check-circle", "green")
    seccionEditar[index].appendChild(aceptar)
    seccionEditar[index].appendChild(cancelar)


} */

function removerBotones() {
    const seccionEditar = document.querySelectorAll(".editar");
    seccionEditar.forEach(element => {
        element.replaceChildren();
    });
}

function removerProducto(index){
    if (window.confirm("¿Esta seguro que desea eliminar este producto?")){      
        const seccionActual  = document.querySelectorAll(".producto")
        seccionActual[index].remove();
        //Elmina lod productos de base de datos
         eliminarProductos(productos[index].id);
    }   
   
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
            cambiarEstadoProducto(index);
            toggleVisibilidad();
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
insertarProductos(1);
consultarSucursales()
// inicializarBotones();
// agregarListenersBotones();



//Agrega y modifica productos en la Base de datos 
async function btnGuardarProducto() {
    let metodo = ''
    let mensajeCorrecto = ''
    let mensajeErroneo=''
    if (idActual.value===''){
        metodo = 'POST';
        idActual.value= '0';
        mensajeCorrecto = 'El producto ha sido creado correctamente';
        mensajeErroneo='El producto no se ha podido agregar';
    }else {
        metodo = 'PUT';
        mensajeCorrecto = 'El producto ha sido actualizado correctamente';
        mensajeErroneo='El producto no se ha podido actualizar'        
    }
    
    //actualizo la Base de datos de productos  
    let response = await fetch(urlProductos, {
        method: metodo,   
        mode: 'cors', 
        cache: 'no-cache',
        credencials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            "id": idActual.value,
            "nombre": nombreActual.value,
            "precio": precioActual.value,
            "link": linkActual.value,
            "stock": stockActual.value,
            "etiqueta": etiquetaActual.value,
            "descripcion": descripcionActual.value,
            "idCategoria": categoriaActual.value,
            "idSucursal": 31 
        })
    }).then(response => {
        if (!response.ok){
            alert(mensajeErroneo);
            return;
        }else {
            alert(mensajeCorrecto)
        }

    })
    crearProducto()
}

//eliminar productos
async function eliminarProductos(llegaId) {

        let response = await fetch(urlProductos+'/'+llegaId, {
            method: 'DELETE',   

        }).then(response => {
            if (!response.ok){
                alert("No se pudo eliminar producto");
                return;
            }else {
                alert("El producto fue eliminado exitosamente")
            }
        })
 
}



//limpiar variables de input 
function limpiarInput() {
    idActual.value = ''
    nombreActual.value = ''
    precioActual.value = ''
    linkActual.value = ''
    stockActual.value = ''
    etiquetaActual.value = ''
    descripcionActual.value = ''
    categoriaActual.value = ''
}

//consultar sucursales
async function consultarSucursales() {
    let data = await fetch(urlConsultarSucursal)
    .then(response => response.json())
    .then(data => {
        sucursales = data
        sucursales.forEach(contenido => {
            if(contenido.id === 31){
               inputSucursal.value  = contenido.id+' '+contenido.nombre
            }
        })    
    });
}

//consultar categorias
async function obtenerCategorias(palabra) {
 
    categorias.forEach(contenido => {
       if(contenido.id === palabra){
        nombreCategoria = contenido.nombre
        
       } 

    })

}

function buscarProducto(){
    if (inputBuscador.value === ''){
        eliminarTodosLosProductos();

        insertarProductos(1);
    }else {
        eliminarTodosLosProductos();
        insertarProductos(0)
        const searchTerm = inputBuscador.value.toLowerCase();
        productos = productos.filter(producto => {
            const name1 = producto.nombre.toLowerCase();
            const description1 = producto.descripcion.toLowerCase();
            const etiquetas1 = producto.etiqueta.toLowerCase();
        
            return name1.includes(searchTerm) || description1.includes(searchTerm) || etiquetas1.includes(searchTerm);
            })
            eliminarTodosLosProductos();
            recargarProductos()
    }
}

function recargarProductos(){
    mostrarProductos()
    inicializarBotones();
    agregarListenersBotones();
    limpiarInput();

}