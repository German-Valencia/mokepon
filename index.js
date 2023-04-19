const express = require("express"); //primero para importar express
const app = express(); // segundo para crear app que representa al server
const port = 8080;
app.listen(port, () => {
  console.log("Server Ok"); // tercero para escuchar peticiones
});
const cors = require("cors"); // para evitar error CORS se instala 'npm i cors'
app.use(cors()); // aquí le decimos a express que use cors
app.use(express.json()); //habilitar capacidad de recibir peticiones post en JSON

const jugadores = [];

class Jugador {
  constructor(id) {
    this.id = id;
  }
  asignarMokepon(mokepon) {
    this.mokepon = mokepon;
  }
  actualizarPosicion(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Mokepon {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

app.get("/unirse", (req, res) => {
  const id = `${Math.random()}`;
  const jugador = new Jugador(id);
  jugadores.push(jugador);
  //res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.send(id);
});

app.post("/mokepon/:jugadorId", (req, res) => {
  const jugadorId = req.params.jugadorId || ""; //para solucionar si no llegan datos
  const nombre = req.body.mokepon || "";
  const mokepon = new Mokepon(nombre);
  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );
  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarMokepon(mokepon);
  }
  console.log(jugadores);
  console.log(jugadorId);
  res.end();
});

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
  const jugadorId = req.params.jugadorId || "";
  const x = req.body.x || 0;
  const y = req.body.y || 0;
  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );
  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].actualizarPosicion(x, y);
  }
  res.end();
});
