'use strict';
const PDFDocument = require('pdfkit');
 const fs = require('fs');
 const csv = require('csv-parser');


let rawdata = fs.readFileSync('student.json');

let jsondata = JSON.parse(rawdata);

console.log("Parsing the data from JSON FILE",jsondata);
// let data = jsondata['pain_points_detail']
// console.log(data);
//===========================CSV FILE===========
var RowString = "";
fs.createReadStream('test_rawdata.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log("row",row);
    var keys = Object.keys(row);
    for (var i = 0; i < keys.length; i++) {
        if (i == keys.length-1 ){
            RowString =  RowString + row[keys[i]] + "\n" ;  
    }else{
        RowString =  RowString + row[keys[i]]+ "," ;  
    }
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    const PDFGenerator = require('pdfkit')
// instantiate the library
let theOutput = new PDFGenerator 

// pipe to a writable stream which would save the result into the same directory
theOutput.pipe(fs.createWriteStream('TestDocument.pdf'))

theOutput.text(RowString)

// write out file
theOutput.end()
  });



