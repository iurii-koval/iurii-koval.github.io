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

function addButtons(url) {
                var request = new XMLHttpRequest();    
                request.onreadystatechange = function() {
                    if(request.readyState == 4 && request.status == 200) {
                      var entities = request.response.results;
                      loadContent(entities);
                        if(null !=request.response.next){
                            var nextUrl = request.response.next;
                            var loadMoreButton = "<input type='button' value='Load more' onclick='addButtons(\""+nextUrl+"\")'>"
                            eraseContent("loadMore");
                            document.getElementById("loadMore").innerHTML += loadMoreButton; 
                        } else {
                            eraseContent("loadMore");
                        }
                    } else {
                        document.getElementById("detailedInfo").innerHTML = "Loading ... Please wait ...";
                    }
                }
                request.open("GET", url, true);
                request.responseType="json";
                request.send(); 
            }
function eraseContent(elementsId) {
    document.getElementById(elementsId).innerHTML ="";
}
function loadContent(entities) {
                for(i=0;i<entities.length;i++){
                    var buttonName = entities[i].name;
                    var entity = entities[i];
                    //console.log("entity: " + JSON.stringify(entities[i]));
                    //var buttonTemplate = "<input type='button' value='{{name}}'>";
                    var buttonTemplate = "<input type='button' value='{{name}}' onclick='{loadFunction}'>";
                    var fun = "showDetailedInfo("+entity+")";
                    var template = Handlebars.compile(buttonTemplate);
                    var button = template({name:buttonName, loadFunction:fun});
                    document.getElementById("buttonsContainer").innerHTML += button;
                }
                document.getElementById("detailedInfo").innerHTML = "";
            }

function showDetailedInfo(entity) {
    document.getElementById("detailedInfo").innerHTML = JSON.stringify(entity);
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
