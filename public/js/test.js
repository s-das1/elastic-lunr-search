async function searchresultPage() {
    if (getSearchTerm() != 'undefined') {

        res = fetchAsync(formApiUrl(getSearchTerm()));

        const doc = {
            "id": res[0].id,
            "Asset": document.getElementById('asset_id').innerHTML,
            "Owner": document.getElementById('owner_id').innerHTML,
            "Description": document.getElementById('description_id').innerHTML,
            "Status": document.getElementById('status_id').innerHTML,
            "Tags": document.getElementById('tags_id').innerHTML
        }

        response = fetchAsync(formApiUrl(getSearchTerm()), doc)
            .then(response => response.json())
            .then(response => alert('Successfully updated'))
            .catch(error => alert('Request failed'));
        
        location.href=setBaseUrl();

    } else {
        const doc = {
            "id": Math.floor((Math.random() * 999999999999) + 1),
            "Asset": document.getElementById('asset_id').innerHTML,
            "Owner": document.getElementById('owner_id').innerHTML,
            "Description": document.getElementById('description_id').innerHTML,
            "Status": document.getElementById('status_id').innerHTML,
            "Tags": document.getElementById('tags_id').innerHTML
        }

        response = fetchAsync(formApiUrl(getSearchTerm()), doc)
            .then(response => response.json())
            .then(response => alert('Successfully updated'))
            .catch(error => alert('Request failed'));
        
        location.href=setBaseUrl();
    }
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

                  location.href=setBaseUrl();
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

          location.href=setBaseUrl();
    }
    
}
