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
    } else {
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

            /* encontrar la consola cuando se hace click en "boton sumar unidad" */
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
        });
    });
}

/* ------------------- */
/* favoritos */
let consolasFavoritas = null;
favoritos = usuario.fav;

/* --------------- */
/* Cargar Productos */
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

