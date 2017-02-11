exports.convert = function( csvString ) {

    // define variable  for josn 
    var csvJson = [];

    var csvArray = csvString.split("\n");

    // Remove the column names from csvArray into csvColumns.
    // Also replace single quote with double quote (JSON needs double).

    // Get first row for column headers
    var csvColumns = csvArray.shift().split(",");

    csvArray.forEach(function(csvRowString) {

        var csvRow = csvRowString.split(",");

        // Here we work on a single row.
        // Create an object with all of the csvColumns as keys.
        jsonRow = new Object();
        for ( var colNum = 0; colNum < csvRow.length; colNum++) {
            // Remove beginning and ending quotes since stringify will add them.
            var colData = csvRow[colNum].replace(/^['"]|['"]$/g, "");
            jsonRow[csvColumns[colNum]] = colData;
        }
        csvJson.push(jsonRow);
    });

    // return headers;
    return JSON.stringify(csvJson);
};