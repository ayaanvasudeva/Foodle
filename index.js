import axios from 'axios';
import bodyParser from "body-parser";

import express from "express";
const app = express();
const port = 3000;
import { dirname } from "path";
import { fileURLToPath } from "url";
app.use(bodyParser.urlencoded({ extended: true }));
const __dirname = dirname(fileURLToPath(import.meta.url));
// showing static files
const mySecret = process.env['apikey']
app.use(express.static(__dirname + '/public'));
app.get("/", (req, res) => {
      res.render("index.ejs");
     

});

app.post("/submit", async function(req,res){
  let input = req.body.Search
  console.log(req.body.Search)
  const options = {
    method: 'GET',
    url: 'https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe',
    params: {
      query: input
    },
    headers: {
      'X-RapidAPI-Key': mySecret,
      'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    let title = response.data[0].title
    let ingredients = response.data[0].ingredients
    let instructions = response.data[0].instructions
    let title1 = response.data[1].title
    let ingredients1 = response.data[1].ingredients
    let instructions1 = response.data[1].instructions
    let title2 = response.data[2].title
    let ingredients2 = response.data[2].ingredients
    let instructions2 = response.data[2].instructions
    let title3 = response.data[3].title
    let ingredients3 = response.data[3].ingredients
    let instructions3 = response.data[3].instructions
    console.log(response.data[0].title)
    console.log(response.data[0].ingredients) 
    console.log(response.data[0].instructions)
    console.log(response.data[1].title)
    console.log(response.data[1].ingredients) 
    console.log(response.data[1].instructions)
    res.render("end.ejs", {title:title,ingredients:ingredients, instructions:instructions,title1:title1,ingredients1:ingredients1, instructions1:instructions1, input:input,title2:title2,ingredients2:ingredients2,instructions2:instructions2,title3:title3,ingredients3:ingredients3, instructions3:instructions3});
  } catch (error) {
    console.error(error);
  }
   console.log("form submitied")
 
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});