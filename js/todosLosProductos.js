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

        let allConsolas = todasLasConsolas.filter(consola => {
            return consola.id >= "00" && consola.id <= "24";
        })

        cargarConsolas(allConsolas)
        filtrarConsolasPorPrecio(allConsolas, cargarConsolas)
        limpiarFiltracionPorPrecio(allConsolas, cargarConsolas,)
        filtrarConsolasMenorPrecio(allConsolas, cargarConsolas)
        filtrarConsolasMayorPrecio(allConsolas, cargarConsolas)
        filtrarConsolasAZ(allConsolas, cargarConsolas)
        filtrarConsolasZA(allConsolas, cargarConsolas)
        filtrarConsolasMasNuevo(allConsolas, cargarConsolas)
        filtrarConsolasMasViejo(allConsolas, cargarConsolas)
    })
    .catch(error => console.error('Error al cargar las consolas.', error));

document.querySelector("#idProductosContenedor").innerHTML = `
    <div class="container text-center">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4" id="idProductosRow">
        </div>
    </div>
`
document.querySelector("#idProductosRow").innerHTML = ""

function cargarConsolas(arrayDeConsolas) {
    arrayDeConsolas.forEach(consolaSony => {

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
        document.querySelector("#idProductosRow").append(div1);

    });
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
    })
}

/* --------------- */
/* Limpiar filtración */
function limpiarFiltracionPorPrecio(arrayCompleto, callback) {
    document.querySelector("#btnLimpiarFiltracion").addEventListener("click", () => {
        document.querySelector("#idProductosRow").innerHTML = ""
        callback(arrayCompleto);
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
    });
}

/* mayor precio */
function filtrarConsolasMayorPrecio(arrayDeConsolas, callback) {
    document.querySelector("#btnMayorPrecioFiltro").addEventListener("click", () => {
        let arrayFiltradoMayorPrecio = arrayDeConsolas.sort((a, b) => b.precioConsola - a.precioConsola);

        document.querySelector("#idProductosRow").innerHTML = ""
        callback(arrayFiltradoMayorPrecio);
    });
}

/* A / Z */
function filtrarConsolasAZ(arrayDeConsolas, callback) {
    document.querySelector("#btnAZPrecioFiltro").addEventListener("click", () => {
        let arrayFiltradoAZ = arrayDeConsolas.sort((a, b) => a.nombreConsola.localeCompare(b.nombreConsola));

        document.querySelector("#idProductosRow").innerHTML = ""
        callback(arrayFiltradoAZ);
    });
}

/* Z / A */
function filtrarConsolasZA(arrayDeConsolas, callback) {
    document.querySelector("#btnZAPrecioFiltro").addEventListener("click", () => {
        let arrayFiltradoZA = arrayDeConsolas.sort((a, b) => b.nombreConsola.localeCompare(a.nombreConsola));

        document.querySelector("#idProductosRow").innerHTML = ""
        callback(arrayFiltradoZA);
    });
}

/* mas nuevo (año) */
function filtrarConsolasMasNuevo(arrayDeConsolas, callback) {
    document.querySelector("#btnMasNuevoPrecioFiltro").addEventListener("click", () => {
        let arrayFiltradoMasNuevo = arrayDeConsolas.sort((a, b) => parseInt(b.anioDeEstreno) - parseInt(a.anioDeEstreno));

        document.querySelector("#idProductosRow").innerHTML = ""
        callback(arrayFiltradoMasNuevo);
    });
}

/* mas viejo (año) */
function filtrarConsolasMasViejo(arrayDeConsolas, callback) {
    document.querySelector("#btnMasAntiguoPrecioFiltro").addEventListener("click", () => {
        let arrayFiltradoMasViejo = arrayDeConsolas.sort((a, b) => parseInt(a.anioDeEstreno) - parseInt(b.anioDeEstreno));

        document.querySelector("#idProductosRow").innerHTML = ""
        callback(arrayFiltradoMasViejo);
    });
}

