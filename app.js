const elasticlunr = require('elasticlunr');
const fs = require('fs');
var index; //Index data for elsticlunr searh

//Load index
function load_index() {
    var indexDump = JSON.parse(fs.readFileSync('datasets/search_index.json'));
    index = elasticlunr.Index.load(indexDump);
}

function save_index(new_index) {
    fs.writeFile('datasets/search_index.json', JSON.stringify(new_index), function (err) {
        if (err) throw err;
        console.log('Index update failed');
    });
}
//Search
function search_item(keyword) {
    var max_search_result = 10;
    var search_result_summary = index.search(keyword, {});
    var search_result_JSON = [];
    
    for (var i = 0; i < Math.min(search_result_summary.length, max_search_result); i++) {
        //Push results to new JSON array
        search_result_JSON.push(index.documentStore.getDoc(search_result_summary[i].ref));
    }
    return search_result_JSON;
}


function update_item(updated_json = {}) {
    load_index();
    index.updateDoc(updated_json);
    save_index(index);
}

function delete_item(updated_json = {}) {
    load_index();
    index.removeDoc(updated_json);
    save_index(index);
}

function add_item(updated_json = {}) {
    load_index();
    index.addDoc(updated_json);
    save_index(index);
}

module.exports = {load_index, search_item, update_item, delete_item, add_item};