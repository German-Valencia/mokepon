const express = require("express"); //primero para importar express
const app = express(); // segundo para crear app que representa al server
const port = 8080;
app.listen(port, () => {
  console.log("Server Ok"); // tercero para escuchar peticiones
});

const jugadores = [];

class Jugador {
  constructor(id) {
    this.id = id;
  }
}

app.get("/unirse", (req, res) => {
  const id = `${Math.random()}`;
  const jugador = new Jugador(id);
  jugadores.push(jugador);
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.send(id);
});
