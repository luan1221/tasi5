const express = require("express");

const albums = {
  "After Hours": [
    {
      id: 1,
      musicName: "Escape From LA",
      artist: "The Weeknd"
    },
    {
      id: 2,
      musicName: "Blinding Lights",
      artist: "The Weeknd"
    },
    {
      id: 3,
      musicName: "Save Your Tears",
      artist: "The Weeknd"
    },
    {
      id: 4,
      musicName: "Heartless",
      artist: "The Weeknd"
    }

  ],
  "Piece of Mind": [
    {
      id: 1,
      musicName: "The Trooper",
      artist: "Iron Maiden"
    },
    {
      id: 2,
      musicName: "Flight of Icarus",
      artist: "Iron Maiden"
    }
  ],
  "Do Fundo do Nosso Quintal": [
    {
      id: 1,
      musicName: "Egoismo",
      artist: "Fundo de Quintal"
    },
    {
      id: 2,
      musicName: "Do fundo do nosso quintal",
      artist: "Fundo De Quintal"
    },
    {
      id: 3,
      musicName: "Amor Maior",
      artist: "Fundo De Quintal"
    }
  ]
};

const server = express()

server.get("/", (req, res) => {
  return res.json(weekDays);
})

server.get("/tasks/listTasksPerDay/:day", (req, res) => {
  const day = req.params.day;
  return res.json(weekDays[day]);
})

server.post("/tasks/addTask/:day", (req, res) => {
  const task = req.body;
  const day = req.params.day;
  weekDays[day].push(task);
  return res.status(201);
});


server.put("")

server.listen(3000, () => {
  console.log("Server listening on port 3000!");
});
