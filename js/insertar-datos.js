class Producto {
    constructor(id, nombre, precio, link, stock, etiquetas, descripcion, categoria, sucursal) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.link = link;
        this.stock = stock;
        this.etiquetas = etiquetas;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.sucursal = sucursal;
    }
}


let productosImaginarios = [
    new Producto(
        "01",
        "Teclado RedDragon RGB",
        "33990",
        "http://www.google.cl",
        "4",
        "teclado, perifericos",
        "Teclado mecánico con luces LED, inalámbrico",
        "28",
        "31",
    ),
    new Producto(
        "02",
        "Teclado DeVarajas",
        "43990",
        "http://www.google.cl",
        "4",
        "teclado, perifericos",
        "Teclado membrana con Bluetooth",
        "28",
        "31",
    ),
]




