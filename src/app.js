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
      const {title} = request.body;
      const {url} = request.body;
      const {techs} = request.body;
      const {likes} = request.body;
      
      const repositorie = { id: uuid(),title, url, techs, likes}
      repositories.push(repositorie);

      return response.json({repositorie})
});

app.put("/repositories/:id", (request, response) => {
      const {id} = request.params;
      const {title} = request.body;
      const {url} = request.body;
      const {techs} = request.body;


      const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
      console.log(repositorieIndex);
      if(repositorieIndex < 0){
        return response.status(400).json({error: "Repository not found."});
      }

      const likes =  repositories[repositorieIndex].likes;


      const repositorie = {
        id,
        title,
        url,
        techs,
        likes
      }

      repositories[repositorieIndex] = repositorie;

      return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
    const { id } = request.params;
    const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
    if(repositorieIndex < 0){
      return response.status(400).json({error: "Repository not found."});
    }

    repositories.splice(repositorieIndex,1);

    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    const {id} = request.params;
    const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
    if(repositorieIndex < 0){
      return response.status(400).json({error: "Repository not found."});
    }
    let repositorie = repositories[repositorieIndex];

    let likes = repositorie.likes +1;
    repositorie.likes = likes;
    console.log(repositorie);

    repositories[repositorieIndex] = repositorie;
 

   
    return response.json({msg:"Like sucess!"});

});

module.exports = app;
