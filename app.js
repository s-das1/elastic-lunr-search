const _ = require('lodash');
const elasticlunr = require('elasticlunr');
const fs = require('fs');
let index;

//Loads search index
const load_index = () => {
    const indexDump = JSON.parse(fs.readFileSync('datasets/search_index.json'));
    index = elasticlunr.Index.load(indexDump);
}

//Saves a new index after an update
const save_index = (new_index) => {
    fs.writeFile('datasets/search_index.json', JSON.stringify(new_index), function (err) {
        if (err) throw err;
        console.log('Index update failed');
    });
}

const search_item = (keyword) => {
    //Performs and stores results summary (only ID and search ranking is returned by the .search API)
    const search_result_summary = index.search(keyword, {});
    let search_result_JSON = [];
    
    //Extracts index from search_result_summary, 
    //Uses that index to extract all item data from the main dataset
    //Then puts this data into a new JSON called search_results_JSON
    const max_search_result = _.min([10, search_result_summary.length]);
    _.times(max_search_result, (i) => search_result_JSON.push(index.documentStore.getDoc(search_result_summary[i].ref)));

    return search_result_JSON;
}

const change_item = (updated_json ={}, change_type) => {
    load_index();

    if (change_type === 'update') index.updateDoc(updated_json);
    else if (change_type === 'delete') index.removeDoc(updated_json);
    else if (change_type === 'add') index.addDoc(updated_json);
    else console.log('change_item: Invalid input');
    
    save_index(index);
}

module.exports = {load_index, search_item, change_item};