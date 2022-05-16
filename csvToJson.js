/* eslint-disable no-magic-numbers */
const fs = require('fs');

const arrayOf = (headers, ...values) => {
  return values.map((infoAsObject) => {
    const object = {};
    const infoAsArray = infoAsObject;

    headers.map((header, index) => {
      return object[header] = infoAsArray[index];
    });
    return object;
  });

};

const objectOf = (fileContents) =>
  fileContents.split('\n').map((line) => line.split('|'));

const csvToJson = function (readFrom) {
  try {
    const fileContents = fs.readFileSync(readFrom, 'utf8');

    const contentsAsObject = objectOf(fileContents);
    const jsonObject = arrayOf(contentsAsObject);
    const jsonFormattedData = JSON.stringify(jsonObject);
    const writeTo = readFrom.slice(2).split('.')[0] + '.json';

    return fs.writeFileSync(writeTo, jsonFormattedData);
  } catch (error) {
    console.log('❗️❗️❗️', error.name, error.message);
  }
};

// console.log(read('./venusaur.csv'));
csvToJson('./venusaur.csv');
// csvToJson('./pokemon.csv');
