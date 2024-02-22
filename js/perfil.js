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

