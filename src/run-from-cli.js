// create a js function that runs on the command line for testing
const generate_package_name = require("./helpers");

const CSV2XML = require("./csv-2-xml.js");
const fs = require('fs');

console.log("Run fron CLI");

// console.log("Hello Silviu!", process.argv)

const csvFile = process.argv[2];

const data = fs.readFileSync(csvFile).toString();

CSV2XML.CSV2XML(data, generate_package_name.generate_package_name());
// console.log(CSV2XML.CSV2XML(data));