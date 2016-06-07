function addFilmsButtons(starWarsEntities, onSuccessCallback, onFailureCallback) {
    var url = "http://swapi.co/api/" + starWarsEntities;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var entities = request.response.results;
            onSuccessCallback(entities);
        } else {
            document.getElementById("detailedInfo").innerHTML = "Loading ... Please wait ...";
        }
    }
    request.open("GET", url, true);
    request.responseType = "json";
    request.send();
}

function addButtons(url, property) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var entities = request.response.results;
            loadContent(entities, property);
            if (null != request.response.next) {
                var nextUrl = request.response.next;
                var loadMoreButton = "<input type='button' value='Load more' onclick='addButtons(\"" + nextUrl +"\",\"" + property+"\")'>"
                console.log("button: " + loadMoreButton);
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
    request.responseType = "json";
    request.send();
}

function eraseContent(elementsId) {
    document.getElementById(elementsId).innerHTML = "";
}

function loadContent(entities, property) {
    for (i = 0; i < entities.length; i++) {
        var entity = entities[i];
        var buttonName = entity[property];
        var info = JSON.stringify(entity);
        var buttonTemplate = "<input type='button' value='{{name}}' onclick='showDetailedInfo(" + info + ")'>";
        var template = Handlebars.compile(buttonTemplate);
        var button = template({
            name: buttonName
        });
        document.getElementById("buttonsContainer").innerHTML += button;
    }
    document.getElementById("detailedInfo").innerHTML = "";
}

function showDetailedInfo(entity) {
    document.getElementById("detailedInfo").innerHTML = JSON.stringify(entity);
}
