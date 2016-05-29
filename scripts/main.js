function addFilmsButtons(starWarsEntities, onSuccessCallback, onFailureCallback) {
                var url = "http://swapi.co/api/"+starWarsEntities;
                var request = new XMLHttpRequest();    
                request.onreadystatechange = function() {
                    if(request.readyState == 4 && request.status == 200) {
                      var entities = request.response.results;
                      onSuccessCallback(entities);
                    } else {
                        document.getElementById("detailedInfo").innerHTML = "Loading ... Please wait ...";
                    }
                }
                request.open("GET", url, true);
                request.responseType="json";
                request.send(); 
            }

function addButtons(starWarsEntities) {
                var url = "http://swapi.co/api/"+starWarsEntities;
                var request = new XMLHttpRequest();    
                request.onreadystatechange = function() {
                    if(request.readyState == 4 && request.status == 200) {
                      var entities = request.response.results;
                      loadContent(entities);
                    } else {
                        document.getElementById("detailedInfo").innerHTML = "Loading ... Please wait ...";
                    }
                }
                request.open("GET", url, true);
                request.responseType="json";
                request.send(); 
            }

function loadContent(entities) {
                for(i=0;i<entities.length;i++){
                    var buttonName = entities[i].name;
                    console.log(buttonName);
                    var buttonTemplate = "<input type='button' value={{name}}>";
                    var template = Handlebars.compile(buttonTemplate);
                    var button = template({name:buttonName});
                    document.getElementById("buttonsContainer").innerHTML += button;
                }
                document.getElementById("detailedInfo").innerHTML = "";
            }

function getDetailedInfo(section, itemId) {

    var request = new XMLHttpRequest();    
    request.onreadystatechange = function() {
            if(request.readyState == 4 && request.status == 200){
            document.getElementById("detailedInfo").innerHTML = request.responseText;
        } else {
            document.getElementById("detailedInfo").innerHTML = "Loading ... Please wait.";
        }
    }
    request.open("GET", "http://swapi.co/api/" + section + "/" + itemId + "/", true);
    request.send();    
}
