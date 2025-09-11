//Elementos del html

const hoyos = document.querySelectorAll(".item");
const contenedorJuego = document.querySelector(".container");
const btnIniciar =  document.getElementById("start-game");
const btnReiniciar = document.getElementById("restart-game");
const mostrarTiempo = document.getElementById("time-count");
const mostrarPuntos = document.getElementById("score-count");

//Sonidos
const sonidoGolpe = new Audio('/sound/whack.mp3');
const musicaFondo = new Audio('/sound/music.mp3');
musicaFondo.loop = true; // repite musica en bucle
musicaFondo.volume = 0.3; // Volumen de la musica establecido

// Variables del juego
let tiempo = 20;
let puntos = 0;
let temporizador;
let aparicionTopos;

//Iniciar juego
function iniciarJuego(){
    // reiniciar los valores
    tiempo = 20;
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
    }, 1000)

    //comienza a mostrar topos
    aparicionTopos = setInterval(mostrarTopo, 600);
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
    btnReiniciar.style.display = "block";
}

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
