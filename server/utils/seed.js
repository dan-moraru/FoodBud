require('dotenv').config();
const fs = require('fs');
const { parse } = require('csv-parse');
const Food = require('../models/Food.js');
const { connectDB, closeDB, dropCollection } = require('./db/db.js');
const uri = process.env.CONNECTION_STRING;
const foodArray = [];

connectDB(uri).then(() => {
  // eslint-disable-next-line no-console
  console.log('Removing the old data');
  dropCollection(Food);
  // eslint-disable-next-line no-console
  console.log('Starting to import data to the database. This may take a while.');
  fs.createReadStream('./utils/data/Nutrition.csv').
    pipe(parse({ delimiter: ',', fromLine: 2 })).
    on('data', function (row) {
      for (let i = 0; i < row.length; i++) {
        if (row[i] === 'NULL') {
          row[i] = 0;
        }
      }
      const foodObj = {
        name: row[0],
        calories: row[1],
        fat: row[2],
        protein: row[3],
        carbohydrate: row[4],
        sugars: row[5],
        fiber: row[6],
        cholesterol: row[7],
        calcium: row[8],
        iron: row[9],
        potassium: row[10],
        vitaminA: row[11],
        vitaminC: row[12],
        vitaminB12: row[13],
        vitaminD: row[14],
        sodium: row[15]
      };
      foodArray.push(foodObj);
    }).on('end', async function () {
      await Food.insertMany(foodArray);
      // eslint-disable-next-line no-console
      console.log('Data has been successfully imported to the database.');
      closeDB();
    }).
    on('error', function (error) {
      // eslint-disable-next-line no-console
      console.log(error.message);
    });
});