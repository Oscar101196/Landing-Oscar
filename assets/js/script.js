let carrito = [];
let productosCargados = [];

let modificarPrecio = () =>{
    cantidad = document.getElementById("cantidad").innerHTML;
    precio = document.getElementById("precio-unidad").innerHTML;
    precioTotal = precio * cantidad;
    document.getElementById("precio-total").innerHTML = precioTotal;
}

async function cargarProductos() {
    const response = await fetch("/productos.json");
    productosCargados = await response.json();
    cargarCatalogoCarrito(productosCargados);

    //cargarCatalogoCarrito()  CONSULTAR PORQUE SOLO PUEDO USAR PRODUCTOSCARGADOS EN LA PRIMERA FUNCION, PERO EN LA SEGUNDA TENGO QUE VOLVER A USAR FETCH
}

function cargarCatalogoCarrito(productosCargados){
    const listaProductosDiv = document.getElementById("productos-carrito");
    listaProductosDiv.innerHTML = "";
    productosCargados.forEach(
        element => {
        let productoHTML = 
        `
        <figure class "col">
            <div class="card h-100">
                <img src="${element.imagenes[0]}" class="card-img-top" alt="...">
                <div class="card-body">
                    <figcaption class="card-title">${element.nombre}</figcaption>
                    <p>$${element.precio}</p>
                    <p>10% de descuento con Transferencia bancaria</p>
                    <button onclick = "agregarCarrito(${element.id})">Comprar</button>
                </div>
            </div>
        </figure>
        `;
        listaProductosDiv.innerHTML +=productoHTML;
        }
    )
}

function ordenarProductos(){
    let criterio = document.getElementById("ordenarProductos").value;
    let productosOrdenados = [...productosCargados];
    if(criterio === "menor-mayor"){
        productosOrdenados.sort((a,b) => a.precio - b.precio);
    }
    else if(criterio === "mayor-menor"){
        productosOrdenados.sort((a,b) => b.precio - a.precio);
    }
    else if(criterio === "alfabetico"){
        productosOrdenados.sort((a,b) => a.nombre.localeCompare(b.nombre));
    }
    cargarCatalogoCarrito(productosOrdenados);
}

async function agregarCarrito(id){
    let response = await fetch("/productos.json");
    let productos = await response.json();
    let cantidad = 1;
    let productoSeleccionado = productos.find(elemento => elemento.id === id);
    let productoExiste = carrito.find(p => p.id === id);
    if(productoExiste){
        productoExiste.cantidad++;
    }
    else{
        let productoEnCarrito ={
            ...productoSeleccionado,cantidad
        }
        carrito.push(productoEnCarrito);
        alert(`Agregaste ${productoSeleccionado.nombre} al carrito!`);
    }
    actualizarCarrito();
}


function cambiarCantidad(index, cambio){
    carrito[index].cantidad = Math.max(1,carrito[index].cantidad + cambio);
    actualizarCarrito();
    console.log(carrito);
    
}

function eliminarDelCarrito(index){
    carrito.splice(index,1);
    actualizarCarrito();
}

function mostrarTotales(){
    let zonaMontos = document.getElementById("montos");
    let total = carrito.reduce((total,producto) =>{
        return total + producto.precio * producto.cantidad},0);
    zonaMontos.innerHTML =
    `
    <div> 
        <p class="text-center">Estas a $21.000 de envio gratis</p>
    </div>
    <div class="row d-flex justify-content-between">
        <div class="col-6">
            <p>Subtotal (sin envio): </p>
        </div>
        <div class="col-6 text-end">
            <p>${total}</p>
        </div>
    </div>
    <div> 
        <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo"                 aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        Medios de envio
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <p>kaka</p>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                    Nuestros Locales
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <p>kaka</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row d-flex justify-content-between">
        <div class="col-6"> 
            <p>Total:</p>
        </div>
        <div class="col-6 text-end"><p>${total}</p></div>
    </div>
    <div class="d-flex justify-content-center">
        <div>
            <button class="btn btn-primary" type="button">INICIAR COMPRA</button>
            <p class="text-center" data-bs-dismiss="offcanvas">Ver más productos</p>
        </div>
    </div>
    `
}

let actualizarCarrito = () =>{
    let carritoDiv = document.getElementById("producto-carrito");
    carritoDiv.innerHTML = '';
    if(carrito.length === 0){
        carritoDiv.innerHTML = '<p>Tu carrito esta vacio</p>';
    }
    else{
        carrito.forEach((producto, index) => {
            //Fila para cada producto
            carritoDiv.innerHTML +=
            `
            <figure class = "row">     
                <div class="col-2">
                    <img src="${producto.imagenes[0]}" class=" img-thumbnail img-fluid" style="width: 140px; height: auto;" alt="">
                </div>
                <div class="col-10">
                    <div>
                        <div class="d-flex justify-content-between">
                            <p>${producto.nombre}</p>
                            <button onclick = "eliminarDelCarrito(${index})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                </svg>
                            </button>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group me-2 w-25" role="group" aria-label="Second group">  
                                <button onclick = "cambiarCantidad(${index},-1)" type="button" id="btn--" class="btn btn-secondary">-</button>
                                <input type = "number" value = "${producto.cantidad}" min ="1" id="cantidad-${producto.id}">
                                <button onclick = "cambiarCantidad(${index},1)" type="button"  id="btn-+" class="btn btn-secondary">+</button>
                            </div>
                        <div>
                            <p>$ <span id="precio-unidad">${producto.precio}</span>  U.</p>
                        </div>
                        <div class="text-end">
                            <p>$ <span id="precio-total">${producto.precio*producto.cantidad}</span></p>
                        </div>
                    </div>
                </div>
            </figure>
            `;           
        });
    }
    mostrarTotales()
}

// document.addEventListener("click", cambiarCantidad);
// document.addEventListener("click", cambiarCantidad);
document.addEventListener("change", ordenarProductos); //POR ALGUNA RAZON, LA FUNCION ONCHAGE EN EL HTML NO ME LO TOMABA, ESTABA BIEN ESCRITO Y DEMAS.
window.onload = cargarProductos;
actualizarCarrito();
