const elasticlunr = require('elasticlunr');
const fs = require('fs');
var index; //Index data for elsticlunr searh

//Load index
function load_index() {
    var indexDump = JSON.parse(fs.readFileSync('datasets/search_index.json'));
    index = elasticlunr.Index.load(indexDump);
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

function delete_item(index_id) {
    
}

function update_item(index_id, updated_json) {
}

module.exports = {load_index, search_item};