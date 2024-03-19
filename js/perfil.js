/* verificar usuario */
let usuario = null;

if (localStorage.getItem("usuarioLogueado") != null) {
    usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
}

/* ------------------- */
/* completar planilla de usuario */

/* datos de la cuenta */
function actualizarInterfazUsuario() {
    var tarjetaUsuario = document.querySelector("#tarjetaUsuario");

    if (tarjetaUsuario) {
        tarjetaUsuario.innerHTML = `
            <div class="mainPerfilTarjetaUsuarioPerfil">
                <div id="contenedorFotoPerfil" class="mainPerfilTarjetaUsuarioPerfilLogo">
                    <img src="${usuario.fotoPerfil}" alt="${usuario.nombreDeUsuario}" class="mainPerfilTarjetaUsuarioPerfilLogoImg">
                </div>
                <p class="mainPerfilTarjetaUsuarioPerfilNames">${usuario.nombres} ${usuario.apellidos}</p>
                <p class="mainPerfilTarjetaUsuarioPerfilNamesUser">@${usuario.nombreDeUsuario}</p>
                <p class="mainPerfilTarjetaUsuarioPerfilCorreo">${usuario.correoElectronico}</p>
            </div>
        `;
    }
}
actualizarInterfazUsuario()

/* ------------------- */
/* ajustes de la cuenta */

/* cambiar foto de perfil */
document.querySelector("#btnFotoPerfil").addEventListener("click", () => {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // Acepta únicamente archivos de imagen


    input.addEventListener('change', function (event) {
        let selectedFile = event.target.files[0];

        if (selectedFile) {
            // Obtener la ruta de la imagen
            let imagePath = URL.createObjectURL(selectedFile);
            usuario.fotoPerfil = imagePath;

            // Actualizar la interfaz de usuario
            actualizarInterfazUsuario();

            // Almacenar la información actualizada en el almacenamiento local
            localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));

            // Almacenar la información actualizada en el almacenamiento local (Array)
            let listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados"));

            let usuarioEncontrado = listaDeUsuarios.find(usuarioLista => usuarioLista.id == usuario.id);

            if (usuarioEncontrado) {
                usuarioEncontrado.fotoPerfil = usuario.fotoPerfil;

                localStorage.setItem("usuariosRegistrados", JSON.stringify(listaDeUsuarios));
            }
        }
    });

    input.click();
});

/* cambiar datos personales */
document.querySelector("#btnCambiarDatosPersonales").addEventListener("click", () => {

    /* cargar la planilla */
    document.querySelector("#tarjetaDatos").innerHTML = `

    <div class="row g-3 mainPerfilTarjetaDatosContenedor">
        <h4>Cambia tus datos:</h4>
                
        <!-- Nombres -->
        <div class="col-sm-6 mainPerfilTarjetaDatosContenedorSub">
            <label for="cambiarNombres" class="form-label mainPerfilTarjetaDatosContenedorLabel">Nombres:</label>
            <input type="text" class="form-control mainPerfilTarjetaDatosContenedorInput" id="cambiarNombres"
                placeholder="${usuario.nombres}">
            <button class="btn mainPerfilTarjetaDatosContenedorBtn" id="btnCambiarNombres">Aceptar</button>  
        </div>

        <!-- Apellidos -->
        <div class="col-sm-6 mainPerfilTarjetaDatosContenedorSub">
            <label for="cambiarApellidos" class="form-label mainPerfilTarjetaDatosContenedorLabel">Apellidos:</label>
            <input type="text" class="form-control mainPerfilTarjetaDatosContenedorInput" id="cambiarApellidos"
                placeholder="${usuario.apellidos}">
                <button class="btn mainPerfilTarjetaDatosContenedorBtn" id="btnCambiarApellidos">Aceptar</button>  
        </div>

        <!-- Nombre de usuario -->
        <div class="col-12 mainPerfilTarjetaDatosContenedorSub" id="cambiarNombreUsuarioContenedor">
            <label for="cambiarNombreUsuario" class="form-label mainPerfilTarjetaDatosContenedorLabel">Nombre
                de Usuario:</label>
                <input type="text" class="form-control mainPerfilTarjetaDatosContenedorInput" id="cambiarNombreUsuario"
                    placeholder="${usuario.nombreDeUsuario}">
                <button class="btn mainPerfilTarjetaDatosContenedorBtn" id="btnCambiarNombreUsuario">Aceptar</button>  
            </div>
        </div>
    </div>
    `

    /* cambiar nombres */
    document.querySelector("#btnCambiarNombres").addEventListener("click", () => {
        let nuevoNombres = document.querySelector("#cambiarNombres").value;

        if (nuevoNombres) {
            usuario.nombres = nuevoNombres;
            actualizarInterfazUsuario();

            /* actualizar el local */
            localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
            let listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados"));
            let usuarioEncontrado = listaDeUsuarios.find(usuarioLista => usuarioLista.id == usuario.id);
            if (usuarioEncontrado) {
                usuarioEncontrado.nombres = usuario.nombres;
                localStorage.setItem("usuariosRegistrados", JSON.stringify(listaDeUsuarios));
            }
        }
    })

    /* cambiar apellidos */
    document.querySelector("#btnCambiarApellidos").addEventListener("click", () => {
        let nuevoApellidos = document.querySelector("#cambiarApellidos").value;

        if (nuevoApellidos) {
            usuario.apellidos = nuevoApellidos;
            actualizarInterfazUsuario();

            /* actualizar el local */
            localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
            let listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados"));
            let usuarioEncontrado = listaDeUsuarios.find(usuarioLista => usuarioLista.id == usuario.id);
            if (usuarioEncontrado) {
                usuarioEncontrado.apellidos = usuario.apellidos;
                localStorage.setItem("usuariosRegistrados", JSON.stringify(listaDeUsuarios));
            }
        }
    })

    /* cambiar nombre usuario */
    document.querySelector("#btnCambiarNombreUsuario").addEventListener("click", () => {
        let nuevoNombreUsuario = document.querySelector("#cambiarNombreUsuario").value;

        if (nuevoNombreUsuario) {

            let usuariosRegistradosEnElSistema = JSON.parse(localStorage.getItem("usuariosRegistrados"))
            if (usuariosRegistradosEnElSistema.length != 0) {
                let avisoExistente = document.querySelector("#avisoNombreDeUsuarioNoEstáDisponible");

                if (usuariosRegistradosEnElSistema.some(usuario => usuario.nombreDeUsuario === nuevoNombreUsuario)) {
                    if (!avisoExistente) {
                        let aviso = document.createElement("p");
                        aviso.id = "avisoNombreDeUsuarioNoEstáDisponible";
                        aviso.innerHTML = "* Este nombre de usuario no está disponible.";
                        aviso.style.color = "red";

                        let campoContenedor = document.querySelector("#cambiarNombreUsuarioContenedor");
                        campoContenedor.appendChild(aviso);
                    }

                } else {
                    if (avisoExistente) {
                        avisoExistente.parentElement.removeChild(avisoExistente);
                    }

                    usuario.nombreDeUsuario = nuevoNombreUsuario;
                    actualizarInterfazUsuario();

                    /* actualizar el local */
                    localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
                    let listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados"));
                    let usuarioEncontrado = listaDeUsuarios.find(usuarioLista => usuarioLista.id == usuario.id);
                    if (usuarioEncontrado) {
                        usuarioEncontrado.nombreDeUsuario = usuario.nombreDeUsuario;
                        localStorage.setItem("usuariosRegistrados", JSON.stringify(listaDeUsuarios));
                    }

                }
            }
        }
    })
})

/* cambiar contraseña */
document.querySelector("#btnCambiarContrasenia").addEventListener("click", () => {

    /* cargar la planilla */
    document.querySelector("#tarjetaDatos").innerHTML = `
    <div class="row g-3 mainPerfilTarjetaDatosContenedor">
        <h4>Cambia tu contraseña:</h4>

        <!-- Contraseña Antigua-->
        <div class="col-12 mainPerfilTarjetaDatosContenedorSub" id="contraseniaAntiguaContenedor">
            <label for="contraseniaAntigua" class="form-label mainPerfilTarjetaDatosContenedorLabel">Introduce tu antigua contraseña:</label>
            <input type="password" class="form-control mainPerfilTarjetaDatosContenedorInput" id="contraseniaAntigua" placeholder="(****)">
        </div>

        <!-- Contraseña -->
        <div class="col-12 mainPerfilTarjetaDatosContenedorSub" id="contraseniaNuevaContenedor">
            <label for="contraseniaNueva" class="form-label mainPerfilTarjetaDatosContenedorLabel">Crea una nueva contraseña:</label>
            <input type="password" class="form-control mainPerfilTarjetaDatosContenedorInput" id="contraseniaNueva" placeholder="(****)">
        </div>

        <!-- Revisar Contraseña -->
        <div class="col-12 mainPerfilTarjetaDatosContenedorSub" id="revisarContraseniaNuevaContenedor">
            <label for="revisarContraseniaNueva" class="form-label mainPerfilTarjetaDatosContenedorLabel">Confirmar nueva contraseña:</label>
            <input type="password" class="form-control mainPerfilTarjetaDatosContenedorInput" id="revisarContraseniaNueva"
                placeholder="(Vuelve a introducir tu contraseña para validarla)">
        </div>

        <button class="btn mainPerfilTarjetaDatosContenedorBtn" id="btnRenovarContrasenia"> Renovar contraseña </button>
    </div>
    `
    /* click btn */
    document.querySelector("#btnRenovarContrasenia").addEventListener("click", () => {

        /* validar los campos */
        /* validar si están vacíos */
        function validarQueElCampoNoEsteVacio(idDeCampo, idDeCampoContenedor) {
            let campoContenedor = document.querySelector(idDeCampoContenedor);
            let avisoExistente = campoContenedor.querySelector("#avisoCampoVacio");

            if (document.querySelector(idDeCampo).value === "") {
                if (!avisoExistente) {
                    let aviso = document.createElement("p");
                    aviso.id = "avisoCampoVacio";
                    aviso.innerHTML = "* Completa este campo.";
                    aviso.style.color = "red";

                    campoContenedor.appendChild(aviso);
                }
                return false;
            } else {
                if (avisoExistente) {
                    avisoExistente.parentElement.removeChild(avisoExistente);
                }
                return true;
            }
        }

        /* validar si las contraseñas coinciden */
        function validarSiLasContraseniasCoinciden(idDeCampoContrasenia1, idDeCampoContrasenia2, idDeCampoContenedor) {
            let campoContenedor = document.querySelector(idDeCampoContenedor);
            let avisoExistente = campoContenedor.querySelector("#avisoContraNoCoinciden");

            if (document.querySelector(idDeCampoContrasenia1).value !== "" && document.querySelector(idDeCampoContrasenia2).value !== "") {
                if (document.querySelector(idDeCampoContrasenia1).value !== document.querySelector(idDeCampoContrasenia2).value) {
                    if (!avisoExistente) {
                        let aviso = document.createElement("p");
                        aviso.innerHTML = "* Las contraseñas no coinciden.";
                        aviso.style.color = "red";

                        aviso.id = "avisoContraNoCoinciden";
                        campoContenedor.appendChild(aviso);
                    }

                    return false;
                } else {
                    if (avisoExistente) {
                        avisoExistente.parentElement.removeChild(avisoExistente);
                    }

                    return true;
                }
            }
            return false;
        }

        /* validar que la antigua contraseña exista */
        function validarAntiguaContrasenia(idDeCampo, idDeCampoContenedor) {
            let campoContenedor = document.querySelector(idDeCampoContenedor);
            let avisoExistente = campoContenedor.querySelector("#avisoAntiguaContrasenia");

            if (document.querySelector("#contraseniaAntigua").value !== "") {
                if (usuario.contrasenia !== document.querySelector("#contraseniaAntigua").value) {
                    if (!avisoExistente) {
                        let aviso = document.createElement("p");
                        aviso.innerHTML = "* Esta contraseña no coincide con la de tu cuenta.";
                        aviso.style.color = "red";

                        aviso.id = "avisoAntiguaContrasenia";
                        campoContenedor.appendChild(aviso);
                    }

                    return false;
                } else {
                    if (avisoExistente) {
                        avisoExistente.parentElement.removeChild(avisoExistente);
                    }
                    return true;
                }
            }
        }

        /* contraseña válida */
        /* variables */
        let contraAntiguaValidos = false;
        let contraNuevaValida = false;

        contraAntiguaValidos = validarQueElCampoNoEsteVacio("#contraseniaAntigua", "#contraseniaAntiguaContenedor")
        contraNuevaValida = validarQueElCampoNoEsteVacio("#contraseniaNueva", "#contraseniaNuevaContenedor")
        contraNuevaValida = validarQueElCampoNoEsteVacio("#revisarContraseniaNueva", "#revisarContraseniaNuevaContenedor")

        contraAntiguaValidos = validarAntiguaContrasenia("#contraseniaAntigua", "#contraseniaAntiguaContenedor");
        contraNuevaValida = validarSiLasContraseniasCoinciden("#contraseniaNueva", "#revisarContraseniaNueva", "#revisarContraseniaNuevaContenedor")

        /* cambiar contraseña */
        if (contraAntiguaValidos && contraNuevaValida) {
            let nuevaContrasenia = document.querySelector("#contraseniaNueva").value;

            if (nuevaContrasenia) {
                usuario.contrasenia = nuevaContrasenia;

                /* actualizar el local */
                localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
                let listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados"));
                let usuarioEncontrado = listaDeUsuarios.find(usuarioLista => usuarioLista.id == usuario.id);
                if (usuarioEncontrado) {
                    usuarioEncontrado.contrasenia = usuario.contrasenia;
                    localStorage.setItem("usuariosRegistrados", JSON.stringify(listaDeUsuarios));

                    Swal.fire({
                        html: `
                        <div class="custom-swal-content alertUsuarioRegistrado"> 
                            <p class="alertUsuarioRegistradoText">¡Contraseña cambiada!</p>
                            <a href="../index.html" class="btn alertUsuarioRegistradoBtn">Volver</a>
                        </div>
                    `,
                        customClass: {
                            popup: 'alertFondo',
                        },
                        showConfirmButton: false,
                    });
                }
            }
        }
    })
})

/* cerrar sesión */
document.querySelector("#btnCerrarSesion").addEventListener("click", () => {
    localStorage.setItem("usuarioLogueado", null)

    window.location.href = "../index.html"
})

/* ------------------- */
/* Abrir y cerrar el menu nav */

/* abrir */
document.querySelector("#btnHeaderPerfilNav").addEventListener("click", () => {
    document.querySelector("#idMenuNavPerfilFondoNegro").classList.remove("d-none")
    document.querySelector("#idMenuPerfilOpen").classList.remove("opacity-0")
    document.querySelector("#idMenuPerfilOpen").classList.add("open")

})
/* cerrar */
document.querySelector("#idMenuNavPerfilFondoNegro").addEventListener("click", () => {
    document.querySelector("#idMenuNavPerfilFondoNegro").classList.add("d-none")
    document.querySelector("#idMenuPerfilOpen").classList.add("opacity-0")
    document.querySelector("#idMenuPerfilOpen").classList.remove("open")
})

/* cerrar con boton cambiar datos */
document.querySelector("#btnCambiarDatosPersonales").addEventListener("click", () => {
    document.querySelector("#idMenuNavPerfilFondoNegro").classList.add("d-none")
    document.querySelector("#idMenuPerfilOpen").classList.add("opacity-0")
    document.querySelector("#idMenuPerfilOpen").classList.remove("open")
})

document.querySelector("#btnCambiarContrasenia").addEventListener("click", () => {
    document.querySelector("#idMenuNavPerfilFondoNegro").classList.add("d-none")
    document.querySelector("#idMenuPerfilOpen").classList.add("opacity-0")
    document.querySelector("#idMenuPerfilOpen").classList.remove("open")
})

document.querySelector("#btnMetodosDePago").addEventListener("click", () => {
    document.querySelector("#idMenuNavPerfilFondoNegro").classList.add("d-none")
    document.querySelector("#idMenuPerfilOpen").classList.add("opacity-0")
    document.querySelector("#idMenuPerfilOpen").classList.remove("open")
})

/* ------------------- */
/* carrito */
let carritoActual = null;
carritoActual = usuario.carrito;

/* --------------- */
/* notificacion del carrito */
if (carritoActual.length != 0) {
    document.querySelector("#btnCarritoPerfilNav").innerHTML = `
    <a href="#" class="nav-link menuHeaderPerfilLiLink position-relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
            class="bi bi-cart3 menuHeaderPerfilLiLinkLogo" viewBox="0 0 16 16">
            <path
            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
        </svg>
        <span class="position-absolute top-1  start-90 translate-middle p-1 rounded-circle" style="background: white; border: 1px solid white; box-shadow: 0px 0px 5px white;">
            <span class="visually-hidden">New alerts</span>
        </span>
    </a>
    `
} else {
    document.querySelector("#btnCarritoPerfilNav").innerHTML = `
    <a href="#" class="nav-link menuHeaderPerfilLiLink position-relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
            class="bi bi-cart3 menuHeaderPerfilLiLinkLogo" viewBox="0 0 16 16">
            <path
            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
        </svg>
    </a>
    `
}

/* --------------- */
/* Cargar Productos */
document.querySelector("#btnCarritoPerfilNav").addEventListener("click", () => {
    document.querySelector("#tarjetaDatos").innerHTML = "";

    if (carritoActual.length != 0) {
        document.querySelector("#tarjetaDatos").innerHTML = `
        <div class="container text-center">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4" id="idProductosCarritoRow">
            </div>
        </div>
        `

        cargarCarrito(carritoActual);

        /* generar el btn de finalizar compra */
        let btnFinalizarCompra = document.createElement("button")
        btnFinalizarCompra.id="idBtnFinalizarCompra";
        btnFinalizarCompra.classList.add("btn")
        btnFinalizarCompra.classList.add("btnFinalizarLaCompra")
        btnFinalizarCompra.innerHTML=`
            <p> Finalizar Compra </p>
        `
        document.querySelector("#tarjetaDatos").append(btnFinalizarCompra);

        /* finalizar la compra */
        document.querySelector("#idBtnFinalizarCompra").addEventListener("click", ()=>{
            window.location.href = "../index/finalizarCompra.html";
        })

    } else {
        document.querySelector("#tarjetaDatos").innerHTML = "";

        document.querySelector("#tarjetaDatos").innerHTML = `
        <div class="container text-center mainPerfilTarjetaDatosCarritoVacio">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-bag-x" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708"/>
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
            </svg>
        </div>
        <p class="mainPerfilTarjetaDatosCarritoVacioText"> No tienes productos en el carrito. </p>
        `
        document.querySelector("#btnCarritoPerfilNav").innerHTML = `
            <a href="#" class="nav-link menuHeaderPerfilLiLink position-relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                    class="bi bi-cart3 menuHeaderPerfilLiLinkLogo" viewBox="0 0 16 16">
                    <path
                    d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
            </a>
        `
    }
})

function cargarCarrito(arrayCarrito) {
    document.querySelector("#idProductosCarritoRow").innerHTML = "";

    arrayCarrito.forEach(consola => {

        /* precio total*/
        let precioTotal = 0;
        precioTotal = consola.precioConsola * consola.cantidad;

        let div1 = document.createElement("div")
        div1.classList.add("col")
        div1.classList.add("mainPerfilTarjetaDatosCarritoLleno")
        div1.innerHTML = `
            <button type="button" class="btn btnAnularUnidadProducto" id="${consola.id + "anularUnidad"}">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </button>
            <img src="${consola.imagenReferente}" alt="${consola.nombreConsola}" class="mainPerfilTarjetaDatosCarritoLlenoImg">
            <h5 class="mainPerfilTarjetaDatosCarritoLlenoName">${consola.nombreConsola}</h5>
            <div class="carritoLlenoOpciones"> 
                <button type="button" class="btn btnRestarUnidadProducto" id="${consola.id + "restarUnidad"}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-dash-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                    </svg>
                </button>

                <div class="carritoLlenoOpcionesProductoCantidad">${consola.cantidad}</div>

                <button type="button" class="btn btnSumarUnidadProducto" id="${consola.id + "sumarUnidad"}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </button>
            </div>
            <p class="mainPerfilTarjetaDatosCarritoLlenoPrecio"> Precio: $${precioTotal}.</p>
        `
        document.querySelector("#idProductosCarritoRow").append(div1);
    });

    restarUnidadProducto(carritoActual, ".btnRestarUnidadProducto", cargarCarrito);
    sumarUnidadProducto(carritoActual, ".btnSumarUnidadProducto", cargarCarrito)
    anularrUnidadProducto(carritoActual, ".btnAnularUnidadProducto", cargarCarrito)
}

/* --------------- */
/* Restar o Sumar cantidad */

/* restar */
function restarUnidadProducto(arrayCarrito, claseBoton, callBack) {
    let botonesRestarUnidad = document.querySelectorAll(claseBoton);

    botonesRestarUnidad.forEach(boton => {
        boton.addEventListener("click", (e) => {

            /* encontrar la consola cuando se hace click en "boton restar unidad" */
            let consola = arrayCarrito.find(consolaCarrito => (consolaCarrito.id + "restarUnidad") == e.currentTarget.id);

            /* una vez obtenida, nos fijamos si existe más de una unidad */
            if (consola.cantidad > 1) {

                let index = arrayCarrito.findIndex(producto => producto.id == consola.id)
                arrayCarrito[index].cantidad--;
                usuario.carrito = arrayCarrito;

                /* actualizar el local */
                localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
                let listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados"));
                let usuarioEncontrado = listaDeUsuarios.find(usuarioLista => usuarioLista.id == usuario.id);
                if (usuarioEncontrado) {
                    usuarioEncontrado.carrito = usuario.carrito;
                    localStorage.setItem("usuariosRegistrados", JSON.stringify(listaDeUsuarios));
                }
            }

            callBack(arrayCarrito)
        });
    });
}

/* sumar */
function sumarUnidadProducto(arrayCarrito, claseBoton, callBack) {
    let botonesSumarUnidad = document.querySelectorAll(claseBoton);

    botonesSumarUnidad.forEach(boton => {
        boton.addEventListener("click", (e) => {

            /* encontrar la consola cuando se hace click en "boton sumar unidad" */
            let consola = arrayCarrito.find(consolaCarrito => (consolaCarrito.id + "sumarUnidad") == e.currentTarget.id);

            /* una vez obtenida, nos fijamos si existe más de una unidad */
            if (consola.cantidad < 99) {

                let index = arrayCarrito.findIndex(producto => producto.id == consola.id)
                arrayCarrito[index].cantidad++;
                usuario.carrito = arrayCarrito;

                /* actualizar el local */
                localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
                let listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados"));
                let usuarioEncontrado = listaDeUsuarios.find(usuarioLista => usuarioLista.id == usuario.id);
                if (usuarioEncontrado) {
                    usuarioEncontrado.carrito = usuario.carrito;
                    localStorage.setItem("usuariosRegistrados", JSON.stringify(listaDeUsuarios));
                }
            }

            callBack(arrayCarrito)
        });
    });
}

/* anular */
function anularrUnidadProducto(arrayCarrito, claseBoton, callBack) {
    let botonesAnularProducto = document.querySelectorAll(claseBoton);

    botonesAnularProducto.forEach(boton => {
        boton.addEventListener("click", (e) => {

            /* encontrar la consola cuando se hace click en "boton anular unidad" */
            let consola = arrayCarrito.find(consolaCarrito => (consolaCarrito.id + "anularUnidad") == e.currentTarget.id);

            /* si la consola existe, eliminarla */
            if (consola) {

                let index = arrayCarrito.findIndex(producto => producto.id == consola.id)
                if (index !== -1) {
                    arrayCarrito.splice(index, 1);
                    usuario.carrito = arrayCarrito;
                }

                /* actualizar el local */
                localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
                let listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados"));
                let usuarioEncontrado = listaDeUsuarios.find(usuarioLista => usuarioLista.id == usuario.id);
                if (usuarioEncontrado) {
                    usuarioEncontrado.carrito = usuario.carrito;
                    localStorage.setItem("usuariosRegistrados", JSON.stringify(listaDeUsuarios));
                }
            }

            callBack(arrayCarrito)

            if (arrayCarrito.length == 0) {
                window.location.href = "../index/perfil.html";
            }
        });
    });
}

/* ------------------- */
/* favoritos */
let consolasFavoritas = null;
favoritos = usuario.fav;

/* --------------- */
/* Cargar Productos favoritos */
document.querySelector("#btnFavPerfilNav").addEventListener("click", () => {
    document.querySelector("#tarjetaDatos").innerHTML = "";

    if (favoritos.length != 0) {
        document.querySelector("#tarjetaDatos").innerHTML = `
        <div class="container text-center">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4" id="idProductosCarritoRow">
            </div>
        </div>
        `
        cargarFav(favoritos) 
    } else {
        document.querySelector("#tarjetaDatos").innerHTML = `
        <div class="container text-center mainPerfilTarjetaDatosFavVacia">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-bookmark-heart" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
            </svg>
        </div>
        <p class="mainPerfilTarjetaDatosFavVaciaText">Tu lista de favoritos está vacía.</p>
        `
    }

})

function cargarFav(arrayFav) {
    document.querySelector("#idProductosCarritoRow").innerHTML = "";

    arrayFav.forEach(consola => {

        let div1 = document.createElement("div")
        div1.classList.add("col")
        div1.classList.add("mainPerfilTarjetaDatosFavLlena")
        div1.innerHTML = `
            <img src="${consola.imagenReferente}" alt="${consola.nombreConsola}" class="mainPerfilTarjetaDatosFavLlenaImg">
            <h5 class="mainPerfilTarjetaDatosFavLlenaNome">${consola.nombreConsola}</h5>
            <h6 class="mainPerfilTarjetaDatosFavLlenaFecha"> Fecha de salida: ${consola.anioDeEstreno}.</h6>
            <p class="mainPerfilTarjetaDatosFavLlenaPrecio> Precio: $${consola.precioConsola}.</p>
        `
        document.querySelector("#idProductosCarritoRow").append(div1);
    });

}

/* --------------- */
/* Métodos de Pago */

document.querySelector("#btnMetodosDePago").addEventListener("click", () => {

    /* cargar la planilla */
    document.querySelector("#tarjetaDatos").innerHTML = `

    <div class="row g-3 mainPerfilTarjetaDatosContenedor">
        <h4>Métodos de Pago:</h4>
                
        <div class="row mainPerfilTarjetaDatosMetodosDePago">

            <!-- Agregar Método de pago -->
            <div class="col-xl-6 col-md-6 col-sm-12 container text-center mainPerfilTarjetaDatosMetodosDePagoAgregar">

                <h6>Agregar método de pago: </h6>
                <div class="row mainPerfilTarjetaDatosMetodosDePagoAgregarBtns">
                    <div class="col mainPerfilTarjetaDatosMetodosDePagoAgregarBtnsCol">
                        <button type="button" class="btn btnAgregarTarjetaClass" id="btnAgregarTarjeta">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                                <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                            </svg>
                        </button>
                        <p class="btnAgregarTarjetaClassText">Tarjeta (Crédito / Débido)</p>
                    </div>
                    <div class="col mainPerfilTarjetaDatosMetodosDePagoAgregarBtnsCol">
                        <button type="button" class="btn btnAgregarTarjetaClass" id="btnAgregarEfectivo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-stack" viewBox="0 0 16 16">
                                <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                                <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z"/>
                            </svg>
                        </button> 
                        <p class="btnAgregarTarjetaClassText">Efectivo</p>
                    </div>
                    <div class="col mainPerfilTarjetaDatosMetodosDePagoAgregarBtnsCol">
                        <button type="button" class="btn btnAgregarTarjetaClass" id="btnAgregarPaypal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paypal" viewBox="0 0 16 16">
                                <path d="M14.06 3.713c.12-1.071-.093-1.832-.702-2.526C12.628.356 11.312 0 9.626 0H4.734a.7.7 0 0 0-.691.59L2.005 13.509a.42.42 0 0 0 .415.486h2.756l-.202 1.28a.628.628 0 0 0 .62.726H8.14c.429 0 .793-.31.862-.731l.025-.13.48-3.043.03-.164.001-.007a.35.35 0 0 1 .348-.297h.38c1.266 0 2.425-.256 3.345-.91q.57-.403.993-1.005a4.94 4.94 0 0 0 .88-2.195c.242-1.246.13-2.356-.57-3.154a2.7 2.7 0 0 0-.76-.59l-.094-.061ZM6.543 8.82a.7.7 0 0 1 .321-.079H8.3c2.82 0 5.027-1.144 5.672-4.456l.003-.016q.326.186.548.438c.546.623.679 1.535.45 2.71-.272 1.397-.866 2.307-1.663 2.874-.802.57-1.842.815-3.043.815h-.38a.87.87 0 0 0-.863.734l-.03.164-.48 3.043-.024.13-.001.004a.35.35 0 0 1-.348.296H5.595a.106.106 0 0 1-.105-.123l.208-1.32z"/>
                            </svg>
                        </button>
                        <p class="btnAgregarTarjetaClassText">Paypal</p>
                    </div>
                </div>
            </div>

            <!-- Métodos de pago del usuario -->
            <div class="col-xl-6 col-md-6 col-sm-12 metodosDePagoDelUsuario" id="metodosDePagosDelUsuario">
                <h6>Tús metodos de pago: </h6>
                
            </div>
        </div>
        
    </div>
    `

    /* ------------------- */
    /* agregar método de pago */

    /* tarjeta */
    document.querySelector("#btnAgregarTarjeta").addEventListener("click", () => {
        Swal.fire({
            html: `
                <div class="custom-swal-content container-fluid alertAgregarTarjeta"> 
                    <h4> Datos de la Tarjeta: </h4>

                    <div class="row gy-3 alertAgregarTarjetaSub">
                        <div class="col-md-6 alertAgregarTarjetaInputContenedor" id="tarjetaNombreContenedor">
                            <label for="tarjetaNombre" class="form-label">Titular de la tarjeta: </label>
                            <input type="text" class="form-control alertAgregarTarjetaInput" id="tarjetaNombre" placeholder="nombre y apellidos completos">
                        </div>

                        <div class="col-md-6 alertAgregarTarjetaInputContenedor" id="tarjetaNumeroContenedor">
                            <label for="tarjetaNumero" class="form-label">Nº Tarjeta: </label>
                            <input type="number" class="form-control alertAgregarTarjetaInput" id="tarjetaNumero" placeholder="1111 1111 1111 1111">
                        </div>

                        <div class="col-md-6 alertAgregarTarjetaInputContenedor" id="tarjetaVenciContenedor">
                            <label for="tarjetaVenci" class="form-label">Fecha de Vencimiento: </label>
                            <input type="number" class="form-control alertAgregarTarjetaInput" id="tarjetaVenci" placeholder="MM / YY">
                        </div>

                        <div class="col-md-6 alertAgregarTarjetaInputContenedor" id="tarjetaCvvContenedor">
                            <label for="tarjetaCvv" class="form-label">CVV</label>
                            <input type="number" class="form-control alertAgregarTarjetaInput" id="tarjetaCvv" placeholder="123">
                        </div>
                    </div>

                    <hr class="my-4">

                    <button class="btn alertAgregarTarjetaBtn" type="submit" id="btnMetodoPagoTarjeta">Agregar Tarjeta</button>
                </div>
            `,
            customClass: {
                popup: '',
            },
            showConfirmButton: false,
            width: 700
        });

        /* ------------------- */
        /* acción de agregar método */
        document.querySelector("#btnMetodoPagoTarjeta").addEventListener("click", () => {

            /* variables */
            let titularValido = false;
            let numeroTarjetaValido = false;
            let fechaVencimientoValido = false;
            let cvvValido = false;

            /* funciones */
            titularValido = validarQueElCampoNoEsteVacio("#tarjetaNombre", "#tarjetaNombreContenedor")
            numeroTarjetaValido = validarQueElCampoNoEsteVacio("#tarjetaNumero", "#tarjetaNumeroContenedor")
            fechaVencimientoValido = validarQueElCampoNoEsteVacio("#tarjetaVenci", "#tarjetaVenciContenedor")
            cvvValido = validarQueElCampoNoEsteVacio("#tarjetaCvv", "#tarjetaCvvContenedor")

            numeroTarjetaValido = validarNumeroTarjeta("#tarjetaNumero", "#tarjetaNumeroContenedor")
            fechaVencimientoValido = validarFechaVencimiento("#tarjetaVenci", "#tarjetaVenciContenedor")
            cvvValido = validarCodigoSeguridad("#tarjetaCvv", "#tarjetaCvvContenedor")

            /* validar que no exista la misma tarjeta */
            let metodosDePagosDelUsuario = null;
            metodosDePagosDelUsuario = usuario.metodosDePago;

            let avisoExistente = document.querySelector("#avisoTarjetaYaRegistrada");
            let numeroTarjeta = document.querySelector("#tarjetaNumero").value;
            let fechaVenciTarjeta = document.querySelector("#tarjetaVenci").value;
            let cvvTarjeta = document.querySelector("#tarjetaCvv").value;

            if (metodosDePagosDelUsuario.length != 0) {
                if (metodosDePagosDelUsuario.some(metodo =>
                    metodo.numeroTarjetaUser == numeroTarjeta || metodo.fechaVencimientoUser == fechaVenciTarjeta
                    || metodo.cvvUser == cvvTarjeta)) {

                    if (!avisoExistente) {
                        let aviso = document.createElement("p");
                        aviso.id = "avisoTarjetaYaRegistrada";
                        aviso.innerHTML = "* Esta tarjeta ya está registrada.";
                        aviso.style.color = "red";

                        let campoContenedor = document.querySelector("#tarjetaCvvContenedor");
                        campoContenedor.appendChild(aviso);
                    }

                    titularValido = false;

                } else {

                    if (avisoExistente) {
                        avisoExistente.parentElement.removeChild(avisoExistente);
                    }

                    titularValido = true;
                }
            }

            /* agregar nueva tarjeta */
            if (titularValido && numeroTarjetaValido && fechaVencimientoValido && cvvValido) {

                /* ------------------- */
                /* tarjeta objeto */
                let nuevoMetodoDePago = {
                    tipoUser: "",
                    nombreTitularUser: "",
                    numeroTarjetaUser: 0,
                    fechaVencimientoUser: 0,
                    cvvUser: 0
                };

                /* resto de datos */
                nuevoMetodoDePago.tipoUser = "TARJETA";
                nuevoMetodoDePago.nombreTitularUser = document.querySelector("#tarjetaNombre").value.toLowerCase();
                nuevoMetodoDePago.numeroTarjetaUser = document.querySelector("#tarjetaNumero").value;
                nuevoMetodoDePago.fechaVencimientoUser = document.querySelector("#tarjetaVenci").value;
                nuevoMetodoDePago.cvvUser = document.querySelector("#tarjetaCvv").value;

                /* subirlo al local storage */
                metodosDePagosDelUsuario.push(nuevoMetodoDePago)
                usuario.metodosDePago = metodosDePagosDelUsuario;

                /* actualizar el local */
                localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
                let listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados"));
                let usuarioEncontrado = listaDeUsuarios.find(usuarioLista => usuarioLista.id == usuario.id);
                if (usuarioEncontrado) {
                    usuarioEncontrado.metodosDePago = usuario.metodosDePago;
                    localStorage.setItem("usuariosRegistrados", JSON.stringify(listaDeUsuarios));
                }

                Swal.fire({
                    html: `
                        <div class="custom-swal-content alertUsuarioRegistrado"> 
                            <p class="alertUsuarioRegistradoText">¡Tarjeta registrada!</p>
                            <a href="../index/perfil.html" class="btn alertUsuarioRegistradoBtn">Volver</a>
                        </div>
                    `,
                    customClass: {
                        popup: 'alertFondo',
                    },
                    showConfirmButton: false,
                });
            }
        })
    })

    /* efectivo */
    document.querySelector("#btnAgregarEfectivo").addEventListener("click", () => {
        Swal.fire({
            html: `
                <div class="custom-swal-content container-fluid alertAgregarTarjeta"> 
                    <h4> Datos Voleta Efectiva: </h4>

                    <div class="row gy-3 alertAgregarTarjetaSub">
                        <div class="col-md-6 alertAgregarTarjetaInputContenedor" id="efectivoNombreContenedor">
                            <label for="efectivoNombre" class="form-label">Titular: </label>
                            <input type="text" class="form-control alertAgregarTarjetaInput" id="efectivoNombre" placeholder="nombre y apellidos completos">
                        </div>

                        <div class="col-md-6 alertAgregarTarjetaInputContenedor" id="efectivoNumeroCelularContenedor">
                            <label for="efectivoNumeroCelular" class="form-label">Nº de Celular: </label>
                            <input type="number" class="form-control alertAgregarTarjetaInput" id="efectivoNumeroCelular" placeholder="15-1111-1111">
                        </div>

                        <div class="col-md-6 alertAgregarTarjetaInputContenedor" id="direccionDeEntregaContenedor">
                            <label for="direccionDeEntrega" class="form-label">Dirección de Entrega: </label>
                            <input type="text" class="form-control alertAgregarTarjetaInput" id="direccionDeEntrega" placeholder="calle falsa 123">
                        </div>
                    </div>

                    <hr class="my-4">

                    <button class="btn alertAgregarTarjetaBtn" type="submit" id="btnMetodoPagoEfectivo">Agregar Efectivo</button>
                </div>
            `,
            customClass: {
                popup: '',
            },
            showConfirmButton: false,
            width: 700
        });

        /* ------------------- */
        /* acción de agregar método */
        document.querySelector("#btnMetodoPagoEfectivo").addEventListener("click", () => {

            /* variables */
            let titularValido = false;
            let numeroCelularValido = false;
            let direccionEntregaValido = false;

            /* funciones */
            titularValido = validarQueElCampoNoEsteVacio("#efectivoNombre", "#efectivoNombreContenedor")
            numeroCelularValido = validarQueElCampoNoEsteVacio("#efectivoNumeroCelular", "#efectivoNumeroCelularContenedor")
            direccionEntregaValido = validarQueElCampoNoEsteVacio("#direccionDeEntrega", "#direccionDeEntregaContenedor")

            numeroCelularValido = validarNumeroCelular("#efectivoNumeroCelular", "#efectivoNumeroCelularContenedor")

            /* validar que no exista el mismo efectivo */
            let metodosDePagosDelUsuario = null;
            metodosDePagosDelUsuario = usuario.metodosDePago;

            let avisoExistente = document.querySelector("#avisoEfectivoYaRegistrada");
            let nombreTitular = document.querySelector("#efectivoNombre").value;
            let numeroTitular = document.querySelector("#efectivoNumeroCelular").value;
            let direccionTitular = document.querySelector("#direccionDeEntrega").value;

            if (metodosDePagosDelUsuario.length != 0) {
                if (metodosDePagosDelUsuario.some(metodo => metodo.numeroTitularUser == numeroTitular && metodo.direccionTitularUser == direccionTitular)) {

                    if (!avisoExistente) {
                        let aviso = document.createElement("p");
                        aviso.id = "avisoEfectivoYaRegistrada";
                        aviso.innerHTML = "* Este método de efectivo ya está registrada.";
                        aviso.style.color = "red";

                        let campoContenedor = document.querySelector("#direccionDeEntregaContenedor");
                        campoContenedor.appendChild(aviso);
                    }

                    titularValido = false;

                } else {

                    if (avisoExistente) {
                        avisoExistente.parentElement.removeChild(avisoExistente);
                    }

                    titularValido = true;
                }
            }

            /* agregar nuevo efectivo */
            if (titularValido && numeroCelularValido && direccionEntregaValido) {

                /* ------------------- */
                /* tarjeta objeto */
                let nuevoMetodoDePago = {
                    tipoUser: "",
                    nombreTitularUser: "",
                    numeroTitularUser: 0,
                    direccionTitularUser: "",
                };

                /* resto de datos */
                nuevoMetodoDePago.tipoUser = "EFECTIVO";
                nuevoMetodoDePago.nombreTitularUser = document.querySelector("#efectivoNombre").value.toLowerCase();
                nuevoMetodoDePago.numeroTitularUser = document.querySelector("#efectivoNumeroCelular").value;
                nuevoMetodoDePago.direccionTitularUser = document.querySelector("#direccionDeEntrega").value.toLowerCase();

                /* subirlo al local storage */
                metodosDePagosDelUsuario.push(nuevoMetodoDePago)
                usuario.metodosDePago = metodosDePagosDelUsuario;

                /* actualizar el local */
                localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
                let listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados"));
                let usuarioEncontrado = listaDeUsuarios.find(usuarioLista => usuarioLista.id == usuario.id);
                if (usuarioEncontrado) {
                    usuarioEncontrado.metodosDePago = usuario.metodosDePago;
                    localStorage.setItem("usuariosRegistrados", JSON.stringify(listaDeUsuarios));
                }

                Swal.fire({
                    html: `
                        <div class="custom-swal-content alertUsuarioRegistrado"> 
                            <p class="alertUsuarioRegistradoText">¡Efectivo registrado!</p>
                            <a href="../index/perfil.html" class="btn alertUsuarioRegistradoBtn">Volver</a>
                        </div>
                    `,
                    customClass: {
                        popup: 'alertFondo',
                    },
                    showConfirmButton: false,
                });
            }
        })
    })

    /* paypal */
    document.querySelector("#btnAgregarPaypal").addEventListener("click", () => {
        Swal.fire({
            html: `
                <div class="custom-swal-content container-fluid alertAgregarTarjeta"> 
                    <h4> PayPal: </h4>

                    <div class="row gy-3 alertAgregarTarjetaSub">
                        <div class="col-md-12 alertAgregarTarjetaInputContenedor" id="paypalCorreoElectronicoContenedor">
                            <label for="paypalCorreoElectronico" class="form-label">Correo Electrónico asociado a Paypal: </label>
                            <input type="email" class="form-control alertAgregarTarjetaInput" id="paypalCorreoElectronico" placeholder="nombreYapellido@example.com">
                        </div>

                        <div class="col-md-12 alertAgregarTarjetaInputContenedor" id="paypalContraseniaContenedor">
                            <label for="paypalContrasenia" class="form-label">Contraseña asociada a Paypal: </label>
                            <input type="password" class="form-control alertAgregarTarjetaInput" id="paypalContrasenia" placeholder="******">
                        </div>

                    </div>

                    <hr class="my-4">

                    <button class="btn alertAgregarTarjetaBtn" type="submit" id="btnMetodoPagoPaypal">Agregar Paypal</button>
                </div>
            `,
            customClass: {
                popup: '',
            },
            showConfirmButton: false,
            width: 700
        });

        /* ------------------- */
        /* acción de agregar método */
        document.querySelector("#btnMetodoPagoPaypal").addEventListener("click", () => {

            /* variables */
            let correoValido = false;
            let contraseniaValido = false;

            /* funciones */
            correoValido = validarQueElCampoNoEsteVacio("#paypalCorreoElectronico", "#paypalCorreoElectronicoContenedor")
            contraseniaValido = validarQueElCampoNoEsteVacio("#paypalContrasenia", "#paypalContraseniaContenedor")

            correoValido = validarElCorreoElectronico("#paypalCorreoElectronico", "#paypalCorreoElectronicoContenedor")


            /* validar que no exista el mismo correo */
            let metodosDePagosDelUsuario = null;
            metodosDePagosDelUsuario = usuario.metodosDePago;

            let avisoExistente = document.querySelector("#avisoPaypalYaRegistrado");
            let correoTitular = document.querySelector("#paypalCorreoElectronico").value;
            let contraseniaTitular = document.querySelector("#paypalContrasenia").value;

            if (metodosDePagosDelUsuario.length != 0) {
                if (metodosDePagosDelUsuario.some(metodo => metodo.correoTitularUser == correoTitular || metodo.contraseniaTitularUser == contraseniaTitular)) {

                    if (!avisoExistente) {
                        let aviso = document.createElement("p");
                        aviso.id = "avisoPaypalYaRegistrado";
                        aviso.innerHTML = "* Esta cuenta de PayPal ya está registrada.";
                        aviso.style.color = "red";

                        let campoContenedor = document.querySelector("#paypalContraseniaContenedor");
                        campoContenedor.appendChild(aviso);
                    }

                    correoValido = false;

                } else {

                    if (avisoExistente) {
                        avisoExistente.parentElement.removeChild(avisoExistente);
                    }

                    correoValido = true;
                }
            }

            /* agregar nuevo paypal */
            if (correoValido && contraseniaValido) {

                /* ------------------- */
                /* tarjeta objeto */
                let nuevoMetodoDePago = {
                    tipoUser: "",
                    correoTitularUser: "",
                    contraseniaTitularUser: "",
                };

                /* resto de datos */
                nuevoMetodoDePago.tipoUser = "PAYPAL";
                nuevoMetodoDePago.correoTitularUser = document.querySelector("#paypalCorreoElectronico").value;
                nuevoMetodoDePago.contraseniaTitularUser = document.querySelector("#paypalContrasenia").value;

                /* subirlo al local storage */
                metodosDePagosDelUsuario.push(nuevoMetodoDePago)
                usuario.metodosDePago = metodosDePagosDelUsuario;

                /* actualizar el local */
                localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
                let listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados"));
                let usuarioEncontrado = listaDeUsuarios.find(usuarioLista => usuarioLista.id == usuario.id);
                if (usuarioEncontrado) {
                    usuarioEncontrado.metodosDePago = usuario.metodosDePago;
                    localStorage.setItem("usuariosRegistrados", JSON.stringify(listaDeUsuarios));
                }

                Swal.fire({
                    html: `
                        <div class="custom-swal-content alertUsuarioRegistrado"> 
                            <p class="alertUsuarioRegistradoText">¡PayPal registrado!</p>
                            <a href="../index/perfil.html" class="btn alertUsuarioRegistradoBtn">Volver</a>
                        </div>
                    `,
                    customClass: {
                        popup: 'alertFondo',
                    },
                    showConfirmButton: false,
                });
            }
        })
    })

    /* ------------------- */
    /* validar los campos */

    /* validar si están vacíos */
    function validarQueElCampoNoEsteVacio(idDeCampo, idDeCampoContenedor) {
        let campoContenedor = document.querySelector(idDeCampoContenedor);
        let avisoExistente = campoContenedor.querySelector("#avisoCampoVacioTarjeta");

        if (document.querySelector(idDeCampo).value === "") {
            if (!avisoExistente) {
                let aviso = document.createElement("p");
                aviso.id = "avisoCampoVacioTarjeta";
                aviso.innerHTML = "* Completa este campo.";
                aviso.style.color = "red";

                campoContenedor.appendChild(aviso);
            }

            return false;
        } else {
            if (avisoExistente) {
                avisoExistente.parentElement.removeChild(avisoExistente);
            }

            return true;
        }
    }

    /* validar numero tarjeta */
    function validarNumeroTarjeta(idDeCampo, idDeCampoContenedor) {
        let campoContenedor = document.querySelector(idDeCampoContenedor);
        let avisoExistente = campoContenedor.querySelector("#avisoNumeroTarjeta");

        let numeroTarjeta = document.querySelector(idDeCampo).value;

        if (document.querySelector(idDeCampo).value !== "") {

            if (numeroTarjeta.length != 16) {
                if (!avisoExistente) {
                    let aviso = document.createElement("p");
                    aviso.innerHTML = "* Por favor, ingrese número de tarjeta válido.";
                    aviso.style.color = "red";

                    aviso.id = "avisoNumeroTarjeta";
                    campoContenedor.appendChild(aviso);
                }

                return false;

            } else {

                if (avisoExistente) {
                    avisoExistente.parentElement.removeChild(avisoExistente);
                }

                return true;
            }
        }

        return false;
    }

    /* validar fecha de vencimiento */
    function validarFechaVencimiento(idDeCampo, idDeCampoContenedor) {
        let campoContenedor = document.querySelector(idDeCampoContenedor);
        let avisoExistente = campoContenedor.querySelector("#avisoFechaVencimientoTarjeta");

        let fechaVencimiento = document.querySelector(idDeCampo).value;
        let primerosDosDigitos = fechaVencimiento.substring(0, 2);
        let ultimosDosDigitos = fechaVencimiento.substring(2, 4);

        if (document.querySelector(idDeCampo).value !== "") {

            if (fechaVencimiento.length != 4 || primerosDosDigitos < 1 || primerosDosDigitos > 12 || ultimosDosDigitos < 25) {
                if (!avisoExistente) {
                    let aviso = document.createElement("p");
                    aviso.innerHTML = "* Por favor, ingrese una fecha de vencimiento válida.";
                    aviso.style.color = "red";

                    aviso.id = "avisoFechaVencimientoTarjeta";
                    campoContenedor.appendChild(aviso);
                }

                return false;

            } else {

                if (avisoExistente) {
                    avisoExistente.parentElement.removeChild(avisoExistente);
                }

                return true;
            }
        }

        return false;
    }

    /* validar código de seguridad */
    function validarCodigoSeguridad(idDeCampo, idDeCampoContenedor) {
        let campoContenedor = document.querySelector(idDeCampoContenedor);
        let avisoExistente = campoContenedor.querySelector("#avisoCodigoSeguridadTarjeta");

        let codigoSeguridad = document.querySelector(idDeCampo).value;

        if (document.querySelector(idDeCampo).value !== "") {

            if (codigoSeguridad.length != 3) {
                if (!avisoExistente) {
                    let aviso = document.createElement("p");
                    aviso.innerHTML = "* Por favor, ingrese un código de seguridad válido.";
                    aviso.style.color = "red";

                    aviso.id = "avisoCodigoSeguridadTarjeta";
                    campoContenedor.appendChild(aviso);
                }

                return false;

            } else {

                if (avisoExistente) {
                    avisoExistente.parentElement.removeChild(avisoExistente);
                }

                return true;
            }
        }

        return false;
    }

    /* validar numero de celular */
    function validarNumeroCelular(idDeCampo, idDeCampoContenedor) {
        let campoContenedor = document.querySelector(idDeCampoContenedor);
        let avisoExistente = campoContenedor.querySelector("#avisoNumeroCelularEfectivo");

        let numeroDeCelular = document.querySelector(idDeCampo).value;
        let primerosDosDigitos = numeroDeCelular.substring(0, 2);


        if (document.querySelector(idDeCampo).value !== "") {

            if (numeroDeCelular.length != 10 || primerosDosDigitos != 15 && primerosDosDigitos != 11) {
                if (!avisoExistente) {
                    let aviso = document.createElement("p");
                    aviso.innerHTML = "* Por favor, ingrese un número de celular válido.";
                    aviso.style.color = "red";

                    aviso.id = "avisoNumeroCelularEfectivo";
                    campoContenedor.appendChild(aviso);
                }

                return false;

            } else {

                if (avisoExistente) {
                    avisoExistente.parentElement.removeChild(avisoExistente);
                }

                return true;
            }
        }

        return false;
    }

    /* validar el correo */
    function validarElCorreoElectronico(idDeCampo, idDeCampoContenedor) {
        let campoContenedor = document.querySelector(idDeCampoContenedor);
        let avisoExistente = campoContenedor.querySelector("#avisoValidarCorreo");

        let correoElectronico = document.querySelector(idDeCampo).value;
        let expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (document.querySelector(idDeCampo).value !== "") {
            if (!expresionRegular.test(correoElectronico)) {
                if (!avisoExistente) {
                    let aviso = document.createElement("p");
                    aviso.innerHTML = "* Por favor, ingrese una dirección de correo electrónico válida.";
                    aviso.style.color = "red";

                    aviso.id = "avisoValidarCorreo";
                    campoContenedor.appendChild(aviso);
                }

                return false;
            } else {
                if (avisoExistente) {
                    avisoExistente.parentElement.removeChild(avisoExistente);
                }

                return true;
            }
        }

        return false;
    }

    /* ------------------- */
    /* cargar metodos de pago del usuario */
    let metodosDePagoDelUsuario = null;
    metodosDePagoDelUsuario = usuario.metodosDePago;

    if (metodosDePagoDelUsuario.length != 0) {
        document.querySelector("#metodosDePagosDelUsuario").innerHTML = ""
        document.querySelector("#metodosDePagosDelUsuario").innerHTML = `
            <h6>Tús metodos de pago: </h6>
            <ul class="metodosDePagoDelUsuarioLleno" id="listaMetodosDePago"></ul>
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

            <button class="btn btnEliminarMetodoPagoTarjeta" id="eliminar${metodoUser.cvvUser}">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </button>
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

            <button class="btn btnEliminarMetodoPagoEfectivo" id="eliminar${(metodoUser.direccionTitularUser + metodoUser.numeroTitularUser)}">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </button>
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

            <button class="btn btnEliminarMetodoPagoPaypal" id="eliminar${metodoUser.contraseniaTitularUser}">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </button>
        `
            document.querySelector("#listaMetodosDePago").append(liPagoPaypal)
        })

        
        /* ------------------- */
        /* eliminar metodos */

        /* ----- */
        /* tarjeta */
        let btnEliminarTarjeta = document.querySelectorAll(".btnEliminarMetodoPagoTarjeta");

        // Convertir la NodeList en un array utilizando Array.from
        let arrayBtnEliminarTarjeta = Array.from(btnEliminarTarjeta);

        btnEliminarTarjeta.forEach(btnEliminar => {
            btnEliminar.addEventListener("click", (e) => {

                /* encontrar el metodo de pago cuando se hace click en la "X" */
                let btnEncontrado = arrayBtnEliminarTarjeta.filter(btn => btn.id == e.currentTarget.id)

                /* si el metodo existe, eliminarla */
                if (btnEncontrado) {

                    let index = metodosDePagoDelUsuario.findIndex(producto => producto.id == btnEncontrado.id)
                    if (index !== -1) {
                        metodosDePagoDelUsuario.splice(index, 1);
                        usuario.metodosDePago = metodosDePagoDelUsuario;
                    }

                    /* actualizar el local */
                    localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
                    let listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados"));
                    let usuarioEncontrado = listaDeUsuarios.find(usuarioLista => usuarioLista.id == usuario.id);
                    if (usuarioEncontrado) {
                        usuarioEncontrado.metodosDePago = usuario.metodosDePago;
                        localStorage.setItem("usuariosRegistrados", JSON.stringify(listaDeUsuarios));
                    }

                    window.location.href="../index/perfil.html"
                }


            })
        })

        /* ----- */
        /* efectivo */
        let btnEliminarEfectivo = document.querySelectorAll(".btnEliminarMetodoPagoEfectivo");

        // Convertir la NodeList en un array utilizando Array.from
        let arrayBtnEliminarEfectivo = Array.from(btnEliminarEfectivo);

        arrayBtnEliminarEfectivo.forEach(btnEliminar => {
            btnEliminar.addEventListener("click", (e) => {

                /* encontrar el metodo de pago cuando se hace click en la "X" */
                let btnEncontrado = arrayBtnEliminarTarjeta.filter(btn => btn.id == e.currentTarget.id)

                /* si el metodo existe, eliminarla */
                if (btnEncontrado) {

                    let index = metodosDePagoDelUsuario.findIndex(producto => producto.id == btnEncontrado.id)
                    if (index !== -1) {
                        metodosDePagoDelUsuario.splice(index, 1);
                        usuario.metodosDePago = metodosDePagoDelUsuario;
                    }

                    /* actualizar el local */
                    localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
                    let listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados"));
                    let usuarioEncontrado = listaDeUsuarios.find(usuarioLista => usuarioLista.id == usuario.id);
                    if (usuarioEncontrado) {
                        usuarioEncontrado.metodosDePago = usuario.metodosDePago;
                        localStorage.setItem("usuariosRegistrados", JSON.stringify(listaDeUsuarios));
                    }

                    window.location.href="../index/perfil.html"
                }


            })
        })

        /* ----- */
        /* paypal */
        let btnEliminarPaypal = document.querySelectorAll(".btnEliminarMetodoPagoPaypal");

        // Convertir la NodeList en un array utilizando Array.from
        let arrayBtnEliminarPaypal = Array.from(btnEliminarPaypal);

        arrayBtnEliminarPaypal.forEach(btnEliminar => {
            btnEliminar.addEventListener("click", (e) => {

                /* encontrar el metodo de pago cuando se hace click en la "X" */
                let btnEncontrado = arrayBtnEliminarTarjeta.filter(btn => btn.id == e.currentTarget.id)

                /* si el metodo existe, eliminarla */
                if (btnEncontrado) {

                    let index = metodosDePagoDelUsuario.findIndex(producto => producto.id == btnEncontrado.id)
                    if (index !== -1) {
                        metodosDePagoDelUsuario.splice(index, 1);
                        usuario.metodosDePago = metodosDePagoDelUsuario;
                    }

                    /* actualizar el local */
                    localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
                    let listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados"));
                    let usuarioEncontrado = listaDeUsuarios.find(usuarioLista => usuarioLista.id == usuario.id);
                    if (usuarioEncontrado) {
                        usuarioEncontrado.metodosDePago = usuario.metodosDePago;
                        localStorage.setItem("usuariosRegistrados", JSON.stringify(listaDeUsuarios));
                    }

                    window.location.href="../index/perfil.html"
                }
            })
        })

    } else {
        document.querySelector("#metodosDePagosDelUsuario").innerHTML = ""

        document.querySelector("#metodosDePagosDelUsuario").innerHTML = `
        
        <h6>Tús metodos de pago: </h6>
        <div class="metodosDePagoDelUsuarioVacio"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-slash-circle metodosDePagoDelUsuarioVacioLogo" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708"/>
            </svg>
            <p class="metodosDePagoDelUsuarioVacioText"> No tienes metodos de pagos. </p>
        </div>
        `
    }


})
