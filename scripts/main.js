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
