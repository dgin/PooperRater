function yelp_ajax() {
    console.log("Hello");
    var location = document.getElementById("ajaxLocation").value;
    var term = document.getElementById("ajaxTerm").value;
    $.ajax({
        url: "/yelp/ajax/",
        type: 'GET',
        data: {"location": location, "term": term},
        success: function(response) {
            postYelpPlaceToAPI(response);
            console.log(typeof(response));
            console.log(response);
        }
    });
}

function outputYelpDataToPage(data) {
    document.getElementById("yelpOutput").innerHTML = data;
}

function createPostYelpButton(listOfBusinesses) {

}

function postYelpPlaceToAPI(listOfBusinesses) {
    var i;
    for (i=0; i < listOfBusinesses.length; i ++) {
        var newButton = document.createElement('button');
        newButton.innerHTML = "TESTING";
        newButton.data = listOfBusinesses[i];
        newButton.onclick = function() {
          alert(this.data['id']);
        };
        document.getElementById("yelpOutput").appendChild(newButton);
    }

}