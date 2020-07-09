const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());


const repositories = [];

function validateRepositorieId(request,response,next){
  const {id} = request.params;

  if(!isUuid(id)){ 
      return response.status(400).json({ error: "Invalid repositorie ID."}); 
  }

  return next();
}

app.get("/repositories", (request, response) => {
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
      const {title} = request.body;
      const {url} = request.body;
      const {techs} = request.body;
      const likes = 0;
      
      const repository = { id: uuid(),title, url, techs, likes}
      repositories.push(repository);

      return response.status(201).json(repository)
});

app.put("/repositories/:id",validateRepositorieId, (request, response) => {
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

      return response.status(200).json(repositorie);
});

app.delete("/repositories/:id",validateRepositorieId, (request, response) => {
    const { id } = request.params;
    const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
    if(repositorieIndex < 0){
      return response.status(400).json({error: "Repository not found."});
    }

    repositories.splice(repositorieIndex,1);

    return response.status(204).send();
});

app.post("/repositories/:id/like",validateRepositorieId, (request, response) => {
    const {id} = request.params;
    const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
    if(repositorieIndex < 0){
      return response.status(400).json({error: "Repository not found."});
    }
    //const repositorie = repositories[repositorieIndex]; //dúvida porque atribuiu likes para uma const
    let repositorie = repositories[repositorieIndex];
    let likes = repositorie.likes +1;
    repositorie.likes = likes;
    

    repositories[repositorieIndex] = repositorie;
 

   
    return response.status(200).json({likes});

});

module.exports = app;
