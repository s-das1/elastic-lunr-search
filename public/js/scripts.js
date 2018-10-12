//Sets urls
function setBaseUrl() {
const urlObj = 
    {
        "cloud9": "https://c19814fb3a47419f917cff32b3fd56f9.vfs.cloud9.eu-west-1.amazonaws.com",
        "local": "http://localhost:3000",
        "heroku":"https://vast-taiga-95666.herokuapp.com"
    };
    return urlObj['local'] //This value should be set as appropriate during deployment
}

function setApiUrl(apiType) {
    const apiUrlObj = 
    {
        "GET_search_url": "/search_results/api/v1/?search=",
        "GET_unique_results_url": "/search_results/unique/?search=",
        "POST_update_url": "/search_results/api/v1/update/",
        "POST_delete_url": "/search_results/api/v1/delete/",
        "POST_add_url": "/search_results/api/v1/add/"
    };
    return apiUrlObj[apiType]
}

//Gets the term being searched 
function getSearchTerm() {
    const url = new URL(window.location.href);
    return url.searchParams.get("search");
}

//Forms API call
function formApiUrl(query) {
    return setBaseUrl() + setApiUrl('GET_search_url') + query;
}

//Forms url to individual results page
function formUniqueResultsUrl(query) {
    return setBaseUrl() + setApiUrl('GET_unique_results_url') + query;
}

//Forms url to update individual items
function formUpdateUrl() {
    return setBaseUrl() + setApiUrl('POST_update_url');
}

//Forms url to delete individual items
function formDeleteUrl() {
    return setBaseUrl() + setApiUrl('POST_delete_url');
}

//Forms url to add individual items
function formAddUrl() {
    return setBaseUrl() + setApiUrl('POST_add_url');
}

//JS to run on load of the index page
function indexPage() {
    if (getSearchTerm() != null) {
        //Setting the search term and setting it to the search box (required as a new page has been opened)
        //Then fetching the search term via the API
        document.getElementById('search_box_id').value = getSearchTerm();
        fetch(formApiUrl(getSearchTerm()))
            .then(data => {
                return data.json()
            })
            .then(res => {
                if (res.length === 0) {
                    //This is needed to ensure that there is an empty div nested in the search results class, 
                    //otherwise follow on searches don't have a div to be inputted into
                    const div = document.createElement('div');
                    div.id = 'search_results_section_id';
                    div.innerHTML = '';
                    document.getElementById('search_results_id').appendChild(div);
                    document.getElementById("Search_results_header").innerHTML = "0 results found";
                } else {
                    //Iteratively adding each div to the search results
                    document.getElementById("Search_results_header").innerHTML = res.length + " results found";
                    for (let i = 0; i < res.length; i++) {
                        const div = document.createElement('div');
                        div.className = 'search_results_section';
                        div.id = 'search_results_section_id';
                        div.innerHTML = '<p1> <a href="' + formUniqueResultsUrl(res[i].Asset) + '"> <strong>' + res[i].Asset + '</strong> </a></p1>\
                                                <p> <strong>Owner:</strong> ' + res[i].Owner + '</p>\
                                                <p> <strong>Status:</strong> ' + res[i].Status + '</p>\
                                                <p> <strong>Description:</strong> ' + res[i].Description + '</p>';
                        document.getElementById('search_results_id').appendChild(div);
                    }
                }
            })
    }
}

//JS to run on search-results page
function searchresultPage() {
    if (getSearchTerm() != 'undefined') {

        fetch(formApiUrl(getSearchTerm()))
            .then(data => {
                return data.json()
            })
            .then(res => {
                if (res.length != 0) {
                    document.getElementById('delete_button').style.visibility = 'visible';

                    document.getElementById('results_page_header_id').innerHTML = res[0].Asset;
                    document.getElementById('asset_id').innerHTML = res[0].Asset;
                    document.getElementById('owner_id').innerHTML = res[0].Owner;
                    document.getElementById('description_id').innerHTML = res[0].Description;
                    document.getElementById('status_id').innerHTML = res[0].Status;
                    document.getElementById('tags_id').innerHTML = res[0].Tags;
                }
            })
    } else {
        document.getElementById('results_page_header_id').innerHTML = 'Create new item';
        document.getElementById('delete_button').style.visibility = 'hidden';
    }
}

//Sends the updated or new JSON object to server. Basis for differentiation between update and new is the url query field
function searchresultPage_Update() {
    if (getSearchTerm() != 'undefined') {
        searchresultPage_UpdateDelete(formUpdateUrl());
    } else {
        searchresultPage_UpdateDelete(formAddUrl());
    }    
}

//Sends the JSON object to server for deletion
function searchresultPage_Delete(){
    searchresultPage_UpdateDelete(formDeleteUrl());
}

//Function that runs on click of the update button, either updating an item or creating a new item
function searchresultPage_UpdateDelete(url) {
    
    if (getSearchTerm() != 'undefined') { //Update item

        fetch(formApiUrl(getSearchTerm()))
            .then(data => {
                return data.json()
            })
            .then(res => {
                const doc = {
                    "id": res[0].id,
                    "Asset": document.getElementById('asset_id').innerHTML,
                    "Owner": document.getElementById('owner_id').innerHTML,
                    "Description": document.getElementById('description_id').innerHTML,
                    "Status": document.getElementById('status_id').innerHTML,
                    "Tags": document.getElementById('tags_id').innerHTML
                }
                return doc;
            }).then(res => {
                
                fetch(url, {
                    method: 'POST', 
                    body: JSON.stringify(res), 
                    headers:{
                      'Content-Type': 'application/json'
                    }
                  }).then(res => res.json())
                  .then(response => alert('Successfully updated'))
                  .catch(error => alert('Request failed'));
            })
    } else { //Create item
        const doc = {
            "id": Math.floor((Math.random() * 999999999999) + 1),
            "Asset": document.getElementById('asset_id').innerHTML,
            "Owner": document.getElementById('owner_id').innerHTML,
            "Description": document.getElementById('description_id').innerHTML,
            "Status": document.getElementById('status_id').innerHTML,
            "Tags": document.getElementById('tags_id').innerHTML
        }
        fetch(url, {
            method: 'POST', 
            body: JSON.stringify(doc), 
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(response => alert('Successfully updated'))
          .catch(error => alert('Request failed'));
    }
}





