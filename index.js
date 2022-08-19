const { csvToJson } = require('./src/csvToJson.js');

const [, , csv] = process.argv;
const filePath = './csv/' + csv;

csvToJson(filePath);
