/* recorrer los Usuarios registrados */
let usuariosRegistradosEnElSistema = []

if (localStorage.getItem("usuariosRegistrados") != null) {
    usuariosRegistradosEnElSistema = JSON.parse(localStorage.getItem("usuariosRegistrados"));
}

/* ------------------- */
/* acción de registrarse */
document.querySelector("#btnRegistrarDatos").addEventListener("click", () => {

    /* variables */
    let nombresValidos = false;
    let apellidosValidos = false;
    let nombreDeUsuarioValido = false;
    let correoValido = false;
    let contraseniaValida = false;

    /* funciones */
    nombresValidos = validarQueElCampoNoEsteVacio("#nombresRegistrar", "#nombresRegistrarContenedor")
    apellidosValidos = validarQueElCampoNoEsteVacio("#apellidosRegistrar", "#apellidosRegistrarContenedor")
    nombreDeUsuarioValido = validarQueElCampoNoEsteVacio("#nombreDeUsuarioRegistrar", "#nombreDeUsuarioRegistrarContenedor")
    correoValido = validarQueElCampoNoEsteVacio("#correoElectronicoRegistrar", "#correoElectronicoRegistrarContenedor")
    contraseniaValida = validarQueElCampoNoEsteVacio("#contraseniaRegistrar", "#contraseniaRegistrarContenedor")
    contraseniaValida = validarQueElCampoNoEsteVacio("#revisarContraseniaRegistrar", "#revisarContraseniaRegistrarContenedor")

    correoValido = validarElCorreoElectronico("#correoElectronicoRegistrar", "#correoElectronicoRegistrarContenedor")
    contraseniaValida = validarSiLasContraseniasCoinciden("#contraseniaRegistrar", "#revisarContraseniaRegistrar", "#revisarContraseniaRegistrarContenedor")


    /* validarQueNoExistaElMismoUsuario */
    /* nombre de usuario */
    if (usuariosRegistradosEnElSistema.length != 0) {
        let avisoExistente = document.querySelector("#avisoNombreDeUsuarioNoEstáDisponible");

        if (usuariosRegistradosEnElSistema.some(usuario => usuario.nombreDeUsuario === document.querySelector("#nombreDeUsuarioRegistrar").value)) {
            if (!avisoExistente) {
                let aviso = document.createElement("p");
                aviso.id = "avisoNombreDeUsuarioNoEstáDisponible";
                aviso.innerHTML = "* Este nombre de usuario no está disponible.";
                aviso.style.color = "red";

                let campoContenedor = document.querySelector("#nombreDeUsuarioRegistrarContenedor");
                campoContenedor.appendChild(aviso);
            }
            nombreDeUsuarioValido = false;
        } else {
            if (avisoExistente) {
                avisoExistente.parentElement.removeChild(avisoExistente);
            }
            nombreDeUsuarioValido = true;
        }
    }

    /* correo electrónico */
    if (usuariosRegistradosEnElSistema.length != 0) {
        let avisoExistente = document.querySelector("#avisoCorreoNoDisponible");

        if (usuariosRegistradosEnElSistema.some(usuario => usuario.correoElectronico === document.querySelector("#correoElectronicoRegistrar").value)) {
            if (!avisoExistente) {
                let aviso = document.createElement("p");
                aviso.id = "avisoCorreoNoDisponible";
                aviso.innerHTML = "* Este correo electónico ya está registrado.";
                aviso.style.color = "red";

                let campoContenedor = document.querySelector("#correoElectronicoRegistrarContenedor");
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

    /* --- */
    /* creando nuevo usuario */
    if (nombresValidos && apellidosValidos && nombreDeUsuarioValido && correoValido && contraseniaValida) {

        /* ------------------- */
        /* nuevo usuario objeto */
        let nuevoUsuario = {
            id: 0,
            nombres: "",
            apellidos: "",
            nombreDeUsuario: "",
            correoElectronico: "",
            contrasenia: "",
            fotoPerfil:"",
            carrito:[],
            fav:[],
            metodosDePago:[],
        };

        /* ------------------- */
        /* id */
        if (usuariosRegistradosEnElSistema.length != 0) {
            nuevoUsuario.id = (usuariosRegistradosEnElSistema.length)
        } else {
            nuevoUsuario.id = 0;
        }

        /* resto de datos*/
        nuevoUsuario.nombres = document.querySelector("#nombresRegistrar").value;
        nuevoUsuario.apellidos = document.querySelector("#apellidosRegistrar").value;
        nuevoUsuario.nombreDeUsuario = document.querySelector("#nombreDeUsuarioRegistrar").value;
        nuevoUsuario.correoElectronico = document.querySelector("#correoElectronicoRegistrar").value;
        nuevoUsuario.contrasenia = document.querySelector("#contraseniaRegistrar").value;

        /* subirlo al local storage */
        usuariosRegistradosEnElSistema.push(nuevoUsuario)
        localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistradosEnElSistema));

        Swal.fire({
            html: `
                <div class="custom-swal-content alertUsuarioRegistrado"> 
                    <p class="alertUsuarioRegistradoText">¡Usuario registrado!</p>
                    <a href="../index.html" class="btn alertUsuarioRegistradoBtn">Volver</a>
                </div>
            `,
            customClass: {
                popup: 'alertFondo',
            },
            showConfirmButton: false,
        });

    }

})

/* ------------------- */
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