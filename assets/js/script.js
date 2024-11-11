let sumarItem = () =>{
    cantidad = document.getElementById("cantidad").innerHTML;
    cantidad++;
    document.getElementById("cantidad").innerHTML = cantidad;
};


let restarItem = () =>{
    cantidad = document.getElementById("cantidad").innerHTML;
    if(cantidad > 1){
        cantidad--
    }
    document.getElementById("cantidad").innerHTML = cantidad;
};



document.getElementById("btn-+").addEventListener("click", sumarItem);
document.getElementById("btn--").addEventListener("click", restarItem);