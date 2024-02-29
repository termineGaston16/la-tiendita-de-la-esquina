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

/* ------------------------- */
/* Portada del Index */
let url = '../json/consolas.json';

fetch(url)
    .then(response => response.json())
    .then(todasLasConsolas => {

        function actualizarPortada() {
            document.querySelector("#contendorPortadaIndex").innerHTML = "";
            let numeroRandom = Math.floor(Math.random() * 25);

            let ordenRandom = Math.floor(Math.random() * 3);
            let ordenSegundo = (ordenRandom === 1) ? 2 : 1;

            let contendorRow = document.createElement("div");
            contendorRow.classList.add("row");
            contendorRow.innerHTML = `
                <div class="col-xl-6 col-md-6 col-sm-12 mainIndexPortadasPart1" style="order:${ordenRandom}">
                    <img src="${todasLasConsolas[numeroRandom].imagenReferente}" alt="" class="mainIndexPortadasPart1Img">
                </div>
                <div class="col-xl-6 col-md-6 col-sm-12 mainIndexPortadasPart2" style="order:${ordenSegundo}">
                    <h4 class="mainIndexPortadasPart2Title">${todasLasConsolas[numeroRandom].compania}</h4>
                    <p class="mainIndexPortadasPart2Text">${todasLasConsolas[numeroRandom].descripcion}</p>
                </div>
            `;

            document.querySelector("#contendorPortadaIndex").append(contendorRow);


            setTimeout(() => {
                contendorRow.querySelectorAll('.mainIndexPortadasPart1, .mainIndexPortadasPart2').forEach(element => {
                    element.style.opacity = 1;
                });
            }, 100);

            setTimeout(() => {
                contendorRow.querySelectorAll('.mainIndexPortadasPart1, .mainIndexPortadasPart2').forEach(element => {
                    element.style.opacity = 0;
                });
            }, 5500);
        }

        setInterval(actualizarPortada, 7000);
    })
    .catch(error => console.error('Error al cargar las consolas:', error));


/* ------------------------- */
/* Usuario logueado */

/* verificar usuario logueado */
let usuarioLogeado = null;

if (localStorage.getItem("usuarioLogueado") != null) {
    usuarioLogeado = JSON.parse(localStorage.getItem("usuarioLogueado"));
}

if (usuarioLogeado == null) {

    document.querySelector("#idMenuNavOpenPerfilRegister").innerHTML = `
        <a href="index/registracion.html" class="nav-link menuNavOpenPerfilLink">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
            class="bi bi-person" viewBox="0 0 16 16">
            <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
        </svg>
        Registrarse
        </a>
    `

    document.querySelector("#idMenuNavOpenPerfilLogueader").innerHTML = `
        <a href="index/loguearse.html" class="nav-link menuNavOpenPerfilLink">
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
        <a href="index/perfil.html" class="nav-link menuNavOpenPerfilLink">
        <div id="contenedorFotoPerfil" style="width: 30px; height: 30px; border-radius: 100px; overflow:hidden; display: flex; align-items: center; justify-content: center;">
                <img src="${usuarioLogeado.fotoPerfil}" alt="" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        Mi perfil
        </a>
    `
    } else {
        document.querySelector("#idMenuNavOpenPerfilLogueader").innerHTML = `
        <a href="index/perfil.html" class="nav-link menuNavOpenPerfilLink">
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
/* Buscador */

/* click en Search */
document.querySelector("#btnSearch").addEventListener("click",()=>{

    let palabraBuscada = null;
    palabraBuscada=document.querySelector("#inputSearch").value;
    localStorage.setItem("palabraBuscada",palabraBuscada)
    window.location.href ="../index/buscador.html"
    
})



