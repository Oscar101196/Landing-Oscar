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
