//Elementos del html

const hoyos = document.querySelectorAll(".item");
const contenedorJuego = document.querySelector(".container");
const btnIniciar =  document.getElementById("start-game");
const btnReiniciar = document.getElementById("restart-game");
const mostrarTiempo = document.getElementById("time-count");
const mostrarPuntos = document.getElementById("score-count");
const btnHighScores = document.getElementById("high-scores");

//Sonidos
const sonidoGolpe = new Audio('/topos/sound/whack.mp3');
const musicaFondo = new Audio('/topos/sound/music.mp3');
musicaFondo.loop = true; // repite musica en bucle
musicaFondo.volume = 0.3; // Volumen de la musica establecido

// Variables del juego
let tiempo = 15;
let puntos = 0;
let temporizador;
let aparicionTopos;
const STORAGE_KEY = 'high-scores';

//Iniciar juego
function iniciarJuego(){
    // reiniciar los valores
    tiempo = 15;
    puntos = 0;
    mostrarPuntos.textContent = puntos;
    mostrarTiempo.textContent = tiempo;

    //ocultar / mostrar botones
    btnIniciar.style.display = "none";
    btnReiniciar.style.display = "none";

    //iniciar musica
    musicaFondo.play();

    //iniciar la cuenta regresiva
    temporizador = setInterval(() => {
        tiempo--;
        mostrarTiempo.textContent = tiempo;
        if(tiempo <= 0) {
            terminarJuego();
        }
    }, 1200)

    //comienza a mostrar topos
    aparicionTopos = setInterval(mostrarTopo, 500);
}

// mostrar topo aleatoriamente
function mostrarTopo(){
    //si el juego termino no tiene que hacer nada
    if(tiempo <= 0){
        return; // corta la ejecucion
    }

    // seleecionar un hoyo aleatorio
    const posicionAleatoria = Math.floor(Math.random() * hoyos.length);
    const topo = hoyos[posicionAleatoria].querySelector(".mole");

    //mostrar el topo
    topo.classList.add("mole-appear");
    
    //ocultar topo despues de 1 segundo
    setTimeout(() => {
        topo.classList.remove("mole-appear");
    }, 1000);
}

// terminar el juego
function terminarJuego (){

    clearInterval(temporizador);
    clearInterval(aparicionTopos);
    musicaFondo.pause();
    musicaFondo.currentTime = 0; // reiniciar la musica

//preguntar si quiere gurdar el score
    Swal.fire({
        title:'Juego Terminado!',
        text: `Conseguiste ${puntos}! ¿Quieres guardar tu record?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, guardar',
        cancelButtonText: 'No, gracias',
        background: '#7CC809',
        customClass: {
                    confirmButton: 'my-confirm-button',
                    cancelButton: 'my-cancel-button',
                    input: 'my-input'
                },
    }).then((result) => {
        if(result.isConfirmed){
            Swal.fire({
                title: 'Ingresa tu nombre',
                input: 'text',
                inputPlaceholder: 'Tu nombre o alias',
                background: '#7CC809',
                customClass: {
                    confirmButton: 'my-confirm-button',
                    cancelButton: 'my-cancel-button',
                    input: 'my-input'
                },
                showCancelButton: true,
                inputValidator:(value) => {
                    if(!value){
                        return ' Necesitas ingresar tu nombre'
                    }
                }
            }).then((result) => {
                if(result.isConfirmed){
                    guardarRecord(result.value, puntos);
                    Swal.fire({
            title: '¡Guardado!',
            text: 'Tu record ha sido guardado',
            icon: 'success',
            background: '#7CC809',
            customClass: {
                confirmButton: 'my-confirm-button',
                    cancelButton: 'my-cancel-button',
                    input: 'my-input'
            }
        });   
                }
            })
        }
    btnReiniciar.style.display = "block";
    })
}
// Aqui vamos a guardar los scores
    function guardarRecord(nombre, puntuacion){
        const scores = obtenerRecords()

        scores.push({nombre, puntuacion, fecha: new Date().toLocaleDateString()})
        scores.sort((a, b) => b.puntuacion - a.puntuacion);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    }

  // obtener todos los record guardados
  
function obtenerRecords(){
    const scores = localStorage.getItem(STORAGE_KEY);
    return scores ? JSON.parse(scores): [];
}

//Mostrar el popup con todos los records guardados

function mostrarPanelRecords (){
    const scores = obtenerRecords();

    const scoresList = scores.map((score, index) => {
        return `${index + 1}. ${score.nombre}: ${score.puntuacion} pts\n (${score.fecha})`;
    }).join(`\n\n`);

    Swal.fire({
        title: 'High Scores 🏆',
        background: '#7CC809',
        html: `<pre style="text-align: left; font-family: inherit;"> ${scoresList || ' No hay records guardados'}</pre>`,
        icon: 'info',
        confirmButtonText: 'Cerrar',
        customClass: {
                    confirmButton: 'my-cerrar-button',
                    input: 'my-input'
                },
        customClass: {
            popup: 'score-popup',
            content: 'score-content'
        }
    });
}
btnHighScores.addEventListener('click', mostrarPanelRecords);

//EVENTOS
//Boton de inicio
btnIniciar.addEventListener("click", iniciarJuego);


//Boton de reinicio
btnReiniciar.addEventListener('click', () => {
    btnIniciar.style.display = 'block';
    btnReiniciar.style.display = 'none';
})

//Golpear topos
 contenedorJuego.addEventListener('click', (e) => {
    
    if(e.target.classList.contains('mole-clicked')){

        //sumar punto y actualizar marcador
        puntos++;
        mostrarPuntos.textContent = puntos;

        // reproducir el sonido del golpe  al topo
        sonidoGolpe.currentTime = 0;
        sonidoGolpe.play();

        //mostrar texto  "whack!"
        const arbusto = e.target.parentElement.previousElementSibling; //buscamos el arbusto
        const texto = document.createElement("span"); // creamos el span
        texto.className = "whack-text";
        texto.textContent = "Whack!";
        arbusto.appendChild(texto);

        //eliminar el texto despues de 400ms
        setTimeout(() => texto.remove(), 400);
        
    }
})
