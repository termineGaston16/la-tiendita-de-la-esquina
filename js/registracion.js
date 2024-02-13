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
            contrasenia: ""
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
        alert("¡Usuario Registrado!")
        usuariosRegistradosEnElSistema.push(nuevoUsuario)
        localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistradosEnElSistema));
        window.location.href = "../index.html";
    }


})

/* ------------------- */
/* validar los campos */

/* validar si están vacíos */
function validarQueElCampoNoEsteVacio(idDeCampo, idDeCampoContenedor) {
    let aviso = document.createElement("p");
    aviso.innerHTML = "* Completa este campo.";
    aviso.style.color = "red"; // Modificación para aplicar estilo de color

    let campoContenedor = document.querySelector(idDeCampoContenedor);
    let avisoExistente = campoContenedor.querySelector("#aviso");

    if (document.querySelector(idDeCampo).value === "") {
        if (!avisoExistente) {
            aviso.id = "aviso";
            campoContenedor.appendChild(aviso);
        }

        return false;
    } else {
        if (avisoExistente) {
            campoContenedor.removeChild(avisoExistente);
        }

        return true;
    }
}

/* validar el correo */
function validarElCorreoElectronico(idDeCampo, idDeCampoContenedor) {
    if (document.querySelector(idDeCampo).value !== "") {

        let correoElectronico = document.querySelector(idDeCampo).value;
        let expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let aviso = document.createElement("p");
        aviso.innerHTML = "* Por favor, ingrese una dirección de correo electrónico válida.";
        aviso.style.color = "red";

        let campoContenedor = document.querySelector(idDeCampoContenedor);
        let avisoExistente = campoContenedor.querySelector("#aviso");


        if (!expresionRegular.test(correoElectronico)) {
            if (!avisoExistente) {
                aviso.id = "aviso";
                campoContenedor.appendChild(aviso);
            }

            return false;
        } else {
            if (avisoExistente) {
                campoContenedor.removeChild(avisoExistente);
            }

            return true;
        }
    }

    return false;
}

/* validar si las contraseñas coinciden */
function validarSiLasContraseniasCoinciden(idDeCampoContrasenia1, idDeCampoContrasenia2, idDeCampoContenedor) {
    if (document.querySelector(idDeCampoContrasenia1).value !== "" && document.querySelector(idDeCampoContrasenia2).value !== "") {

        let aviso = document.createElement("p");
        aviso.innerHTML = "* Las contraseñas no coinciden.";
        aviso.style.color = "red";

        let campoContenedor = document.querySelector(idDeCampoContenedor);
        let avisoExistente = campoContenedor.querySelector("#aviso");

        if (document.querySelector(idDeCampoContrasenia1).value !== document.querySelector(idDeCampoContrasenia2).value) {
            if (!avisoExistente) {
                aviso.id = "aviso";
                campoContenedor.appendChild(aviso);
            }

            return false;
        } else {
            if (avisoExistente) {
                campoContenedor.removeChild(avisoExistente);
            }

            return true;
        }
    }

    return false;
}