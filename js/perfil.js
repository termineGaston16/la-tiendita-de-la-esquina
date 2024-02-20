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
            <div>
                <div id="contenedorFotoPerfil" style="width: 130px; height: 130px; border-radius: 100px; overflow:hidden;">
                    <img src="${usuario.fotoPerfil}" alt="">
                </div>
                <p>${usuario.nombres} ${usuario.apellidos}</p>
                <p>${usuario.nombreDeUsuario}</p>
                <p>${usuario.correoElectronico}</p>
            </div>
        `;
    }
}
actualizarInterfazUsuario()

/* ------------------- */
/* ajustes de la cuenta */

/* cambiar foto de perfil */
document.querySelector("#btnFotoPerfil").addEventListener("click", () => {
    var input = document.createElement('input');
    input.type = 'file';

    input.addEventListener('change', function () {
        var file = input.files[0];

        if (file) {
            // Asignar la ruta de la imagen directamente al src
            var url = URL.createObjectURL(file);
            usuario.fotoPerfil = url;

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
    document.querySelector("#tarjetaDatos").innerHTML = `

    <h4>Cambia tus datos:</h4>

    <div class="row g-3">
                
        <!-- Nombres -->
        <div class="col-sm-6">
            <label for="cambiarNombres" class="form-label">Nombres:</label>
            <input type="text" class="form-control" id="cambiarNombres"
                placeholder="${usuario.nombres}">
            <button class="btn btn-primary" id="btnCambiarNombres">Aceptar</button>  
        </div>

        <!-- Apellidos -->
        <div class="col-sm-6">
            <label for="cambiarApellidos" class="form-label">Apellidos:</label>
            <input type="text" class="form-control" id="cambiarApellidos"
                placeholder="${usuario.apellidos}">
                <button class="btn btn-primary" id="btnCambiarApellidoss">Aceptar</button>  
        </div>

        <!-- Nombre de usuario -->
        <div class="col-12">
            <label for="cambiarNombreUsuario" class="form-label">Nombre
                de Usuario:</label>
                <input type="text" class="form-control" id="cambiarNombreUsuario"
                    placeholder="${usuario.nombreDeUsuario}">
                <button class="btn btn-primary" id="btnCambiarNombreUsuario">Aceptar</button>  
            </div>
        </div>
    </div>

    `
})


