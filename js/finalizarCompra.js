/* verificar usuario */
let usuario = null;

if (localStorage.getItem("usuarioLogueado") != null) {
    usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
}

/* ------------------- */
/* carrito */
let carritoActual = null;
carritoActual = usuario.carrito;

/* ------------------- */
/* calcular los precios totales */
let subTotal = 0;
let impuestoDelPais = 21;
let montoImpuesto = 0;
let precioFinalConDescuentoAplicado = 0;
let descuento = 0;
let precioTotal = 0;
let cantidadDeArticulos = 0;

/* subtotal */
carritoActual.forEach(consola => {
    let precioFinal = 0;
    precioFinal = (consola.precioConsola * consola.cantidad);

    subTotal += precioFinal;
});

/* impuesto */
montoImpuesto = (subTotal * impuestoDelPais) / 100;
precioFinalConDescuentoAplicado = subTotal + montoImpuesto;

/* precio total */
precioTotal=precioFinalConDescuentoAplicado;




