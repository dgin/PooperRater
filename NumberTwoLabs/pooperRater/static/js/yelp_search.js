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