function validarCampos() {
    let nombre = document.getElementById("nombre-actual").value;
    let precio = document.getElementById("precio-actual").value;
    let stock = document.getElementById("stock-actual").value;
  
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