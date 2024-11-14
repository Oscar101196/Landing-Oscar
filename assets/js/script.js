let sumarItem = () =>{
    cantidad = document.getElementById("cantidad").innerHTML;
    cantidad++;
    document.getElementById("cantidad").innerHTML = cantidad;

    modificarPrecio();
};


let restarItem = () =>{
    cantidad = document.getElementById("cantidad").innerHTML;
    if(cantidad > 1){
        cantidad--
    }
    document.getElementById("cantidad").innerHTML = cantidad;

    modificarPrecio();
};

let modificarPrecio = () =>{
    cantidad = document.getElementById("cantidad").innerHTML;
    precio = document.getElementById("precio-unidad").innerHTML;
    precioTotal = precio * cantidad;
    document.getElementById("precio-total").innerHTML = precioTotal;
}

let agregarProducto = () =>{
    
}

document.getElementById("btn-+").addEventListener("click", sumarItem);
document.getElementById("btn--").addEventListener("click", restarItem);

fetch('productos.json')
    .then(response => response.json())
    .then(date => {
        let listaProductosDiv = document.getElementById("productos")

        date.forEach(element => {
            let productoElemento = document.createElement("figure");
            productoElemento.classList.add("col");
            productoElemento.innerHTML = 
            `
            <div class="card h-100">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <figcaption class="card-title">${date.nombre}</figcaption>
                    <p>$${date.precio}</p>
                    <p>10% de descuento con Transferencia bancaria</p>
                    <button class="agregar-Carrito">Comprar</button>
                </div>
            </div>
            `
            listaProductosDiv.appendChild(productoElemento);
        });
    })
