//Gets the term being searched 
function getSearchTerm() {
    const url = new URL(window.location.href);
    return url.searchParams.get("search");
}

//Forms API call
function formApiUrl(query) {
    const url_aws = 'https://c19814fb3a47419f917cff32b3fd56f9.vfs.cloud9.eu-west-1.amazonaws.com/search_results/api/v1/?search=';
    const url_local = 'http://localhost:3000/search_results/api/v1/?search=';
    const url_heroku = 'https://vast-taiga-95666.herokuapp.com/search_results/api/v1?search=';

    const url = url_local; //To be configured depending on the type of deployment
    return url + query;
}

//Forms url to individual results page
function formUniqueResultsUrl(query) {
    const url_aws = 'https://c19814fb3a47419f917cff32b3fd56f9.vfs.cloud9.eu-west-1.amazonaws.com/search_results/unique/?search=';
    const url_local = 'http://localhost:3000/search_results/unique/?search=';
    const url_heroku = 'https://vast-taiga-95666.herokuapp.com/search_results/unique/?search=';

    const url = url_local; //To be configured depending on the type of deployment
    return url + query;
}

