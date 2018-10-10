const elasticlunr = require('elasticlunr');
const fs = require('fs');
var csv = require('csv-array');

//Setting up the index
var index = elasticlunr(function () {
    this.addField('Asset')
    this.addField('Owner')
    this.addField('Description')
    this.addField('Status')
    this.addField('Tags')
});

//Parsing data from csv
csv.parseCSV("asset_catalogue.csv", function (data) {
    //Looping to add data from csv to index
    for (var i = 0; i < data.length; i++) {

        index.addDoc({
            "id": i,
            "Asset": data[i][0],
            "Owner": data[i][1],
            "Description": data[i][2],
            "Status": data[i][3],
            "Tags": data[i][4]
        });
    }
    
    fs.writeFile('search_index.json', JSON.stringify(index), function (err) {
    if (err) throw err;
    console.log('done');
    });

}, false);

