// create a js function that runs on the command line for testing

const CSV2XML = require("./csv-2-xml.js");
const fs = require('fs');

console.log("Run fron CLI");

// console.log("Hello Silviu!", process.argv)

const csvFile = process.argv[2];

const data = fs.readFileSync(csvFile).toString();


// console.log(data);

CSV2XML.CSV2XML(data);
// console.log(CSV2XML.CSV2XML(data));