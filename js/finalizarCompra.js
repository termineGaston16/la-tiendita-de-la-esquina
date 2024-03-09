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
precioTotal = precioFinalConDescuentoAplicado;


/* ------------------- */
/* cargar los datos */
document.querySelector("#datosDeLaCompraFinal").innerHTML = "";

document.querySelector("#datosDeLaCompraFinal").innerHTML = `
    <div class="container-fluid"> 
        
        <!-- Datos de la compra -->
        <div>
            <p> Subtotal: $${subTotal}.</p>
            <p> Impuestos: $${montoImpuesto}.</p>
            <p> Descuento: $0.00.</p>
            <p> Precio total (${carritoActual.length} artículos): $${precioTotal}.</p>
        </div>

        <!-- Canjear código -->
        <div>
            <h6> Canjear Código </h6>
            <input class="form-control me-2" type="text" placeholder="Introduce código de descuento">  
        </div>
    </div>
`

/* ------------------- */
/* cargar resumen */
document.querySelector("#datosDelResumenCompleto").innerHTML = "";

document.querySelector("#datosDelResumenCompleto").innerHTML = `
    <div class="container-fluid"> 
        <h5> Resumen: </h5>
        <ul id="listaDeResumenes"> 
        </ul>
    </div>
`;

/* cargar las consolas en el resumen */
document.querySelector("#listaDeResumenes").innerHTML = "";

carritoActual.forEach(consola => {

    let listaIndividualDeResumen = document.createElement("li");
    listaIndividualDeResumen.innerHTML = `
        <div class="row">
            <div class="col-4">
                <img src="${consola.imagenReferente}" alt="" class="w-50">
            </div>

            <div class="col-8">
                <h5>${consola.nombreConsola}</h5>
                <h6>${consola.anioDeEstreno} || ${consola.compania}</h6>
                <p>$${consola.precioConsola}, (${consola.cantidad})</p>
            </div>
        </div>
    `

    document.querySelector("#listaDeResumenes").append(listaIndividualDeResumen);
});


/* ------------------- */
/* Generar los términos y condiciones, y el btn de pagar */
let contendorFooter = document.createElement("footer")
contendorFooter.innerHTML = `

        <!-- Términos y Condiciones -->
        <div id="terminosYcondiciones"> 
            <input type="checkbox" id="aceptarPrimerTermino"> 
            <span>
                Solicito acceso inmediato a mi compra y acepto que no podré cancelarla una vez que haya empezado 
                a descargar o transmitir por streaming el contenido.
            </span>
        </div>

        <button type="button" id="btnFinalizarCompra" class="btn">Encargar y Abonar</button>
    `
document.querySelector("#contendorFinalizarCompra").append(contendorFooter)


/* Al aceptar el primer termino aparece el segundo */
document.querySelector("#aceptarPrimerTermino").addEventListener("click", () => {

    let valorPrimerTermino = document.querySelector("#aceptarPrimerTermino");
    let segundoTermino = document.querySelector("#terminosYcondiciones2")

    let btnFinal = document.querySelector("#btnFinalizarCompra");

    if (valorPrimerTermino.checked) {

        if (!segundoTermino) {
            let segundoTerminoDiv = document.createElement("div")
            segundoTerminoDiv.id = "terminosYcondiciones2";
            segundoTerminoDiv.innerHTML = `
                <input type="checkbox" id="aceptarSegundoTermino"> 
                <span>
                    Esta tienda virtual realiza los cargos en dólares estadounidenses y se requiere 
                    una tarjeta de crédito/débito internacional para realizar las transacciones.
                </span>
            `
            document.querySelector("#terminosYcondiciones").append(segundoTerminoDiv)
        }

        /* Al aceptar el segundo termino el btn cumpla su funcion */
        document.querySelector("#aceptarSegundoTermino").addEventListener("click", () => {
            let valorSegundoTermino = document.querySelector("#aceptarSegundoTermino");

            if (valorSegundoTermino.checked) {
                btnFinal.classList.add("btn-primary")
                finalizarCompra(btnFinal)

            } else {
                btnFinal.classList.remove("btn-primary")
            }
        })

    } else {

        if (segundoTermino) {
            document.querySelector("#terminosYcondiciones").removeChild(segundoTermino);
        }

        btnFinal.classList.remove("btn-primary")
    }
})

/* Finalizar compra */
function finalizarCompra(botonFinalCompra) {
    botonFinalCompra.addEventListener("click", () => {

        /* cargar metodos de pago del usuario */
        let metodosDePagoDelUsuario = null;
        metodosDePagoDelUsuario = usuario.metodosDePago;

        if (botonFinalCompra.classList.contains("btn-primary") && metodosDePagoDelUsuario.length != 0) {

            Swal.fire({
                html: `
                    <div class="custom-swal-content container-fluid"> 
                        <h4> Selecciona un método de pago: </h4>
    
                        <div id="listaDeMetodosDePago">
                        </div>
    
                    </div>
                `,
                customClass: {
                    popup: '',
                },
                showConfirmButton: false,
                width: 700
            });

            document.querySelector("#listaDeMetodosDePago").innerHTML = ""
            document.querySelector("#listaDeMetodosDePago").innerHTML = `
            <ul class="metodosDePagoDelUsuarioLleno" id="listaMetodosDePago">
            </ul>
            `

            let metodosEnTarjeta = metodosDePagoDelUsuario.filter(metodo => metodo.tipoUser == "TARJETA")
            let metodosEnEfectivo = metodosDePagoDelUsuario.filter(metodo => metodo.tipoUser == "EFECTIVO")
            let metodosEnPaypal = metodosDePagoDelUsuario.filter(metodo => metodo.tipoUser == "PAYPAL")


            /* tarjeta */
            metodosEnTarjeta.forEach(metodoUser => {

                // Crear el elemento button
                let liPagoTarjeta = document.createElement("li");
                liPagoTarjeta.id = metodoUser.cvvUser;
                liPagoTarjeta.classList.add("metodosDePagoDelUsuarioLlenoLi")

                // obtener los últimos 4 digitos.
                let ultimosCuatroDigitos = (metodoUser.numeroTarjetaUser).slice(-4);

                liPagoTarjeta.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card metodosDePagoDelUsuarioLlenoLiLogo" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                </svg>

                <p class="metodosDePagoDelUsuarioLlenoLiText">${ultimosCuatroDigitos}.</p>
            `
                document.querySelector("#listaMetodosDePago").append(liPagoTarjeta)
            })

            /* efectivo */
            metodosEnEfectivo.forEach(metodoUser => {

                // Crear el elemento button
                let liPagoEfectivo = document.createElement("li");
                liPagoEfectivo.id = (metodoUser.direccionTitularUser + metodoUser.numeroTitularUser);
                liPagoEfectivo.classList.add("metodosDePagoDelUsuarioLlenoLi")

                liPagoEfectivo.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-stack metodosDePagoDelUsuarioLlenoLiLogo" viewBox="0 0 16 16">
                    <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                    <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z"/>
                </svg>

                <p class="metodosDePagoDelUsuarioLlenoLiText">${metodoUser.direccionTitularUser}, ${metodoUser.numeroTitularUser}.<p>
            `
                document.querySelector("#listaMetodosDePago").append(liPagoEfectivo)
            })

            /* paypal */
            metodosEnPaypal.forEach(metodoUser => {

                // Crear el elemento button
                let liPagoPaypal = document.createElement("li");
                liPagoPaypal.id = metodoUser.contraseniaTitularUser;
                liPagoPaypal.classList.add("metodosDePagoDelUsuarioLlenoLi")

                liPagoPaypal.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paypal metodosDePagoDelUsuarioLlenoLiLogo" viewBox="0 0 16 16">
                    <path d="M14.06 3.713c.12-1.071-.093-1.832-.702-2.526C12.628.356 11.312 0 9.626 0H4.734a.7.7 0 0 0-.691.59L2.005 13.509a.42.42 0 0 0 .415.486h2.756l-.202 1.28a.628.628 0 0 0 .62.726H8.14c.429 0 .793-.31.862-.731l.025-.13.48-3.043.03-.164.001-.007a.35.35 0 0 1 .348-.297h.38c1.266 0 2.425-.256 3.345-.91q.57-.403.993-1.005a4.94 4.94 0 0 0 .88-2.195c.242-1.246.13-2.356-.57-3.154a2.7 2.7 0 0 0-.76-.59l-.094-.061ZM6.543 8.82a.7.7 0 0 1 .321-.079H8.3c2.82 0 5.027-1.144 5.672-4.456l.003-.016q.326.186.548.438c.546.623.679 1.535.45 2.71-.272 1.397-.866 2.307-1.663 2.874-.802.57-1.842.815-3.043.815h-.38a.87.87 0 0 0-.863.734l-.03.164-.48 3.043-.024.13-.001.004a.35.35 0 0 1-.348.296H5.595a.106.106 0 0 1-.105-.123l.208-1.32z"/>
                </svg>
           
                <p class="metodosDePagoDelUsuarioLlenoLiText">${metodoUser.correoTitularUser}.</p>
            `
                document.querySelector("#listaMetodosDePago").append(liPagoPaypal)
            })
            
        } else if (botonFinalCompra.classList.contains("btn-primary") && metodosDePagoDelUsuario.length == 0) {
            Swal.fire({
                html: `
                    <div class="custom-swal-content container-fluid"> 
                        <p> ¡No tienes metodos de pagos! </p>
                    </div>
                `,
                customClass: {
                    popup: '',
                },
                showConfirmButton: false,
                width: 700
            });
        }

    })
}






