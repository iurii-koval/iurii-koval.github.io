function addButtons(url, property) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            var entities = request.response.results;
            loadContent(entities, property);
            if (null != request.response.next) {
                var nextUrl = request.response.next;
                var loadMoreButton = "<input type='button' value='Load more' onclick='addButtons(\"" + nextUrl +"\",\"" + property+"\")'>"
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
        //var buttonTemplate = "<input type='button' value='{{name}}' onclick='showDetailedInfo(\"" + info + "\")'>";
        var buttonTemplate = "<input type='button' value='{{name}}' onclick='createTableWithData(" + info + ")'>";
        var template = Handlebars.compile(buttonTemplate);
        var button = template({
            name: buttonName
        });
        document.getElementById("buttonsContainer").innerHTML += button;
    }
    document.getElementById("detailedInfo").innerHTML = "";
}

function createTableWithData(entity) {
    var table = document.createElement("table");
    //table.style.display = "block";
    table.style.width = '30%';
    
    table.setAttribute("border", "1");
    var thead = document.createElement("th");
    thead.appendChild(document.createTextNode(entity[Object.keys(entity)[0]]));
    
    var tbody = document.createElement("tbody");
    for(var property in entity) {
        if(entity.hasOwnProperty(property)) {            
        var tr = document.createElement("tr");
        var key = document.createElement("td");
        key.appendChild(document.createTextNode(property));
        var value = document.createElement("td");
        value.appendChild(document.createTextNode(entity[property]));
        tr.appendChild(key);
        tr.appendChild(value);            
        tbody.appendChild(tr);
        }
    }
    table.appendChild(thead);
    table.appendChild(tbody);
    document.getElementById("detailedInfo").innerHTML = "";
    document.getElementById("detailedInfo").appendChild(table);
}
