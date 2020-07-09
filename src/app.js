const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4');

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    return response.json({repositories});
});

app.post("/repositories", (request, response) => {
      const title = request.body.title;
      const url = request.body.url;
      const techs = request.body.techs;
      const likes = request.body.likes;
      
      const repositorie = { id: uuid(),title, url, techs, likes}
      repositories.push(repositorie);

      return response.json({repositorie})
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
