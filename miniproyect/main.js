class Producto {
    constructor(nombre, precio, cantidad, iva) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.iva = iva ? 'Si' : 'No';
    }
}

class Tienda {
    constructor() {
        this.productos = [];
    }

    agregar(producto) {
        this.productos.push(producto);
    }

    quitar(nombre) {
        this.productos = this.productos.filter(producto => producto.nombre !== nombre);
    }

    mostrar(nombre) {
        return this.productos.find(producto => producto.nombre === nombre);
    }

    lista() {
        return this.productos;
    }
}

const miTienda = new Tienda();

function agregarProducto() {
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let cantidad = document.getElementById("cantidad").value;
    let iva = document.getElementById("tax").checked;

    if (nombre && !isNaN(precio) && !isNaN(cantidad)) {
        miTienda.agregar(new Producto(nombre, precio, cantidad, iva));
    } else {
        alert("Por favor, introduzca datos válidos.");
    }
}

function mostrarProductos() {
    agregarProducto();
    let recienA = document.querySelector(".added-list");
    recienA.innerHTML = ""; 

    let table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.marginTop = "20px";

    let thead = document.createElement("thead");
    let headerRow = document.createElement("tr");

    let headers = ["Nombre", "Precio", "Unidades", "IVA"];
    headers.forEach(headerText => {
        let th = document.createElement("th");
        th.textContent = headerText;
        th.style.border = "1px solid #ddd";
        th.style.padding = "8px";
        th.style.backgroundColor = "#f2f2f2";
        th.style.textAlign = "left";
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    let tbody = document.createElement("tbody");

    miTienda.lista().forEach(producto => {
        let row = document.createElement("tr");

        Object.values(producto).forEach(text => {
            let td = document.createElement("td");
            td.textContent = text;
            td.style.border = "1px solid #ddd";
            td.style.padding = "8px";
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    recienA.appendChild(table);
}

document.getElementById("agregarBtn").addEventListener("click", mostrarProductos);

// Ejemplo de uso de localStorage para almacenar los productos
function guardarEnLocalStorage() {
    const jsonData = miTienda.lista().map(producto => ({
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad,
        iva: producto.iva
    }));
    const json = JSON.stringify(jsonData, null, 2);
    localStorage.setItem('productos', json);
}

// Llamar a la función de guardar cuando se agreguen productos
document.getElementById("agregarBtn").addEventListener("click", guardarEnLocalStorage);
