//Sets urls
function setUrl() {
    const urlObj = 
    {
        "cloud9": "https://c19814fb3a47419f917cff32b3fd56f9.vfs.cloud9.eu-west-1.amazonaws.com",
        "local": "http://localhost:3000",
        "heroku":"https://vast-taiga-95666.herokuapp.com"
    };
    return urlObj['local'] //This value should be set as appropriate during deployment
}

//Gets the term being searched 
function getSearchTerm() {
    const url = new URL(window.location.href);
    return url.searchParams.get("search");
}

//Forms API call
function formApiUrl(query) {
    return setUrl() + '/search_results/api/v1/?search=' + query;
}

//Forms url to individual results page
function formUniqueResultsUrl(query) {
    return setUrl() + '/search_results/unique/?search=' + query;
}

//Forms url to update results page
function formUpdateUrl() {
    return setUrl() + 'search_results/api/v1/update/';
}

//JS to run on Index page
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
    if (getSearchTerm() != null) {

        fetch(formApiUrl(getSearchTerm()))
            .then(data => {
                return data.json()
            })
            .then(res => {
                if (res.length != 0) {
                    document.getElementById('results_page_header_id').innerHTML = res[0].Asset;
                    document.getElementById('asset_id').innerHTML = res[0].Asset;
                    document.getElementById('owner_id').innerHTML = res[0].Owner;
                    document.getElementById('description_id').innerHTML = res[0].Description;
                    document.getElementById('status_id').innerHTML = res[0].Status;
                    document.getElementById('tags_id').innerHTML = res[0].Tags;
                }
            })
    }
}


function searchresultPage_UpdateDelete(url) {
    
    if (getSearchTerm() != 'undefined') {

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
    } else {
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

function searchresultPage_Update() {
    if (getSearchTerm() != 'undefined') {
        searchresultPage_UpdateDelete('http://localhost:3000/search_results/api/v1/update/');
    } else {
        searchresultPage_UpdateDelete('http://localhost:3000/search_results/api/v1/add/');
    }
    
}

function searchresultPage_Delete(){
    searchresultPage_UpdateDelete('http://localhost:3000/search_results/api/v1/delete/');
}



