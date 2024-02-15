/* recorrer los Usuarios registrados */
let usuariosRegistradosEnElSistema = []

if (localStorage.getItem("usuariosRegistrados") != null) {
    usuariosRegistradosEnElSistema = JSON.parse(localStorage.getItem("usuariosRegistrados"));
}

/* ------------------- */
/* verificar usuario logueado */
let usuarioLogeado = null;

if (localStorage.getItem("usuarioLogueado") != null) {
    usuarioLogeado = JSON.parse(localStorage.getItem("usuarioLogueado"));
}

/* ------------------- */
/* loguearse */
document.querySelector("#btnLoguearDatos").addEventListener("click", () => {

    /* funciones */
    correoValido = validarQueElCampoNoEsteVacio("#correoElectronicoLoguear", "#correoElectronicoLoguearContenedor")
    contraseniaValida = validarQueElCampoNoEsteVacio("#contraseniaRegistrarloguear", "#contraseniaRegistrarloguearContenedor")
    correoValido = validarElCorreoElectronico("#correoElectronicoLoguear", "#correoElectronicoLoguearContenedor")


    /* verificar que exista la cuenta */
    if (correoValido && contraseniaValida) {
        let avisoExistente = document.querySelector("#avisoCuentaNoEncontrada");

        if (usuariosRegistradosEnElSistema.length != 0) {
            if (usuariosRegistradosEnElSistema.some(usuario => usuario.correoElectronico == document.querySelector("#correoElectronicoLoguear").value && usuario.contrasenia == document.querySelector("#contraseniaRegistrarloguear").value)) {

                if (avisoExistente) {
                    avisoExistente.parentElement.removeChild(avisoExistente);
                }

                correoValido = true;
                contraseniaValida = true;

                usuarioLogeado = usuariosRegistradosEnElSistema.find(usuario => usuario.correoElectronico === document.querySelector("#correoElectronicoLoguear").value && usuario.contrasenia === document.querySelector("#contraseniaRegistrarloguear").value);
                localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogeado))

                window.location.href = "../index.html";
            } else {
                if (!avisoExistente) {

                    let aviso = document.createElement("p");
                    aviso.id = "avisoCuentaNoEncontrada";
                    aviso.innerHTML = "* Cuenta no encontrada. Ingresa bien los datos.";
                    aviso.style.color = "red";

                    let campoContenedor = document.querySelector("#contraseniaRegistrarloguearContenedor");
                    campoContenedor.appendChild(aviso);
                }

                correoValido = false;
                contraseniaValida = false;
            }
        } else {
            if (!avisoExistente) {

                let aviso = document.createElement("p");
                aviso.id = "avisoCuentaNoEncontrada";
                aviso.innerHTML = "* Cuenta no encontrada. Ingresa bien los datos.";
                aviso.style.color = "red";

                let campoContenedor = document.querySelector("#contraseniaRegistrarloguearContenedor");
                campoContenedor.appendChild(aviso);
            }
        }
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