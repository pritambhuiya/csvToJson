/* eslint-disable no-magic-numbers */
const fs = require('fs');
const path = require('path');

const arrayOf = ([headers, ...values]) => {
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

    const extName = path.extname(readFrom);
    const baseName = path.basename(readFrom, extName);
    const writeTo = `./json/${baseName}.json`;

    fs.writeFileSync(writeTo, JSON.stringify(jsonObject));
    console.log(`✅ Successfully converted ${readFrom} into ${writeTo}`);
  } catch (error) {
    console.log('❗️❗️❗️', error.name, error.message);
  }
};

module.exports = { csvToJson };
