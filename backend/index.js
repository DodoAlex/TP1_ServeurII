const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');
const csv = require('csvtojson');
//const { default: mongoose } = require('mongoose');
const csvFilePath = path.join(__dirname, 'collisions_routieres.csv'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Conversion du CSV en JSON

let jsonObj = []; // Créez la variable jsonObj


csv()
  .fromFile(csvFilePath)
  .then((data) => {
    jsonObj = data; // Stockez les données JSON dans la variable jsonObj
    console.log(jsonObj); // Affichez le contenu au format JSON
  })
  .catch((error) => {
    console.error('Error reading CSV file:', error);
  });




// app.get('/index', (req, res) => {
//   const start = jsonObj.slice(0, 5);
//   res.json(fiveResult); // Renvoyez les 5 premières données JSON
// });


app.get('/index', (req, res) => {
  const page = req.query.page
  const limit = req.query.limit

  const startIndex = (page - 1) * limit
  const endIndex = (page + limit)

  const resultCollisions = jsonObj.slice(startIndex, endIndex)
  res.json(resultCollisions)


})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
