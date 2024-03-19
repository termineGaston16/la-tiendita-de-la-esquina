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
    <div class="container-fluid compraFinal"> 
        
        <!-- Datos de la compra -->
        <div class="compraFinalInfo">
            <p class="compraFinalInfoText"> Subtotal: $<span class="compraFinalInfoTextSpecial">${subTotal}</span>.</p>
            <p class="compraFinalInfoText"> Impuestos: $<span class="compraFinalInfoTextSpecial">${montoImpuesto}</span>.</p>
            <p class="compraFinalInfoText"> Descuento: $<span class="compraFinalInfoTextSpecial">0.00</span>.</p>
            <p class="compraFinalInfoText"> Precio total (<span class="compraFinalInfoTextSpecial">${carritoActual.length}</span> artículos): $<span class="compraFinalInfoTextSpecial">${precioTotal}</span>.</p>
        </div>

        <!-- Canjear código -->
        <div class="compraFinalCodigo">
            <h6 class="compraFinalCodigoTitle"> Canjear Código </h6>
            <input class="form-control me-2 compraFinalCodigoInput" type="text" placeholder="Introduce código de descuento">  
        </div>
    </div>
`

/* ------------------- */
/* cargar resumen */
document.querySelector("#datosDelResumenCompleto").innerHTML = "";

document.querySelector("#datosDelResumenCompleto").innerHTML = `
    <div class="container-fluid mainFinalizarCompraResumenSub"> 
        <h5 class="mainFinalizarCompraResumenSubTitle"> Resumen: </h5>
        <ul class="mainFinalizarCompraResumenUl" id="listaDeResumenes"> 
        </ul>
    </div>
`;

/* cargar las consolas en el resumen */
document.querySelector("#listaDeResumenes").innerHTML = "";

carritoActual.forEach(consola => {

    let listaIndividualDeResumen = document.createElement("li");
    listaIndividualDeResumen.classList.add("mainFinalizarCompraResumenUlLi")
    listaIndividualDeResumen.innerHTML = `
        <div class="row mainFinalizarCompraResumenUlLiSub">
            <div class="col-4 mainFinalizarCompraResumenUlLiSub1">
                <img src="${consola.imagenReferente}" alt="" class="mainFinalizarCompraResumenUlLiSub1Img">
            </div>

            <div class="col-8 mainFinalizarCompraResumenUlLiSub2">
                <h5 class="mainFinalizarCompraResumenUlLiSub2H5">${consola.nombreConsola}</h5>
                <h6 class="mainFinalizarCompraResumenUlLiSub2H6">${consola.anioDeEstreno} || ${consola.compania}</h6>
                <p  class="mainFinalizarCompraResumenUlLiSub2Text">$${consola.precioConsola}, (${consola.cantidad})</p>
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
        <div id="terminosYcondiciones" class="terminosYCondicionesContenedor"> 
            <input type="checkbox" id="aceptarPrimerTermino" class="terminosYCondicionesContenedorCheckbox"> 
            <span class="terminosYCondicionesContenedorText">
                Solicito acceso inmediato a mi compra y acepto que no podré cancelarla una vez que haya empezado 
                a descargar o transmitir por streaming el contenido.
            </span>
        </div>

        <button type="button" id="btnFinalizarCompra" class="btn btnNulo">Encargar y Abonar</button>
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
                <input type="checkbox" id="aceptarSegundoTermino" class="terminosYCondicionesContenedorCheckbox"> 
                <span class="terminosYCondicionesContenedorText">
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
                btnFinal.classList.add("btnListo")
                finalizarCompra(btnFinal)

            } else {
                btnFinal.classList.remove("btnListo")
            }
        })

    } else {

        if (segundoTermino) {
            document.querySelector("#terminosYcondiciones").removeChild(segundoTermino);
        }

        btnFinal.classList.remove("btnListo")
    }
})

/* Finalizar compra */
function finalizarCompra(botonFinalCompra) {
    botonFinalCompra.addEventListener("click", () => {

        /* cargar metodos de pago del usuario */
        let metodosDePagoDelUsuario = null;
        metodosDePagoDelUsuario = usuario.metodosDePago;

        if (botonFinalCompra.classList.contains("btnListo") && metodosDePagoDelUsuario.length != 0) {

            Swal.fire({
                html: `
                    <div class="custom-swal-content container-fluid metodosDePagoParaPagar"> 
                        <h4 style="color:black;"> Selecciona un método de pago: </h4>
    
                        <div id="listaDeMetodosDePago" class="metodosParaPagarContenedor">
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
            
        } else if (botonFinalCompra.classList.contains("btnListo") && metodosDePagoDelUsuario.length == 0) {
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






