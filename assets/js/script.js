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

let carrito = [];



let agregarCarrito = (id,talle,color) =>{
    let productoExiste = carrito.find(elemento.id === id);
    if((productoExiste) && (productoExiste.talle === talle) && (productoExiste.color === color)){
        productoExiste.cantidad++;
    }
    else{
        carrito.push(productoExiste);
    }
}

let actualizarCarrito = () =>{
    let carritoDiv = document.getElementById("producto-carrito");
    carritoDiv.innerHTML = "";
    
    carrito.forEach((producto, index) => {
        //Fila para cada producto
        productoElemento = document.createElement("figure")
        productoElemento.classList.add("row");
        productoElemento.innerHTML = 
        `
        <div class="col-2">
            <img src="${producto.imagenes[0]}" class=" img-thumbnail img-fluid" style="width: 140px; height: auto;" alt="">
        </div>
        <div class="col-10">
            <div>
                <div class="d-flex justify-content-between">
                    <p>${producto.nombre}</p>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </button>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group me-2 w-25" role="group" aria-label="Second group">   
                        <button type="button" id="btn--" class="btn btn-secondary">-</button>
                        <p id="cantidad">${producto.cantidad}</p>
                        <button type="button"  id="btn-+" class="btn btn-secondary">+</button>
                    </div>
                <div>
                    <p>$ <span id="precio-unidad">${producto.precio}</span>  U.</p>
                </div>
                <div class="text-end">
                    <p>$ <span id="precio-total">${producto.precio}*${producto.cantidad}</span></p>
                </div>
            </div>
        </div>
        `;
        carritoDiv.appendChild(productoElemento);
    });
}



fetch('productos.json')
    .then(response => response.json())
    .then(date => {
        /*CARGA PRODUCTOS EN HOME*/
        let listaProductosDiv = document.getElementById("productos")
        let primerosCuatro = date.slice(0,4);
        primerosCuatro.forEach(element => {
            let productoElemento = document.createElement("figure");
            productoElemento.classList.add("col");
            productoElemento.innerHTML = 
            `
            <div class="card h-100">
                <img src="${element.imagenes[0]}" class="card-img-top" alt="...">
                <div class="card-body">
                    <figcaption class="card-title">${element.nombre}</figcaption>
                    <p>$${element.precio}</p>
                    <p>10% de descuento con Transferencia bancaria</p>
                    <button class="agregar-Carrito">Comprar</button>
                </div>
            </div>
            `
            listaProductosDiv.appendChild(productoElemento);
        });
    })
    /*.catch('Ocurrio un error al cargar el inventario', error)*/



document.getElementById("btn-+").addEventListener("click", sumarItem);
document.getElementById("btn--").addEventListener("click", restarItem);

agregarCarrito();