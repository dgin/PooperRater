console.log(1);

yelp_search = function () {
    console.log(3);
};

// If user chooses to search near self
function returnUserPosition() {
    // First disable and hide the location search bar, information
    //document.getElementById("yelpLocation").disabled = true;
    document.getElementById("yelpLocation").style.display = "none";
    document.getElementById("yelpGeoCoord").disabled = false;
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
    document.getElementById("yelpGeoCoord").disabled = true;
    document.getElementById("yelpGeoCoord").style.display = "none";
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
    document.getElementById("yelpGeoCoord").value = "("+geoposition.coords.latitude+","+geoposition.coords.longitude+")";
}