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






