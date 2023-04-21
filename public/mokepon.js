let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;

let spanMascotaJugador = document.getElementById("mascota-jugador");
let spanMascotaEnemigo = document.getElementById("mascota-enemigo");
let spanVidasJugador = document.getElementById("vidas-jugador");
let spanVidasEnemigo = document.getElementById("vidas-enemigo");

const contenedorTarjetas = document.getElementById("contenedorTarjetas");
const contenedorAtaques = document.getElementById("contenedorAtaques");

// CANVAS
const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");
sectionVerMapa.style.display = "none";
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "./assets/mokemap.png";
let mascotaJugadorObjeto;
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 350;
if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20;
}
alturaQueBuscamos = (anchoDelMapa * 600) / 800;
mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

//FINAL CANVAS

//BACKEND

let jugadorId = null;
let enemigoId = null;
let mokeponesEnemigos = [];

//FINAL BACKEND

let mokepones = [];
let opcionDeMokepones;
let botones;

let victoriasEnemigo = 0;
let victoriasJugador = 0;

let ataqueJugador = [];
let ataquesMokeponEnemigo = [];
let ataqueEnemigo = [];
let ataquesMokepon;
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let sectionReiniciar = document.getElementById("reiniciar");
sectionReiniciar.style.display = "none";
let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
sectionSeleccionarAtaque.style.display = "none";
let botonMascotaJugador = document.getElementById("boton-mascota");
botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
botonMascotaJugador.style.display = "none";
let botonFuego;
let botonAgua;
let botonTierra;
let botonReiniciar = document
  .getElementById("boton-reiniciar")
  .addEventListener("click", reiniciarJuego);
let sectionMensajes = document.getElementById("resultado");
let ataquesDelJugador = document.getElementById("ataques-del-jugador");
let ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");

unirseAlJuego();

class Mokepon {
  constructor(nombre, foto, vida, identificador, fotoMapa, id = null) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.identificador = identificador;
    this.ataques = [];
    //canvas
    this.ancho = 40;
    this.alto = 40;
    this.x = random(0, mapa.width - this.ancho);
    this.y = random(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
    this.id = id;
  }
  pintarMokepon() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

let hipodoge = new Mokepon(
  "Hipodoge",
  "./assets/hipodoge.png",
  5,
  "hipodoge",
  "./assets/hipodoge1.png"
);
let capipepo = new Mokepon(
  "Capipepo",
  "./assets/capipepo.png",
  5,
  "capipepo",
  "./assets/capipepo1.png"
);
let ratigueya = new Mokepon(
  "Ratigueya",
  "./assets/ratigueya.png",
  5,
  "ratigueya",
  "./assets/ratigueya1.png"
);

const HIPODOGE_ATAQUES = [
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" },
];
hipodoge.ataques.push(...HIPODOGE_ATAQUES);
//hipodogeEnemigo.ataques.push(...HIPODOGE_ATAQUES);

const CAPIPEPO_ATAQUES = [
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🌱", id: "boton-tierra" },
];
capipepo.ataques.push(...CAPIPEPO_ATAQUES);
//capipepoEnemigo.ataques.push(...CAPIPEPO_ATAQUES);

const RATIGUEYA_ATAQUES = [
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
];
ratigueya.ataques.push(...RATIGUEYA_ATAQUES);
//ratigueyaEnemigo.ataques.push(...RATIGUEYA_ATAQUES);

mokepones.push(hipodoge, capipepo, ratigueya);

function mostrarBotonSeleccionarMascota() {
  botonMascotaJugador.style.display = "block";
}

mokepones.map((mokepon) => {
  opcionDeMokepones = `
  <input type="radio" name="mascota" id=${mokepon.identificador} />
  <label class="tarjeta-de-mokepon" for=${mokepon.identificador}>
    <p>${mokepon.nombre}</p>    
    <img src=${mokepon.foto} alt=${mokepon.nombre} />
  </label>
  `;
  contenedorTarjetas.innerHTML += opcionDeMokepones;
  inputHipodoge = document.getElementById("hipodoge");

  inputCapipepo = document.getElementById("capipepo");

  inputRatigueya = document.getElementById("ratigueya");
});
inputHipodoge.addEventListener("click", mostrarBotonSeleccionarMascota);
inputCapipepo.addEventListener("click", mostrarBotonSeleccionarMascota);
inputRatigueya.addEventListener("click", mostrarBotonSeleccionarMascota);
////////////////////////////////////////////////////////////////////

function seleccionarMascotaJugador() {
  switch (true) {
    case inputHipodoge.checked:
      spanMascotaJugador.innerText = hipodoge.nombre;
      mascotaJugador = hipodoge.nombre;
      break;
    case inputCapipepo.checked:
      spanMascotaJugador.innerText = capipepo.nombre;
      mascotaJugador = capipepo.nombre;
      break;
    case inputRatigueya.checked:
      spanMascotaJugador.innerText = ratigueya.nombre;
      mascotaJugador = ratigueya.nombre;
      break;
    default:
      alert("selecciona un MOKEPON");
      break;
  }

  seleccionarMokepon(mascotaJugador); //backend

  extraertaques(mascotaJugador);

  sectionSeleccionarMascota.style.display = "none";

  sectionVerMapa.style.display = "flex";

  iniciarMapa();
}

//backend
function seleccionarMokepon(mascotaJugador) {
  fetch(`http://192.168.1.11:8080/mokepon/${jugadorId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mokepon: mascotaJugador,
    }),
  });
}

function extraertaques(mascotaJugador) {
  let ataques;
  mokepones.forEach((mokepon) => {
    if (mascotaJugador === mokepon.nombre) {
      ataques = mokepon.ataques;
    }
  });
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.map((ataque) => {
    ataquesMokepon = `
  <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
  `;
    contenedorAtaques.innerHTML += ataquesMokepon;
  });
  botonFuego = document.getElementById("boton-fuego");
  botonAgua = document.getElementById("boton-agua");
  botonTierra = document.getElementById("boton-tierra");
  botones = document.querySelectorAll(".BAtaque");
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      switch (true) {
        case e.target.textContent === "🔥":
          ataqueJugador.push("FUEGO");
          console.log(ataqueJugador);
          boton.style.background = "#112f58";
          boton.disabled = true;
          break;
        case e.target.textContent === "💧":
          ataqueJugador.push("AGUA");
          console.log(ataqueJugador);
          boton.style.background = "#112f58";
          boton.disabled = true;
          break;

        default:
          ataqueJugador.push("TIERRA");
          console.log(ataqueJugador);
          boton.style.background = "#112f58";
          boton.disabled = true;
          break;
      }
      if (ataqueJugador.length === 5) {
        enviarAtaques();
      }
      // ataqueAleatorioEnemigo();
    });
  });
}

function enviarAtaques() {
  fetch(`http://192.168.1.11:8080/mokepon/${jugadorId}/ataques`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ataques: ataqueJugador,
    }),
  });
  intervalo = setInterval(obtenerAtaques, 50);
}

function obtenerAtaques() {
  fetch(`http://192.168.1.11:8080/mokepon/${enemigoId}/ataques`).then((res) => {
    if (res.ok) {
      res.json().then(({ ataques }) => {
        if (ataques.length === 5) {
          ataqueEnemigo = ataques;
          combate();
        }
      });
    }
  });
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function seleccionarMascotaEnemigo(enemigo) {
  spanMascotaEnemigo.innerText = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;

  secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = random(0, ataquesMokeponEnemigo.length - 1);

  switch (true) {
    case ataquesMokeponEnemigo[ataqueAleatorio].nombre == "🔥":
      ataqueEnemigo.push("FUEGO");
      ataquesMokeponEnemigo.splice(ataqueAleatorio, 1);
      break;
    case ataquesMokeponEnemigo[ataqueAleatorio].nombre == "💧":
      ataqueEnemigo.push("AGUA");
      ataquesMokeponEnemigo.splice(ataqueAleatorio, 1);
      break;

    default:
      ataqueEnemigo.push("TIERRA");
      ataquesMokeponEnemigo.splice(ataqueAleatorio, 1);
      break;
  }
  console.log(ataqueEnemigo);
  iniciarPelea();
}

function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate();
  }
}

function indexAmbosOponentes(i) {
  indexAtaqueJugador = ataqueJugador[i];
  indexAtaqueEnemigo = ataqueEnemigo[i];
}

function combate() {
  clearInterval(intervalo);
  for (let i = 0; i < ataqueJugador.length; i++) {
    switch (true) {
      case ataqueJugador[i] == ataqueEnemigo[i]:
        indexAmbosOponentes(i);
        crearMensaje("EMPATE 🤨");
        break;

      case ataqueJugador[i] == "FUEGO" && ataqueEnemigo[i] == "TIERRA":
        indexAmbosOponentes(i);
        crearMensaje("GANASTE 😄");
        victoriasJugador++;
        spanVidasJugador.innerText = victoriasJugador;
        break;

      case ataqueJugador[i] == "AGUA" && ataqueEnemigo[i] == "FUEGO":
        indexAmbosOponentes(i);
        crearMensaje("GANASTE 😄");
        victoriasJugador++;
        spanVidasJugador.innerText = victoriasJugador;
        break;

      case ataqueJugador[i] == "TIERRA" && ataqueEnemigo[i] == "AGUA":
        indexAmbosOponentes(i);
        crearMensaje("GANASTE 😄");
        victoriasJugador++;
        spanVidasJugador.innerText = victoriasJugador;
        break;

      default:
        indexAmbosOponentes(i);
        crearMensaje("PERDISTE 😥");
        victoriasEnemigo++;
        spanVidasEnemigo.innerText = victoriasEnemigo;
        break;
    }
  }

  revisarVictorias();
}

function revisarVictorias() {
  setTimeout(() => {
    switch (true) {
      case victoriasJugador === victoriasEnemigo:
        crearMensajeFinal("Acabas de EMPATAR la Guerra 😑");
        break;
      case victoriasJugador > victoriasEnemigo:
        crearMensajeFinal("Felicitaciones GANASTE la Guerra 😃");
        break;
      default:
        crearMensajeFinal("Lo siento PERDISTE la Guerra 😣");
        break;
    }
  }, 1);
}

function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerText = resultadoFinal;

  sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}

//canvas
function pintarCanvas() {
  mascotaJugadorObjeto.x =
    mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
  mascotaJugadorObjeto.y =
    mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
  lienzo.clearRect(0, 0, mapa.width, mapa.height); //limpia el canvas
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
  mascotaJugadorObjeto.pintarMokepon();
  //backend
  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);
  mokeponesEnemigos.forEach((mokepon) => {
    if (mokepon !== undefined) {
      mokepon.pintarMokepon();
      revisarColision(mokepon);
    }
  });
  //fin backend

  /*     hipodogeEnemigo.pintarMokepon();
  capipepoEnemigo.pintarMokepon();
  ratigueyaEnemigo.pintarMokepon();
  if (
    mascotaJugadorObjeto.velocidadX !== 0 ||
    mascotaJugadorObjeto.velocidadY !== 0
  ) {
    revisarColision(hipodogeEnemigo);
    revisarColision(capipepoEnemigo);
    revisarColision(ratigueyaEnemigo);
  } */
}

//backend
function enviarPosicion(x, y) {
  fetch(`http://192.168.1.11:8080/mokepon/${jugadorId}/posicion`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      x,
      y,
    }),
  }).then(function (res) {
    if (res.ok) {
      res.json().then(function ({ enemigos }) {
        console.log(enemigos);
        mokeponesEnemigos = enemigos.map(function (enemigo) {
          let mokeponEnemigo = null;

          if (enemigo.mokepon !== undefined) {
            const mokeponNombre = enemigo.mokepon.nombre || "";
            if (mokeponNombre === "Hipodoge") {
              mokeponEnemigo = new Mokepon(
                "Hipodoge",
                "./assets/hipodoge.png",
                5,
                "hipodoge",
                "./assets/hipodoge1.png",
                enemigo.id
              );
            } else if (mokeponNombre === "Capipepo") {
              mokeponEnemigo = new Mokepon(
                "Capipepo",
                "./assets/capipepo.png",
                5,
                "capipepo",
                "./assets/capipepo1.png",
                enemigo.id
              );
            } else if (mokeponNombre === "Ratigueya") {
              mokeponEnemigo = new Mokepon(
                "Ratigueya",
                "./assets/ratigueya.png",
                5,
                "ratigueya",
                "./assets/ratigueya1.png",
                enemigo.id
              );
            }
            mokeponEnemigo.x = enemigo.x;
            mokeponEnemigo.y = enemigo.y;
            return mokeponEnemigo;
            //mokeponEnemigo.pintarMokepon();
          }
        });
      });
    }
  });
}

//fin backend

function moverDerecha() {
  mascotaJugadorObjeto.velocidadX = 5;
}
function moverIzquierda() {
  mascotaJugadorObjeto.velocidadX = -5;
}
function moverArriba() {
  mascotaJugadorObjeto.velocidadY = -5;
}
function moverAbajo() {
  mascotaJugadorObjeto.velocidadY = 5;
}

function detenerMovimiento() {
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla(e) {
  switch (e.key) {
    case "ArrowUp":
      moverArriba();
      break;
    case "ArrowDown":
      moverAbajo();
      break;
    case "ArrowLeft":
      moverIzquierda();
      break;
    case "ArrowRight":
      moverDerecha();

    default:
      break;
  }
}

function iniciarMapa() {
  /*   mapa.width = 320;
  mapa.height = 240; */
  mascotaJugadorObjeto = obtenerObjetoMascota();
  intervalo = setInterval(pintarCanvas, 50);
  window.addEventListener("keydown", sePresionoUnaTecla);
  window.addEventListener("keyup", detenerMovimiento);
}

function obtenerObjetoMascota() {
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const izquierdaEnemigo = enemigo.x;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const arribaMascota = mascotaJugadorObjeto.y;
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
  const izquierdaMascota = mascotaJugadorObjeto.x;
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return;
  }
  detenerMovimiento();
  clearInterval(intervalo);
  sectionSeleccionarAtaque.style.display = "flex";
  sectionVerMapa.style.display = "none";
  seleccionarMascotaEnemigo(enemigo);
  alert(`Hay batalla contra ${enemigo.nombre}`);
  console.log("se detecto una colision");
  enemigoId = enemigo.id;
}

//backend
function unirseAlJuego() {
  fetch("http://192.168.1.11:8080/unirse").then((res) => {
    if (res.ok) {
      res.text().then((respuesta) => {
        console.log(respuesta);
        jugadorId = respuesta;
      });
    }
  });
}
