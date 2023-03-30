function validarCampos() {
    let nombre = document.getElementById("nombre-actual").value;
    let precio = document.getElementById("precio-actual").value;
    let link = document.getElementById("link-actual").value;
    let stock = document.getElementById("stock-actual").value;
    let etiqueta = document.getElementById("etiqueta-actual").value;
    let descripcion = document.getElementById("descripcion-actual").value;
    let categoria = document.getElementById("categoria-actual").value;


    if (nombre.length === 0) {
        alert("El campo nombre no puede estar vacío");
        return false;
    }

    if (link.length === 0) {
        alert("El campo link no puede estar vacío");
        return false;
    }

    if (etiqueta.length === 0) {
        alert("El campo etiqueta no puede estar vacío");
        return false;
    }

    if (descripcion.length === 0) {
        alert("El campo descripcion no puede estar vacío");
        return false;
    }

    if (nombre.length > 50) {
        alert("El nombre no puede tener más de 50 caracteres");
        return false;
    }

    if (precio === "" || isNaN(precio)) {
        alert("El precio debe ser un número válido");
        return false;
    }

    if (precio % 1 !== 0 || precio < 0 || precio > 2147483647) {
        alert("El precio debe ser un número entero válido");
        return false;
    }
    
    if (categoria === "" || isNaN(categoria)) {
        alert("La categoria debe ser un número válido");
        return false;
    }

    if (stock === "" || isNaN(stock)) {
        alert("El stock debe ser un número válido");
        return false;
    }

    if (stock % 1 !== 0 || stock < 0 || stock > 2147483647) {
        alert("El stock debe ser un número entero válido");
        return false;
    }
    btnGuardarProducto();
    return true;   
    
}