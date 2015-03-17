console.log(1);

yelp_search = function () {
    console.log(3);
};

// If user chooses to search near self
function returnUserPosition() {
    // First disable and hide the location search bar, information
    document.getElementById("yelpLocation").disabled = true;
    document.getElementById("yelpLocation").style.display = "none";
    document.getElementById("yelpGeoCoordLat").disabled = false;
    document.getElementById("yelpGeoCoordLat").style.display = "inline-block";
    document.getElementById("yelpGeoCoordLat").style.visibility = "hidden";
    document.getElementById("yelpGeoCoordLong").disabled = false;
    document.getElementById("yelpGeoCoordLong").style.display = "inline-block";
    document.getElementById("yelpGeoCoordLong").style.visibility = "hidden";
    document.getElementById("placeholderWhileGettingLocation").style.display = "block";

    // Show placeholder while searching
    document.getElementById("placeholderWhileGettingLocation").innerHTML = "Now finding where you are. Please enable location services.";
     // Get geolocation data and output to field
     getUserPosition()
    .then(outputPosition)
    .catch(function(error){
        console.log("Something went wrong. You may have to enable geolocation services.")
    });

}

function enableLocationSearch() {
    // Enable location search fields and disable geolocation search fields
    document.getElementById("yelpLocation").disabled = false;
    document.getElementById("yelpLocation").style.display = "block";
    document.getElementById("yelpGeoCoordLat").disabled = true;
    document.getElementById("yelpGeoCoordLat").style.display = "none";
    document.getElementById("yelpGeoCoordLong").disabled = true;
    document.getElementById("yelpGeoCoordLong").style.display = "none";
    document.getElementById("placeholderWhileGettingLocation").style.display = "none";
}

//returnUserPosition();
//getUserPosition()
//.then(outputPosition)
//.catch(function(error){
//        console.log("Something went wrong. You may have to enable geolocation services.")
//    });

function getUserPosition() {
    return new Promise(function(resolve, reject) {
         navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function outputPosition(geoposition) {
    document.getElementById("placeholderWhileGettingLocation").innerHTML = "Location found! Ready to search.";
    document.getElementById("userLat").innerHTML = "You are at coordinates: " + geoposition.coords.latitude + ", ";
    document.getElementById("userLong").innerHTML = geoposition.coords.longitude;
    document.getElementById("yelpGeoCoordLat").value = geoposition.coords.latitude;
    document.getElementById("yelpGeoCoordLong").value = geoposition.coords.longitude;

}

// Function cancels search if location field is both active and empty.
function empty() {
    var x = document.getElementById("yelpLocation").value;
    var y = document.getElementById("yelpGeoCoordLat").value;
    if (x === "" && y === "") {
        alert("You have to actually enter a location!");
        return false;
    }
    return true;
}



// ****************** \\
// YELP AJAX BACKUP



function yelp_ajax() {
    // First check to ensure user has input a location
    if (isNotEmpty()) {
        var location = document.getElementById("ajaxLocation").value;
        var term = document.getElementById("ajaxTerm").value;
        var geoCoordLat = document.getElementById("yelpGeoCoordLat").value;
        var geoCoordLong = document.getElementById("yelpGeoCoordLong").value;
        // If user is searching by location
        if (location !== '') {
            $.ajax({
                url: "/yelp/ajax/",
                type: 'GET',
                data: {"location": location, "term": term},
                success: function(response) {
                    createPostYelpButton(response);
                    console.log(typeof(response));
                    console.log(response);
                }
            });
        // If user is searching by geolocation data
        } else {
            $.ajax({
                url: "/yelp/ajax/",
                type: 'GET',
                data: {"geoCoordLat": geoCoordLat, "geoCoordLong":geoCoordLong,
                    "term": term},
                success: function(response) {
                    createPostYelpButton(response);
                    console.log(typeof(response));
                    console.log(response);
                }
            });
        }

    }
}
// Unused function - delete
function outputYelpDataToPage(data) {
    document.getElementById("yelpOutput").innerHTML = data;
}

function createPostYelpButton(listOfBusinesses) {
    var i;
    // Cleans up output field so that the list doesn't get too long
    document.getElementById("yelpOutput").innerHTML = "";
    // Appends buttons and information, allows adding places
    for (i=0; i < listOfBusinesses.length; i ++) {
        var business = listOfBusinesses[i];
        // Populates page with information about the particular business
        var information = document.createElement("div");
        information.class = "businessInfo";
        information.innerHTML = "<br>"+ "<h4>" + business['name'] + "</h4>" +
            business['location']['address'] + ", " + business['location']['city'] + ", "
            + business['location']['state_code'];
        document.getElementById("yelpOutput").appendChild(information);
        // Creates the business button, which, when clicked, posts the business data to our API
        var newButton = document.createElement('button');
        newButton.innerHTML = "Add " + business['name'] + " to our database!";
        newButton.data = business;
        newButton.onclick = function() {
            //alert(this.data['id']);
            postYelpPlaceToAPI(this.data)
        };
        document.getElementById("yelpOutput").appendChild(newButton);

    }
}

function postYelpPlaceToAPI(businessData) {
    var name = businessData['name'];
    var address = businessData['location']['address'][0];
    var city = businessData['location']['city'];
    var yelp_id = businessData['id'];
    var pic = businessData['image_url'];
    var yelp_url = businessData['url'];

    var csrftoken = getCookie('csrftoken');
    //// For a quick jquery version:
    //var csrftoken = $.cookie('csrftoken');

    $.ajaxSetup({
       beforeSend: function(xhr, settings) {
           if (! csrfSafeMethod(settings.type) && !this.crossDomain) {
               xhr.setRequestHeader("X-CSRFToken", csrftoken);
           }
       }
    });

    $.ajax({
        url: "/api/v1/places/",
        type: 'POST',
        dataType: 'json',
        data: {
            "name": name,
            "address": address,
            "city": city,
            "yelp_id": yelp_id,
            //"pic": pic, // don't need pictures
            "yelp_url": yelp_url
        },
        success: function(response) {
            console.log("Success");
            alert("You successfully added a place! Now go and rate it!")
        },
        error: function(err) {
            console.log(err);
            alert("Place already exists! Find it in our database!")
        }
    });
}

// Obtaining a csrf token for the above AJAX call AJAX call
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function isNotEmpty() {
    var x = document.getElementById("ajaxLocation").value;
    var y = document.getElementById("yelpGeoCoordLat").value;
    if (x === "" && y === "") {
        alert("You have to actually enter a location!");
        return false;
    }
    return true;
}


// ************ \\
// YELP SEARCH BACKUP NEW

console.log(1);

yelp_search = function () {
    console.log(3);
};

// If user chooses to search near self
function returnUserPosition() {
    // First disable and hide the location search bar, information
    document.getElementById("ajaxLocation").disabled = true;
    document.getElementById("ajaxLocation").style.display = "none";
    document.getElementById("yelpGeoCoordLat").disabled = false;
    document.getElementById("yelpGeoCoordLat").style.display = "inline-block";
    document.getElementById("yelpGeoCoordLong").disabled = false;
    document.getElementById("yelpGeoCoordLong").style.display = "inline-block";
    document.getElementById("placeholderWhileGettingLocation").style.display = "block";

    // Show placeholder while searching
    document.getElementById("placeholderWhileGettingLocation").innerHTML = "Now finding where you are. Please enable location services.";
     // Get geolocation data and output to field
     getUserPosition()
    .then(outputPosition)
    .catch(function(error){
        console.log("Something went wrong. You may have to enable geolocation services.")
    });

}

function enableLocationSearch() {
    // Enable location search fields and disable geolocation search fields
    document.getElementById("ajaxLocation").disabled = false;
    document.getElementById("ajaxLocation").style.display = "inline-block";
    document.getElementById("yelpGeoCoordLat").disabled = true;
    document.getElementById("yelpGeoCoordLat").style.display = "none";
    document.getElementById("yelpGeoCoordLong").disabled = true;
    document.getElementById("yelpGeoCoordLong").style.display = "none";
    document.getElementById("placeholderWhileGettingLocation").style.display = "none";
}

function getUserPosition() {
    return new Promise(function(resolve, reject) {
         navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function outputPosition(geoposition) {
    document.getElementById("placeholderWhileGettingLocation").innerHTML = "Location found! Ready to search.";
    document.getElementById("yelpGeoCoordLat").value = geoposition.coords.latitude;
    document.getElementById("yelpGeoCoordLong").value = geoposition.coords.longitude;

}