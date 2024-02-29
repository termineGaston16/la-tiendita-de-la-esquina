/* Abrir y cerrar el menu nav */

/* abrir */
document.querySelector("#btnHeaderIndexNav").addEventListener("click", () => {
    document.querySelector("#idMenuNavIndexFondoNegro").classList.remove("d-none")
    document.querySelector("#idMenuNavOpen").classList.remove("opacity-0")
    document.querySelector("#idMenuNavOpen").classList.add("open")

})
/* cerrar */
document.querySelector("#idMenuNavIndexFondoNegro").addEventListener("click", () => {
    document.querySelector("#idMenuNavIndexFondoNegro").classList.add("d-none")
    document.querySelector("#idMenuNavOpen").classList.add("opacity-0")
    document.querySelector("#idMenuNavOpen").classList.remove("open")
})

/* --------------- */
/* Cargar Productos */
document.querySelector("#idProductosContenedor").innerHTML = "";

let url = '../json/consolas.json';

fetch(url)
    .then(response => response.json())
    .then(todasLasConsolas => {

        let consolasDeXbox = todasLasConsolas.filter(consola => {
            return consola.id >= "19" && consola.id <= "24";
        })

        cargarConsolas(consolasDeXbox)
        filtrarConsolasPorPrecio(consolasDeXbox, cargarConsolas)
        limpiarFiltracionPorPrecio(consolasDeXbox, cargarConsolas,)
        filtrarConsolasMenorPrecio(consolasDeXbox, cargarConsolas)
        filtrarConsolasMayorPrecio(consolasDeXbox, cargarConsolas)
        filtrarConsolasAZ(consolasDeXbox, cargarConsolas)
        filtrarConsolasZA(consolasDeXbox, cargarConsolas)
        filtrarConsolasMasNuevo(consolasDeXbox, cargarConsolas)
        filtrarConsolasMasViejo(consolasDeXbox, cargarConsolas)

        agregarAlCarrito(consolasDeXbox, ".btnAgregarAlCarrito")
    })
    .catch(error => console.error('Error al cargar las consolas.', error));

document.querySelector("#idProductosContenedor").innerHTML = `
    <div class="container text-center">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4" id="idProductosRow">
        </div>
    </div>
`

function cargarConsolas(arrayDeConsolas) {

    document.querySelector("#idProductosRow").innerHTML = ""

    arrayDeConsolas.forEach(consolaSony => {

        /* actualizar lista de fav */
        let usuarioLogueado = null;
        let listaFavActualUsuario = null;

        usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
        if (usuarioLogueado) {
            listaFavActualUsuario = usuarioLogueado.fav
        }

        if (listaFavActualUsuario && listaFavActualUsuario.length != 0) {
            consolaSony.aniadidaAFav = listaFavActualUsuario.some(consola => consola.id == consolaSony.id)
        } else {
            consolaSony.aniadidaAFav = false;
        }


        /* crear el div */
        let div1 = document.createElement("div")
        div1.classList.add("col")
        div1.classList.add("mainProductosConsolasProductosCargados")
        div1.innerHTML = `
            <img src="${consolaSony.imagenReferente}" class="mainProductosConsolasProductosCargadosImg" alt="${consolaSony.nombreConsola}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-heart mainProductosConsolasProductosCargadosFav" viewBox="0 0 16 16">
                <path
                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
            </svg>
            <h5 class="mainProductosConsolasProductosCargadosNombreConsola">${consolaSony.nombreConsola}</h5>
            <h6 class="mainProductosConsolasProductosCargadosAnioDeEstreno"> Fecha de salida: ${consolaSony.anioDeEstreno}.</h6>
            <p class="mainProductosConsolasProductosCargadosPrecio"> Precio: $${consolaSony.precioConsola}.</p>
            <button id="${consolaSony.id}" type="button" class="btn btnAgregarAlCarrito" >Agregar al carrito</button>
        `
        /* evaluar si está agregado a fav */
        if (!consolaSony.aniadidaAFav) {

            div1.innerHTML = `
            <img src="${consolaSony.imagenReferente}" class="mainProductosConsolasProductosCargadosImg" alt="${consolaSony.nombreConsola}">
            <button type="button" class="btn btnFav" id="${consolaSony.id + "idBtnFav"}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-heart mainProductosConsolasProductosCargadosFav" viewBox="0 0 16 16">
                    <path
                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg>
            </button>
            <h5 class="mainProductosConsolasProductosCargadosNombreConsola">${consolaSony.nombreConsola}</h5>
            <h6 class="mainProductosConsolasProductosCargadosAnioDeEstreno"> Fecha de salida: ${consolaSony.anioDeEstreno}.</h6>
            <p class="mainProductosConsolasProductosCargadosPrecio"> Precio: $${consolaSony.precioConsola}.</p>
            <button id="${consolaSony.id}" type="button" class="btn btnAgregarAlCarrito" >Agregar al carrito</button>
            `
        } else {

            div1.innerHTML = `
            <img src="${consolaSony.imagenReferente}" class="mainProductosConsolasProductosCargadosImg" alt="${consolaSony.nombreConsola}">
            <button type="button" class="btn btnFav" id="${consolaSony.id + "idBtnFav"}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill mainProductosConsolasProductosCargadosFav" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg>
            </button>
            <h5 class="mainProductosConsolasProductosCargadosNombreConsola">${consolaSony.nombreConsola}</h5>
            <h6 class="mainProductosConsolasProductosCargadosAnioDeEstreno"> Fecha de salida: ${consolaSony.anioDeEstreno}.</h6>
            <p class="mainProductosConsolasProductosCargadosPrecio"> Precio: $${consolaSony.precioConsola}.</p>
            <button id="${consolaSony.id}" type="button" class="btn btnAgregarAlCarrito" >Agregar al carrito</button>
            `
        }

        document.querySelector("#idProductosRow").append(div1);

    });

    agregarAlCarrito(arrayDeConsolas, ".btnAgregarAlCarrito")
    agregarAFavoritos(arrayDeConsolas, ".btnFav", cargarConsolas)
}

/* --------------- */
/* Filtar por precio */
function filtrarConsolasPorPrecio(arrayDeConsolas, callback) {

    document.querySelector("#btnFiltrarPrecio").addEventListener("click", () => {
        let precioDesde = document.querySelector("#filtrarPrecioDesde").value;
        let precioHasta = document.querySelector("#filtrarPrecioHasta").value;

        let arrayFiltradoXPrecios = arrayDeConsolas.filter(consola => {
            return consola.precioConsola >= precioDesde && consola.precioConsola <= precioHasta;
        })

        if (precioDesde == "" && precioDesde == "" || arrayFiltradoXPrecios.length == 0) {
            document.querySelector("#idProductosRow").innerHTML = `
                <p class="textNoEncontrado"> No se encotraron productos :( </p>
            `
        } else {
            document.querySelector("#idProductosRow").innerHTML = ""
            callback(arrayFiltradoXPrecios.sort((a, b) => a.precioConsola - b.precioConsola));
        }

        agregarAlCarrito(arrayFiltradoXPrecios, ".btnAgregarAlCarrito")
    })
}

/* --------------- */
/* Limpiar filtración */
function limpiarFiltracionPorPrecio(arrayCompleto, callback) {
    document.querySelector("#btnLimpiarFiltracion").addEventListener("click", () => {
        document.querySelector("#idProductosRow").innerHTML = ""
        callback(arrayCompleto);
        agregarAlCarrito(arrayCompleto, ".btnAgregarAlCarrito")
    })
}

/* --------------- */
/* Filtar por catergorias */

/* menor precio */
function filtrarConsolasMenorPrecio(arrayDeConsolas, callback) {
    document.querySelector("#btnMenorPrecioFiltro").addEventListener("click", () => {
        let arrayFiltradoMenorPrecio = arrayDeConsolas.sort((a, b) => a.precioConsola - b.precioConsola);

        document.querySelector("#idProductosRow").innerHTML = ""
        callback(arrayFiltradoMenorPrecio);
        agregarAlCarrito(arrayFiltradoMenorPrecio, ".btnAgregarAlCarrito")
    });
}

/* mayor precio */
function filtrarConsolasMayorPrecio(arrayDeConsolas, callback) {
    document.querySelector("#btnMayorPrecioFiltro").addEventListener("click", () => {
        let arrayFiltradoMayorPrecio = arrayDeConsolas.sort((a, b) => b.precioConsola - a.precioConsola);

        document.querySelector("#idProductosRow").innerHTML = ""
        callback(arrayFiltradoMayorPrecio);
        agregarAlCarrito(arrayFiltradoMayorPrecio, ".btnAgregarAlCarrito")
    });
}

/* A / Z */
function filtrarConsolasAZ(arrayDeConsolas, callback) {
    document.querySelector("#btnAZPrecioFiltro").addEventListener("click", () => {
        let arrayFiltradoAZ = arrayDeConsolas.sort((a, b) => a.nombreConsola.localeCompare(b.nombreConsola));

        document.querySelector("#idProductosRow").innerHTML = ""
        callback(arrayFiltradoAZ);
        agregarAlCarrito(arrayFiltradoAZ, ".btnAgregarAlCarrito")
    });
}

/* Z / A */
function filtrarConsolasZA(arrayDeConsolas, callback) {
    document.querySelector("#btnZAPrecioFiltro").addEventListener("click", () => {
        let arrayFiltradoZA = arrayDeConsolas.sort((a, b) => b.nombreConsola.localeCompare(a.nombreConsola));

        document.querySelector("#idProductosRow").innerHTML = ""
        callback(arrayFiltradoZA);
        agregarAlCarrito(arrayFiltradoZA, ".btnAgregarAlCarrito")
    });
}

/* mas nuevo (año) */
function filtrarConsolasMasNuevo(arrayDeConsolas, callback) {
    document.querySelector("#btnMasNuevoPrecioFiltro").addEventListener("click", () => {
        let arrayFiltradoMasNuevo = arrayDeConsolas.sort((a, b) => parseInt(b.anioDeEstreno) - parseInt(a.anioDeEstreno));

        document.querySelector("#idProductosRow").innerHTML = ""
        callback(arrayFiltradoMasNuevo);
        agregarAlCarrito(arrayFiltradoMasNuevo, ".btnAgregarAlCarrito")
    });
}

/* mas viejo (año) */
function filtrarConsolasMasViejo(arrayDeConsolas, callback) {
    document.querySelector("#btnMasAntiguoPrecioFiltro").addEventListener("click", () => {
        let arrayFiltradoMasViejo = arrayDeConsolas.sort((a, b) => parseInt(a.anioDeEstreno) - parseInt(b.anioDeEstreno));

        document.querySelector("#idProductosRow").innerHTML = ""
        callback(arrayFiltradoMasViejo);
        agregarAlCarrito(arrayFiltradoMasViejo, ".btnAgregarAlCarrito")
    });
}

/* ------------------------- */
/* Usuario logueado */

/* verificar usuario logueado */
let usuarioLogeado = null;

if (localStorage.getItem("usuarioLogueado") != null) {
    usuarioLogeado = JSON.parse(localStorage.getItem("usuarioLogueado"));
}

if (usuarioLogeado == null) {

    document.querySelector("#idMenuNavOpenPerfilRegister").innerHTML = `
        <a href="../index/registracion.html" class="nav-link menuNavOpenPerfilLink">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
            class="bi bi-person" viewBox="0 0 16 16">
            <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
        </svg>
        Registrarse
        </a>
    `

    document.querySelector("#idMenuNavOpenPerfilLogueader").innerHTML = `
        <a href="../index/loguearse.html" class="nav-link menuNavOpenPerfilLink">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
            class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
        </svg>
        Loguearse
        </a>
    `
} else {

    if (usuarioLogeado.fotoPerfil != "") {
        document.querySelector("#idMenuNavOpenPerfilLogueader").innerHTML = `
        <a href="../index/perfil.html" class="nav-link menuNavOpenPerfilLink">
        <div id="contenedorFotoPerfil" style="width: 30px; height: 30px; border-radius: 100px; overflow:hidden; display: flex; align-items: center; justify-content: center;">
                <img src="${usuarioLogeado.fotoPerfil}" alt="" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        Mi perfil
        </a>
    `
    } else {
        document.querySelector("#idMenuNavOpenPerfilLogueader").innerHTML = `
        <a href="../index/perfil.html" class="nav-link menuNavOpenPerfilLink">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
            class="bi bi-person" viewBox="0 0 16 16">
            <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
        </svg>
        Mi perfil
        </a>
    `
    }

}

/* ------------------------- */
/* Agregar al Carrito */
function agregarAlCarrito(arrayDeConsolas, claseBoton) {
    let botonesAniadirCarrito = document.querySelectorAll(claseBoton);

    botonesAniadirCarrito.forEach(boton => {

        boton.addEventListener("click", (e) => {

            let usuarioLogeado = null;
            let productosEnElCarrito = null;

            if (localStorage.getItem("usuarioLogueado") != null) {
                usuarioLogeado = JSON.parse(localStorage.getItem("usuarioLogueado"));
            }

            if (usuarioLogeado != null) {
                /* obtener el carrito del usuario logueado */
                productosEnElCarrito = usuarioLogeado.carrito;

                /* encontrar la consola cuando se hace click en "añadir a carrito" */
                let consolaEncontrada = arrayDeConsolas.find(consola => consola.id == e.target.id)

                /* una vez obtenida, nos fijamos si ya existe en el carrito */
                if (productosEnElCarrito.some(producto => producto.id == consolaEncontrada.id)) {

                    let index = productosEnElCarrito.findIndex(producto => producto.id == consolaEncontrada.id)
                    productosEnElCarrito[index].cantidad++;
                    usuarioLogeado.carrito = productosEnElCarrito;

                    /* actualizar el local */
                    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogeado));
                    let listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados"));
                    let usuarioEncontrado = listaDeUsuarios.find(usuarioLista => usuarioLista.id == usuarioLogeado.id);
                    if (usuarioEncontrado) {
                        usuarioEncontrado.carrito = usuarioLogeado.carrito;
                        localStorage.setItem("usuariosRegistrados", JSON.stringify(listaDeUsuarios));
                    }

                } else {

                    consolaEncontrada.cantidad = 1;
                    productosEnElCarrito.push(consolaEncontrada)
                    usuarioLogeado.carrito = productosEnElCarrito;

                    /* actualizar el local */
                    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogeado));
                    let listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados"));
                    let usuarioEncontrado = listaDeUsuarios.find(usuarioLista => usuarioLista.id == usuarioLogeado.id);
                    if (usuarioEncontrado) {
                        usuarioEncontrado.carrito = usuarioLogeado.carrito;
                        localStorage.setItem("usuariosRegistrados", JSON.stringify(listaDeUsuarios));
                    }

                }

                /* notificacion de que se agregó */
                Swal.fire({
                    width: 300,
                    html: `
                        <div class="custom-swal-content"> 
                            <p>¡Producto agregado!</p>
                        </div>
                    `,
                    customClass: {
                        popup: 'alertFondo',
                    },
                    position: "top-right",
                    showConfirmButton: false,
                    timer: 700
                });

            } else {
                Swal.fire({
                    html: `
                        <div class="custom-swal-content"> 
                            <p>Ingrese un usuario para continuar</p>
                        </div>
                    `,
                    customClass: {
                        popup: 'alertFondo',
                    },
                    position: "center",
                    showConfirmButton: false,
                    timer: 1000
                });
            }

        });
    });
}

/* ------------------------- */
/* Agregar al Favoritos */
function agregarAFavoritos(arrayDeConsolas, claseBoton, callBack) {
    let botonesAniadirFavoritos = document.querySelectorAll(claseBoton);

    botonesAniadirFavoritos.forEach(boton => {
        boton.addEventListener("click", (e) => {

            let usuarioLogeado = null;
            let productosEnFavoritos = null;

            if (localStorage.getItem("usuarioLogueado") != null) {
                usuarioLogeado = JSON.parse(localStorage.getItem("usuarioLogueado"));
            }

            if (usuarioLogeado != null) {

                /* obtener los favoritos del usuario logueado */
                productosEnFavoritos = usuarioLogeado.fav;

                /* encontrar la consola cuando se hace click en "añadir a favorito" */
                let consolaEncontrada = arrayDeConsolas.find(consola => (consola.id + "idBtnFav") == e.currentTarget.id)

                /* verificamos si ya está marcada o no */
                let fav = productosEnFavoritos.some(producto => producto.id == consolaEncontrada.id)

                if (!fav) {

                    /* se actualiza el logo marcado */
                    consolaEncontrada.aniadidaAFav = true;

                    /* se agrega a la lista de favoritos del usuario */
                    productosEnFavoritos.push(consolaEncontrada)
                    usuarioLogeado.fav = productosEnFavoritos;

                    /* actualizar el local */
                    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogeado));
                    let listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados"));
                    let usuarioEncontrado = listaDeUsuarios.find(usuarioLista => usuarioLista.id == usuarioLogeado.id);
                    if (usuarioEncontrado) {
                        usuarioEncontrado.fav = usuarioLogeado.fav;
                        localStorage.setItem("usuariosRegistrados", JSON.stringify(listaDeUsuarios));
                    }

                    /* notificacion de que se agregó */
                    Swal.fire({
                        width: 300,
                        html: `
                        <div class="custom-swal-content"> 
                            <p>¡Agregado a Favoritos!</p>
                        </div>
                    `,
                        customClass: {
                            popup: 'alertFondo',
                        },
                        position: "top-right",
                        showConfirmButton: false,
                        timer: 700
                    });

                } else {

                    /* se desactualiza el logo marcado */
                    consolaEncontrada.aniadidaAFav = false;

                    /* se quita de la lista de favoritos del usuario */
                    let index = productosEnFavoritos.findIndex(producto => producto.id == consolaEncontrada.id)
                    if (index !== -1) {
                        productosEnFavoritos.splice(index, 1);
                        usuarioLogeado.fav = productosEnFavoritos;
                    }

                    /* actualizar el local */
                    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogeado));
                    let listaDeUsuarios = JSON.parse(localStorage.getItem("usuariosRegistrados"));
                    let usuarioEncontrado = listaDeUsuarios.find(usuarioLista => usuarioLista.id == usuarioLogeado.id);
                    if (usuarioEncontrado) {
                        usuarioEncontrado.fav = usuarioLogeado.fav;
                        localStorage.setItem("usuariosRegistrados", JSON.stringify(listaDeUsuarios));
                    }
                }

                callBack(arrayDeConsolas)
            } else {
                Swal.fire({
                    html: `
                        <div class="custom-swal-content"> 
                            <p>Ingrese un usuario para continuar</p>
                        </div>
                    `,
                    customClass: {
                        popup: 'alertFondo',
                    },
                    position: "center",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        });
    })

}

/* ------------------------- */
/* Buscador */

/* click en Search */
document.querySelector("#btnSearch").addEventListener("click",()=>{

    let palabraBuscada = null;
    palabraBuscada=document.querySelector("#inputSearch").value;
    localStorage.setItem("palabraBuscada",palabraBuscada)
    window.location.href ="../index/buscador.html"
    
})
