/* Abrir y cerrar el menu nav */

/* abrir */
document.querySelector("#btnHeaderIndexNav").addEventListener("click", () => {
    document.querySelector("#idMenuNavIndexFondoNegro").classList.remove("d-none")
    document.querySelector("#idMenuNavOpen").classList.remove("d-none")
})
/* cerrar */
document.querySelector("#idMenuNavIndexFondoNegro").addEventListener("click", () => {
    document.querySelector("#idMenuNavIndexFondoNegro").classList.add("d-none")
    document.querySelector("#idMenuNavOpen").classList.add("d-none")
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
            let ordenSegundo=0;

            if (ordenRandom==1) {
                ordenSegundo=2;
            }else{
                ordenSegundo=1;
            }
        
            let contendorRow = document.createElement("div");
            contendorRow.classList.add("row");
            contendorRow.innerHTML = `
                <div class="col-xl-6 col-md-6 col-sm-12"; style="order:${ordenRandom}">
                    <img src="${todasLasConsolas[numeroRandom].imagenReferente}" alt="" style="width: 50%;">
                </div>
                <div class="col-xl-6 col-md-6 col-sm-12" style="order:${ordenSegundo}">
                    <h4>${todasLasConsolas[numeroRandom].compania}</h4>
                    <p>${todasLasConsolas[numeroRandom].descripcion}</p>
                </div>
            `;
            document.querySelector("#contendorPortadaIndex").append(contendorRow);
        }
        
        setInterval(actualizarPortada, 7000);
    })
    .catch(error => console.error('Error al cargar las consolas:', error));





